import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Voting } from './voting.entity'

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

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
