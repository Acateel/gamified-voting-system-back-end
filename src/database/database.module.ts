import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Employee } from './entities/employee.entity'
import { Merit } from './entities/merit.entity'
import { Vote } from './entities/vote.entity'
import { Voting } from './entities/voting.entity'
import { Option } from './entities/option.entity'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('TYPEORM_HOST'),
        port: configService.getOrThrow('TYPEORM_PORT'),
        database: configService.getOrThrow('TYPEORM_DATABASE'),
        username: configService.getOrThrow('TYPEORM_USERNAME'),
        password: configService.getOrThrow('TYPEORM_PASSWORD'),
        logging: configService.getOrThrow('TYPEORM_LOGGING'),
        synchronize: false,
        entities: [Employee, Merit, Option, Vote, Voting],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
