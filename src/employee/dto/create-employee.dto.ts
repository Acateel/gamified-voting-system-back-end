import { IsNumber, IsString, Max, Min } from 'class-validator'

export class CreateEmployeeDto {
  @IsString()
  fullname: string

  @IsString()
  specialty: string

  @IsNumber()
  @Max(100)
  @Min(0)
  purposefulness: number

  @IsNumber()
  @Max(100)
  @Min(0)
  determination: number

  @IsNumber()
  @Max(100)
  @Min(0)
  analysis: number

  @IsNumber()
  @Max(100)
  @Min(0)
  planning: number

  @IsNumber()
  @Max(100)
  @Min(0)
  activity: number
}
