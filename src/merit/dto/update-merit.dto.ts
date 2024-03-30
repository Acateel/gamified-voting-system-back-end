import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator'
import { Characteristic } from 'src/common/characteristic-enum'

export class UpdateMeritDto {
  @IsOptional()
  @IsEnum(Characteristic)
  characteristic: Characteristic

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(0)
  coefficient: number
}
