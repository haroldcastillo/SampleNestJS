import { Controller, Post, UseGuards,Get, Req,Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request ,Response } from 'express';
import { JwtAuthGuard } from './guards/Jwt.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request, @Res({ passthrough: true }) response: Response) {

    const refreshToken = this.authService.generateRefreshToken(req.user);
    const accessToken = this.authService.generateAccessToken(req.user);

    // Set the refresh token in an HTTP-only cookie
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // Should be set to true in production (use HTTPS)
      sameSite: 'strict', // Helps with CSRF protection
      path: '/',
      maxAge: 24 * 60 * 60 * 1000, // For example, 24 hours
    });
    
    return {
      ...req.user,
      accessToken
    };
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request){
    return(req.user);
  }

}
