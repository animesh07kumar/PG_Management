import prisma from '../../prisma/index.js';
import cookieToken from '../utils/cookieToken.js';
import bcrypt from 'bcrypt';

// User signup
export const signup = async (req, res, next) => {
    try {
        const { username, full_name, email, password, designation } = req.body;
        
      // Validate required fields
        if (!username || !full_name || !email || !password || !designation) {
            throw new Error('Please provide all fields');
        }
        
      // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10
        
      // Create the staff (admin) user in the database
        const staff = await prisma.staff.create({
            data: {
            username,
            full_name,
            email,
            password_hash: hashedPassword, // Save the hashed password
            designation,
            },
        });
        
          // Return a response
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            staff,
        });
        } catch (error) {
          next(error); // Pass errors to the global error handler
        }
    };

// Login user
export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
      // Validate input
        if (!username || !password) {
            throw new Error('Please provide username and password');
        }
        
        // Find the user by username
        const user = await prisma.staff.findUnique({
        where: { username }
        });
        if (!user) {
            throw new Error('User not found');
        }
      // Compare the provided password with the hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordCorrect) {
            throw new Error('Incorrect password');
        }
        
      // Send user a token (cookie-based auth)
        cookieToken(user, res);
    } catch (error) {
        next(error);
    }
    };

// Logout user
export const logout = async (req, res, next) => {
    try {
        if(req.staff){
            const options = {
                httpOnly: true,
                secure: true
            }
            return res.clearCookie('token', options)
            .json({
                success: true,
            });
        }
        else{
            res.status(401).send("Your not login in")
            throw new Error("unauthorized operation of login out")
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
// login before deleting account
export const deleteStaff = async (req, res, next) => {
    try {
        const tempStaff = await req.staff.Admin_id
        if(!tempStaff){
            res.status(404).send("user not login| access token expired")
            throw new Error('Login in')
        }
        const options = {
            httpOnly: true,
            secure: true
        };
        const deletedStaff = await prisma.staff.delete({
            where: {
                Admin_id: tempStaff,
            },
        });
        return res.status(200)
        .clearCookie('token', options)
        .json({
            'staff name': `${deletedStaff.full_name}`,
            status: "deleted"
        });
    } catch (error) {
        res.send("internal server error").status(500);
        throw new Error(error.message);
    }
};
