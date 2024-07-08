import { Controller, Post, UseGuards,Get, Req,Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request ,Response } from 'express';
import { JwtAuthGuard } from './guards/Jwt.guard';
import {RefreshTokenGuard} from './guards/refreshToken.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
    const { name, email,role } = req.user as { name: string, email: string ,role:string};
    
    const refreshToken = await this.authService.generateRefreshToken(
      {name, email, role}
    );
    const accessToken = this.authService.generateAccessToken(
      {refreshToken}
    );

    // Set the refresh token in an HTTP-only cookie
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
    return accessToken;
  }

  @Get('status')
  @UseGuards(JwtAuthGuard,RefreshTokenGuard)
  status(@Req() req: Request){
    return req.user
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refreshToken');
    return { message: 'Loggedout' };
  }


  @Post('refreshToken')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refreshToken'];
    console.log(refreshToken)
  }

}
