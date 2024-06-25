import { Controller, Post, UseGuards,Get, Req,Res,UnauthorizedException} from '@nestjs/common';
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

    const { username, email,role } = req.user as { username: string, email: string ,role:string};


    const refreshToken = this.authService.generateRefreshToken(
      { username, email,role }
    );
    const accessToken = this.authService.generateAccessToken(
      { username, email,role }
    );

    // Set the refresh token in an HTTP-only cookie
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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

  @Get(`refresh`)
  getSomething(@Req() req: Request){
    const refreshToken = req.cookies;
    console.log(refreshToken);
  }


  @Post('refresh-token')
  async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refreshToken'];
    console.log(refreshToken)
  }

}
