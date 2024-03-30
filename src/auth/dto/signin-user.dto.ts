import { Transform } from 'class-transformer'
import { IsEmail, IsString } from 'class-validator'

export class SigninUserDto {
  @Transform(({ value }) => new String(value).toLowerCase().trim())
  @IsEmail()
  email: string

  @IsString()
  password: string
}
