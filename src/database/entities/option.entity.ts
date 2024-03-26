import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Voting } from './voting.entity'
import { Vote } from './vote.entity'

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column({ default: 0 })
  count: number

  @ManyToOne(() => Voting, (voting) => voting.options, { onDelete: 'CASCADE' })
  voting: Voting

  @OneToMany(() => Vote, (vote) => vote.option, { onDelete: 'CASCADE' })
  votes: Vote[]

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
