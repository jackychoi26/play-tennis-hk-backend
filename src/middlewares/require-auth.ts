import { Request, Response, NextFunction } from 'express';
import UnauthorizedError from '../core/errors/unauthorized-error';
import JwtHelper, { TokenData } from '../core/jwt-helper';

declare global {
  namespace Express {
    interface Request {
      currentUser?: TokenData;
    }
  }
}

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  const bearerToken = authorization?.split(' ');

  if (bearerToken && bearerToken.length > 0) {
    const token = bearerToken[1];
    const tokenData: TokenData = JwtHelper.verify(token);
    req.currentUser = tokenData;
    next();
  } else {
    throw new UnauthorizedError();
  }
};

export default requireAuth;

// This is decalred many times because of compilation error bug
declare global {
  namespace Express {
    interface Request {
      currentUser?: TokenData;
    }
  }
}
