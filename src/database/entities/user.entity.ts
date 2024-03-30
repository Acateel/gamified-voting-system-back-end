import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Employee } from './employee.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
  })
  email: string

  @Column({ select: false })
  password: string

  @OneToOne(() => Employee, (employee) => employee.user, {
    onDelete: 'CASCADE',
  })
  employee: Employee

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
