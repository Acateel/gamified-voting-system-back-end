import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator'

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  fullname: string

  @IsOptional()
  @IsString()
  specialty: string

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(0)
  purposefulness: number

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(0)
  determination: number

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(0)
  analysis: number

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(0)
  planning: number

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(0)
  activity: number
}
