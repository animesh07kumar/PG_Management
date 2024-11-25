import prisma from '../../prisma/index.js';
import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).send('Please login');
      throw new Error('You are not logged in'); // Terminate the request
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    // You can add more checks here if needed
    next();
  } catch (error) {
    res.status(401).send('Authentication failed');
    throw new Error(error.message);
  }
};

export default isLoggedIn;
