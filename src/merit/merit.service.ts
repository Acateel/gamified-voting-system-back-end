import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateMeritDto } from './dto/create-merit.dto'
import { UpdateMeritDto } from './dto/update-merit.dto'
import { Merit } from 'src/database/entities/merit.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Employee } from 'src/database/entities/employee.entity'

@Injectable()
export class MeritService {
  constructor(
    @InjectRepository(Merit)
    private meritRepo: Repository<Merit>,
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>
  ) {}

  async create(
    employeeId: number,
    { characteristic, coefficient }: CreateMeritDto
  ): Promise<Merit> {
    const employee = await this.employeeRepo.findOneBy({ id: employeeId })

    if (!employee) {
      throw new NotFoundException("Employee don't found")
    }

    const merit = new Merit()

    merit.characteristic = characteristic
    merit.coefficient = coefficient
    merit.employee = employee

    const result = await this.meritRepo.save(merit)

    return result
  }

  async findAll(employeeId: number): Promise<Merit[]> {
    const merits = await this.meritRepo.findBy({ employee: { id: employeeId } })

    return merits
  }

  async findOne(id: number): Promise<Merit> {
    const merit = await this.meritRepo.findOneBy({ id })

    return merit
  }

  async update(
    employeeId: number,
    id: number,
    { characteristic, coefficient }: UpdateMeritDto
  ): Promise<Merit> {
    const merit = await this.meritRepo.findOneBy({
      id,
      employee: { id: employeeId },
    })

    if (!merit) {
      throw new NotFoundException("Merit don't found")
    }

    merit.characteristic = characteristic ?? merit.characteristic
    merit.coefficient = coefficient ?? merit.coefficient

    const result = await this.meritRepo.save(merit)

    return result
  }

  async remove(employeeId: number, id: number): Promise<Merit> {
    const merit = await this.meritRepo.findOneBy({
      id,
      employee: { id: employeeId },
    })

    if (!merit) {
      throw new NotFoundException("Merit don't found")
    }

    const result = await this.meritRepo.delete(id)

    if (result.affected == 0) {
      throw new ForbiddenException('Cannot delete merit')
    }

    return merit
  }
}
