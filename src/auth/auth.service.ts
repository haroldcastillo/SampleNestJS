import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private jwtService: JwtService) {}

  async validateUser({ email, password }: { email: string, password: string }): Promise<any> {
    const user = await this.userService.findOne(email, "email");
    if (!user || !comparePassword(password, user.password)) {
      throw new UnauthorizedException('Invalid Password');
    }
    const { password: _, ...result } = user;
    return this.jwtService.sign(result);
  }
}
