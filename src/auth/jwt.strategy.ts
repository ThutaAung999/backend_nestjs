import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SECRET_KEY } from './JwtConfig';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET_KEY,
    });
    console.log('JWT strategy constructor'); //အပေါ်က ကုဒ်တွေ က အလုပ်လုပ်ပေမဲ့ ဒါကို မလုပ်ဘူး
  }
  validate(payload: any): any {
    console.log('JWT payload ', payload);
    return { username: payload.username, sub: payload._id };
  }
}
