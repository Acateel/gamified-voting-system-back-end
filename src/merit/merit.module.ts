import { Module } from '@nestjs/common'
import { MeritService } from './merit.service'
import { MeritController } from './merit.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Merit } from 'src/database/entities/merit.entity'
import { Employee } from 'src/database/entities/employee.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Merit, Employee])],
  controllers: [MeritController],
  providers: [MeritService],
})
export class MeritModule {}
