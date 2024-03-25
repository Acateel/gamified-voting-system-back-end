import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { Repository } from 'typeorm'
import { Employee } from 'src/database/entities/employee.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = new Employee()

    employee.fullname = createEmployeeDto.fullname
    employee.specialty = createEmployeeDto.specialty
    employee.purposefulness = createEmployeeDto.purposefulness
    employee.determination = createEmployeeDto.determination
    employee.analysis = createEmployeeDto.analysis
    employee.planning = createEmployeeDto.activity
    employee.activity = createEmployeeDto.activity

    const result = await this.employeeRepo.save(employee)

    return result
  }

  async findAll(): Promise<Employee[]> {
    const employees = await this.employeeRepo.find()
    return employees
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepo.findOneBy({ id })
    return employee
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto
  ): Promise<Employee> {
    const employee = await this.employeeRepo.findOneBy({ id })

    employee.fullname = updateEmployeeDto.fullname ?? employee.fullname
    employee.specialty = updateEmployeeDto.specialty ?? employee.specialty
    employee.purposefulness =
      updateEmployeeDto.purposefulness ?? employee.purposefulness
    employee.determination =
      updateEmployeeDto.determination ?? employee.determination
    employee.analysis = updateEmployeeDto.analysis ?? employee.analysis
    employee.planning = updateEmployeeDto.activity ?? employee.planning
    employee.activity = updateEmployeeDto.activity ?? employee.activity

    const result = await this.employeeRepo.save(employee)

    return result
  }

  async remove(id: number) {
    const employee = await this.employeeRepo.findOneBy({ id })

    if (!employee) {
      throw new NotFoundException("Employee don't found")
    }

    const result = await this.employeeRepo.delete(id)

    if (result.affected == 0) {
      throw new ForbiddenException('Cannot delete employee')
    }

    return employee
  }
}
