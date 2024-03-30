import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from 'src/database/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Employee } from 'src/database/entities/employee.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>
  ) {}

  async create({ email, password }: CreateUserDto): Promise<User> {
    const user = new User()

    user.email = email
    user.password = password

    const result = await this.userRepo.save(user)

    delete result.password

    return result
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepo.find()

    return users
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOneBy({ id })

    return user
  }

  async findOneByEmailWithPassword(email: string): Promise<User> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne()

    return user
  }

  async update(id: number, { employeeId }: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findOneBy({ id })

    if (!user) {
      throw new NotFoundException('User dont found')
    }

    const employee = await this.employeeRepo.findOneBy({ id: employeeId })

    if (!employee) {
      throw new NotFoundException('Employee dont found')
    }

    user.employee = employee

    const result = await this.userRepo.save(user)

    return result
  }

  async remove(id: number): Promise<User> {
    const user = await this.userRepo.findOneBy({ id })

    if (!user) {
      throw new NotFoundException('User dont found')
    }

    const result = await this.userRepo.delete(id)

    if (result.affected == 0) {
      throw new ForbiddenException('Cannot delete user')
    }

    return user
  }
}
