import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Employee } from './employee.entity'
import { Voting } from './voting.entity'

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  weight: number

  @ManyToOne(() => Employee, (employee) => employee.votes, {
    onDelete: 'CASCADE',
  })
  employee: Employee

  @ManyToOne(() => Voting, (voting) => voting.votes, { onDelete: 'CASCADE' })
  voting: Voting

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
