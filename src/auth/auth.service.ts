import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

    return {
      ...userNoPassword,
      accessToken: this.jwtService.sign({ id: user.id, email: user.email, role: user.role}),
      refreshToken: this.jwtService.sign({ id: user.id, email: user.email, role: user.role}, { expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION') })
    }
  }
}
