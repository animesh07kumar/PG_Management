import jwt from 'jsonwebtoken';

const getJwtToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '1 day' });
};

export default getJwtToken;
