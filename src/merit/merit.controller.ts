import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { MeritService } from './merit.service'
import { CreateMeritDto } from './dto/create-merit.dto'
import { UpdateMeritDto } from './dto/update-merit.dto'

@Controller('employee/:employeeId/merit')
export class MeritController {
  constructor(private readonly meritService: MeritService) {}

  @Post()
  create(
    @Param('employeeId') employeeId: number,
    @Body() createMeritDto: CreateMeritDto
  ) {
    return this.meritService.create(employeeId, createMeritDto)
  }

  @Get()
  findAll(@Param('employeeId') employeeId: number) {
    return this.meritService.findAll(employeeId)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.meritService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('employeeId') employeeId: number,
    @Param('id') id: number,
    @Body() updateMeritDto: UpdateMeritDto
  ) {
    return this.meritService.update(employeeId, id, updateMeritDto)
  }

  @Delete(':id')
  remove(@Param('employeeId') employeeId: number, @Param('id') id: number) {
    return this.meritService.remove(employeeId, id)
  }
}
