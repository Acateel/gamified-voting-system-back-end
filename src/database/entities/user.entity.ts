import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @OneToOne(() => Employee, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  employee: Employee

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
