import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';
@Injectable()
export class AuthService {
  
  constructor(private readonly userService: UsersService, private jwtService: JwtService,private configService: ConfigService) {}

  async validateUser({ email, password }: { email: string, password: string }): Promise<any> {
    const user = await this.userService.findOne(email, "email");
    if(!user) return null;
    if (!user || !comparePassword(password, user.password)) throw new UnauthorizedException('Invalid Password');
    
    const { password: _, ...userNoPassword } = user.toObject();

    return userNoPassword
  }

  generateRefreshToken(payload:Object) {
    return this.jwtService.sign(payload, { expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION')});
  }

  generateAccessToken (payload:Object) {
    return this.jwtService.sign(payload);
  }
  
  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Optionally, you can re-fetch user data here and include it in the payload
      const { username, email, role } = payload;

      const newAccessToken = this.generateAccessToken({ username, email, role });
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
