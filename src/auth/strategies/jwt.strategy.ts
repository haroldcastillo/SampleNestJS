import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Changed to false to ensure expiration is checked
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate( payload: any,req: Request) {
    const notExpired = Date.now() < payload.exp * 1000;
    if(notExpired){
      console.log('May Proceed')
      return payload
    }
    else{
      console.log('Generate New Token')
      return payload
    }
  }
}
