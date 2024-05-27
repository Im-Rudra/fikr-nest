import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google/login')
  @UseGuards(GoogleOauthGuard)
  handleLogin() {
    return { msg: 'google authentication' };
  }

  // @Get('google/callback')
  // @UseGuards(GoogleOauthGuard)
  // handleRedirect() {
  //   return { msg: 'ok' };
  // }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    try {
      const token = await this.authService.oAuthLogin(req.user);
      res.cookie('Authentication', token.jwt, {
        httpOnly: true,
        maxAge: 86400000, // 1 day
        secure: true,
        priority: 'high',
      });
      res.redirect(`${process.env.FRONTEND_URL}/oauth?token=${token.jwt}`);
    } catch (err) {
      res.status(500).send({ success: false, message: err.message });
    }
  }
}

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Get('callback/google')
//   @UseGuards(GoogleOauthGuard)
//   async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
//     try {
//       const token = await this.authService.oAuthLogin(req.user);
//       res.redirect(`${process.env.FRONTEND_URL}/oauth?token=${token.jwt}`);
//     } catch (err) {
//       res.status(500).send({ success: false, message: err.message });
//     }
//   }
// }
