import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Option } from './option.entity'
import { Vote } from './vote.entity'

@Entity()
export class Voting {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  details: string

  @Column({ default: 1 })
  purposefulness_cof: number

  @Column({ default: 1 })
  determination_cof: number

  @Column({ default: 1 })
  analysis_cof: number

  @Column({ default: 1 })
  planning_cof: number

  @Column({ default: 1 })
  activity_cof: number

  @OneToMany(() => Option, (option) => option.voting, { onDelete: 'CASCADE' })
  options: Option[]

  @OneToMany(() => Vote, (vote) => vote.voting, { onDelete: 'CASCADE' })
  votes: Vote[]

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
