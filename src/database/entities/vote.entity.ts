import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Employee } from './employee.entity'
import { Option } from './option.entity'

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'real' })
  weight: number

  @ManyToOne(() => Employee, (employee) => employee.votes, {
    onDelete: 'CASCADE',
  })
  employee: Employee

  @ManyToOne(() => Option, (option) => option.votes, { onDelete: 'CASCADE' })
  option: Option

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
