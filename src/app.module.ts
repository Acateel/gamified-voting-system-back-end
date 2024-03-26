import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from '@nestjs/config'
import { EmployeeModule } from './employee/employee.module';
import { MeritModule } from './merit/merit.module';
import { VotingModule } from './voting/voting.module';
import { OptionModule } from './option/option.module';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, EmployeeModule, MeritModule, VotingModule, OptionModule, VoteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
