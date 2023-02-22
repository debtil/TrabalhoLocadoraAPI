import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload{
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticadted(request: Request, response: Response, next: NextFunction): void{
      const authHeader = request.headers.authorization;
      if(!authHeader){
        throw new AppError('JWT Token is missing.');
      }

      const [type, token] = authHeader.split(' ');
      try{
        const decodeToken = verify(token, auth.jwt.secret);
        const { sub } = decodeToken as TokenPayload;
        request.user = { id : sub};
        return next();
      }catch{
        throw new AppError('Invalid JWT Token.');
      }
    }
  