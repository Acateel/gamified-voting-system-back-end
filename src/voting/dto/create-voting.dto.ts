import { IsNumber, IsString } from 'class-validator'

export class CreateVotingDto {
  @IsString()
  title: string

  @IsString()
  details: string

  @IsNumber()
  purposefulness_cof: number

  @IsNumber()
  determination_cof: number

  @IsNumber()
  analysis_cof: number

  @IsNumber()
  planning_cof: number

  @IsNumber()
  activity_cof: number
}
