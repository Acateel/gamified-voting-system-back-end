import { IsOptional, IsString } from 'class-validator'

export class UpdateOptionDto {
  @IsOptional()
  @IsString()
  text: string
}
