import jwt from 'jsonwebtoken';

// TODO: replace secret with
export default class JwtHelper {
  // expires in 3 months
  static sign(data: any, expiresIn: number = 60 * 60 * 24 * 90): string {
    return jwt.sign(data, 'secret', {
      expiresIn: Date.now() / 1000 + expiresIn
    });
  }
}
