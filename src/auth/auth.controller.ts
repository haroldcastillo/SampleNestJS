import { Controller, Post,Body, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalGuard } from './guards/local.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.validateUser({email:createUserDto.email,password:createUserDto.password});
  }
}
