import * as jwt from 'jsonwebtoken';
import UnauthorizedError from './errors/unauthorized-error';

export default class JwtHelper {
  // expires in 3 months
  static sign(data: TokenData, expiresIn: number = 60 * 60 * 24 * 90): string {
    return jwt.sign(data, process.env.JWT_SECRET!, {
      expiresIn: 1000
    });
  }

  static verify(token: string): TokenData {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!) as TokenData;
    } catch {
      throw new UnauthorizedError('INVALID_TOKEN');
    }
  }
}

export interface TokenData {
  id: number;
  username: string;
  email: string;
}
