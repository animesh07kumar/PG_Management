import jwt from 'jsonwebtoken';

const getJwtToken = (Admin_id) => {
  return jwt.sign({ Admin_id: Admin_id}, process.env.JWT_SECRET, { expiresIn: '1 day' });
};

export default getJwtToken;
