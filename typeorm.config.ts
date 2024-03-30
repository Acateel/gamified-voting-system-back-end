import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DataSource } from 'typeorm'
import { Employee } from './src/database/entities/employee.entity'
import { Merit } from './src/database/entities/merit.entity'
import { Option } from './src/database/entities/option.entity'
import { Vote } from './src/database/entities/vote.entity'
import { Voting } from './src/database/entities/voting.entity'
import { User } from './src/database/entities/user.entity'

config()

const configService = new ConfigService()

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('TYPEORM_HOST'),
  port: configService.getOrThrow('TYPEORM_PORT'),
  database: configService.getOrThrow('TYPEORM_DATABASE'),
  username: configService.getOrThrow('TYPEORM_USERNAME'),
  password: configService.getOrThrow('TYPEORM_PASSWORD'),
  logging: configService.getOrThrow('TYPEORM_LOGGING'),
  synchronize: false,
  migrations: ['migrations/**'],
  entities: [Employee, Merit, Option, Vote, Voting, User],
})
