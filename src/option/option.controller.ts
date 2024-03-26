import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { OptionService } from './option.service'
import { CreateOptionDto } from './dto/create-option.dto'
import { UpdateOptionDto } from './dto/update-option.dto'

@Controller('voting/:votingId/option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  create(
    @Param('votingId') votingId: number,
    @Body() createOptionDto: CreateOptionDto
  ) {
    return this.optionService.create(votingId, createOptionDto)
  }

  @Get()
  findAll(@Param('votingId') votingId: number) {
    return this.optionService.findAll(votingId)
  }

  @Get(':id')
  findOne(@Param('votingId') votingId: number, @Param('id') id: number) {
    return this.optionService.findOne(votingId, id)
  }

  @Patch(':id')
  update(
    @Param('votingId') votingId: number,
    @Param('id') id: number,
    @Body() updateOptionDto: UpdateOptionDto
  ) {
    return this.optionService.update(votingId, id, updateOptionDto)
  }

  @Delete(':id')
  remove(@Param('votingId') votingId: number, @Param('id') id: number) {
    return this.optionService.remove(votingId, id)
  }
}
