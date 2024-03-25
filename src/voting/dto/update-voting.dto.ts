import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateVotingDto {
  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  details: string

  @IsOptional()
  @IsNumber()
  purposefulness_cof: number

  @IsOptional()
  @IsNumber()
  determination_cof: number

  @IsOptional()
  @IsNumber()
  analysis_cof: number

  @IsOptional()
  @IsNumber()
  planning_cof: number

  @IsOptional()
  @IsNumber()
  activity_cof: number
}
