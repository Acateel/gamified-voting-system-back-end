import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Employee } from './employee.entity'
import { Characteristic } from '../../common/characteristic-enum'

@Entity()
export class Merit {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: Characteristic,
  })
  characteristic: Characteristic

  @Column()
  coefficient: number

  @ManyToOne(() => Employee, (employee) => employee.merits, {
    onDelete: 'CASCADE',
  })
  employee: Employee

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
