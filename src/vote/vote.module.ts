import { Module } from '@nestjs/common'
import { VoteService } from './vote.service'
import { VoteController } from './vote.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Vote } from 'src/database/entities/vote.entity'
import { Option } from 'src/database/entities/option.entity'
import { Employee } from 'src/database/entities/employee.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Vote, Option, Employee])],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
