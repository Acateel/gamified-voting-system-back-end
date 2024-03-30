import { Transform } from 'class-transformer'
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @Transform(({ value }) => new String(value).toLowerCase().trim())
  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  password: string

  @IsNumber()
  employeeId: number
}
