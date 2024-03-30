import { Transform } from 'class-transformer'
import { IsEmail, IsString } from 'class-validator'

export class SignupUserDto {
  @Transform(({ value }) => new String(value).toLowerCase().trim())
  @IsEmail()
  email: string

  @IsString()
  password: string
}
