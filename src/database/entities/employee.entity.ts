import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Merit } from './merit.entity'
import { Vote } from './vote.entity'
import { User } from './user.entity'

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  fullname: string

  @Column()
  specialty: string

  @Column()
  purposefulness: number

  @Column()
  determination: number

  @Column()
  analysis: number

  @Column()
  planning: number

  @Column()
  activity: number

  @OneToMany(() => Merit, (merit) => merit.employee, { onDelete: 'CASCADE' })
  merits: Merit[]

  @OneToMany(() => Vote, (vote) => vote.employee, { onDelete: 'CASCADE' })
  votes: Vote[]

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
