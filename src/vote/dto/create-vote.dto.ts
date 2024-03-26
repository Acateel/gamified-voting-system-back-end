import { IsNumber } from 'class-validator'

export class CreateVoteDto {
  @IsNumber()
  optionId: number
}
