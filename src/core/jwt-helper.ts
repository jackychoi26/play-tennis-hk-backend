import * as jwt from 'jsonwebtoken';

// TODO: replace secret with
export default class JwtHelper {
  // expires in 3 months
  static sign(data: TokenData, expiresIn: number = 60 * 60 * 24 * 90): string {
    return jwt.sign(data, 'secret', {
      expiresIn: 1000
    });
  }
}

export interface TokenData {
  id: string;
  username: string;
  email: string;
}
