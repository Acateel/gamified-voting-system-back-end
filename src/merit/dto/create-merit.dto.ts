import { IsEnum, IsNumber, Max, Min } from 'class-validator'
import { Characteristic } from 'src/common/characteristic-enum'

export class CreateMeritDto {
  @IsEnum(Characteristic)
  characteristic: Characteristic

  @IsNumber()
  @Max(100)
  @Min(0)
  coefficient: number
}
