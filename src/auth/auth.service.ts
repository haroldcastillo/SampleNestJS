import { Injectable,NotFoundException ,UnauthorizedException  } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService:UsersService) {}

  async validateUser({email,password}: {email: string, password: string}): Promise<any> {
    const user = await this.userService.findOne(email,"email");
    if(!user)throw new NotFoundException('User not found');
    if(!comparePassword(password,user.password)) throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}
