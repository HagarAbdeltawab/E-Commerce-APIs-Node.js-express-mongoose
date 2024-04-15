import jwt from 'jsonwebtoken';

export const generateToken = (userId, role) => {
    return jwt.sign({ userId, role }, process.env.JWT_KEY);
};