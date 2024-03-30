import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignupUserDto } from './dto/signup-user.dto'
import { SigninUserDto } from './dto/signin-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupUserDto) {
    await this.authService.signup(signupDto)

    return this.authService.singin({ ...signupDto })
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninUserDto) {
    return this.authService.singin(signinDto)
  }
}
