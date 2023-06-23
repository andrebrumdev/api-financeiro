import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as firebase from 'firebase-admin';

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization;
    if( token && token != null && token != ''){
      firebase.auth().verifyIdToken(token.replace('Bearer ',''))
      .then( async decodedToken =>{
        const user = {
          email: decodedToken.email
        }
        req['user'] = user;
        next();
      })
      .catch(error =>{
        console.log(error.message);
        this.acessDenied(req.url, res);
      })
    }
    else{
      next();
    }
  }

  private acessDenied(url: string, res: Response){
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied'
    });
  }

}
