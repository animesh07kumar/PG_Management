import prisma from '../../prisma/index.js';
import jwt from 'jsonwebtoken';

const checkLogin = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            res.status(401).send('Please login')
            throw new Error('You are not logged in'); // Terminate the request
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await prisma.staff.findUnique({
            where: {
                Admin_id: decoded?.Admin_id,
            },
        });
        console.log(user) 
    if(!user){
        res.status(401).send("Please login")
        throw new Error("Invalid Access Token")
    }

    req['staff'] = user;

    // You can add more checks here if needed
    next();
    } catch (error) {
    res.status(401).send('Authentication failed');
    throw new Error(error.message);
    }
};

export default checkLogin;
