import { IsNumber, IsOptional } from 'class-validator'

export class UpdateVoteDto {
  @IsOptional()
  @IsNumber()
  optionId: number
}
