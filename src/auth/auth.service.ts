import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import { compare, hash } from 'bcrypt'
import { User } from 'src/database/entities/user.entity'
import { SignupUserDto } from './dto/signup-user.dto'
import { SigninUserDto } from './dto/signin-user.dto'

@Injectable()
export class AuthService {
  private bcrtyptSalt: string

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userService: UserService
  ) {
    this.bcrtyptSalt = this.configService.getOrThrow('BCRYPT_SALT')
  }

  async signup({ email, password }: SignupUserDto): Promise<User> {
    const user = await this.userService.create({
      email,
      password: await hash(password, this.bcrtyptSalt),
    })

    return user
  }

  async singin({ email, password }: SigninUserDto) {
    const user = await this.userService.findOneByEmailWithPassword(email)

    if (!user) {
      throw new NotFoundException('Credentials incorect')
    }

    const pwMatches = await compare(password, user.password)
    if (!pwMatches) {
      throw new NotFoundException('Credentials incorect')
    }

    return await this.getToken(user.id)
  }

  async getToken(id: number) {
    const payload = { sub: id }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
