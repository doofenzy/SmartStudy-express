import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const TOKEN_EXPIRATION_TIME = process.env.JWT_EXPIRATION;
const TOKEN_SECRET = process.env.JWT_SECRET;

if (!TOKEN_EXPIRATION_TIME) {
  throw new Error('JWT_EXPIRATION is not defined in environment variables');
}

if (!TOKEN_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

const generateToken = (userId: string): string => {
  const payload = { id: userId };

  const options: SignOptions = {
    expiresIn: TOKEN_EXPIRATION_TIME as SignOptions['expiresIn'],
  };

  return jwt.sign(payload, TOKEN_SECRET, options);
};

export default generateToken;
