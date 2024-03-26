import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { VoteService } from './vote.service'
import { CreateVoteDto } from './dto/create-vote.dto'
import { UpdateVoteDto } from './dto/update-vote.dto'

@Controller('employee/:employeeId/vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  create(
    @Param('employeeId') employeeId: number,
    @Body() createVoteDto: CreateVoteDto
  ) {
    return this.voteService.create(employeeId, createVoteDto)
  }

  @Get()
  findAll(@Param('employeeId') employeeId: number) {
    return this.voteService.findAll(employeeId)
  }

  @Get(':id')
  findOne(@Param('employeeId') employeeId: number, @Param('id') id: number) {
    return this.voteService.findOne(employeeId, id)
  }

  @Patch(':id')
  update(
    @Param('employeeId') employeeId: number,
    @Param('id') id: number,
    @Body() updateVoteDto: UpdateVoteDto
  ) {
    return this.voteService.update(employeeId, id, updateVoteDto)
  }

  @Delete(':id')
  remove(@Param('employeeId') employeeId: number, @Param('id') id: number) {
    return this.voteService.remove(employeeId, id)
  }
}
