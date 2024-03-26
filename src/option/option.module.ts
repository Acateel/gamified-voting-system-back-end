import { Module } from '@nestjs/common'
import { OptionService } from './option.service'
import { OptionController } from './option.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Option } from 'src/database/entities/option.entity'
import { Voting } from 'src/database/entities/voting.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Voting, Option])],
  controllers: [OptionController],
  providers: [OptionService],
})
export class OptionModule {}
