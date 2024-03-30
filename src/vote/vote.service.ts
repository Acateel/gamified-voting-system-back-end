import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateVoteDto } from './dto/create-vote.dto'
import { UpdateVoteDto } from './dto/update-vote.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Vote } from 'src/database/entities/vote.entity'
import { Repository } from 'typeorm'
import { Option } from 'src/database/entities/option.entity'
import { Employee } from 'src/database/entities/employee.entity'
import { CalcVoteWeight } from './util'

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote)
    private voteRepo: Repository<Vote>,
    @InjectRepository(Option)
    private optionRepo: Repository<Option>,
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>
  ) {}

  async create(employeeId: number, { optionId }: CreateVoteDto): Promise<Vote> {
    const employee = await this.findEmployeeIncludeMerit(employeeId)

    const option = await this.findOptionIncludeVoting(optionId)

    const vote = new Vote()

    vote.employee = employee
    vote.option = option
    vote.weight = CalcVoteWeight(employee, option.voting)

    const result = await this.voteRepo.save(vote)

    option.count += vote.weight
    await this.optionRepo.save(option)

    return result
  }

  async findAll(employeeId: number): Promise<Vote[]> {
    const votes = await this.voteRepo.findBy({ employee: { id: employeeId } })

    return votes
  }

  async findOne(employeeId: number, id: number): Promise<Vote> {
    const vote = await this.voteRepo.findOneBy({
      id,
      employee: { id: employeeId },
    })

    return vote
  }

  async update(
    employeeId: number,
    id: number,
    { optionId }: UpdateVoteDto
  ): Promise<Vote> {
    const vote = await this.voteRepo.findOne({
      where: {
        id,
        employee: { id: employeeId },
      },
      relations: {
        option: {
          voting: true,
        },
        employee: { merits: true },
      },
    })

    if (!vote) {
      throw new NotFoundException('Vote dont found')
    }

    const newOption = await this.findOptionIncludeVoting(optionId)

    if (newOption.voting.id != vote.option.voting.id) {
      throw new ForbiddenException('This option dont in current voting')
    }

    vote.option.count -= vote.weight
    await this.optionRepo.save(vote.option)

    if (vote.option.id == newOption.id) {
      newOption.count -= vote.weight
    }

    vote.weight = CalcVoteWeight(vote.employee, vote.option.voting)
    vote.option = newOption
    newOption.count += vote.weight
    await this.optionRepo.save(vote.option)

    const result = await this.voteRepo.save(vote)

    return result
  }

  async remove(employeeId: number, id: number): Promise<Vote> {
    const vote = await this.voteRepo.findOne({
      where: {
        id,
        employee: { id: employeeId },
      },
      relations: {
        option: true,
      },
    })

    if (!vote) {
      throw new NotFoundException('Vote dont found')
    }

    const result = await this.voteRepo.delete(id)

    if (result.affected == 0) {
      throw new ForbiddenException('Cannot delete vote')
    }

    vote.option.count -= vote.weight
    await this.optionRepo.save(vote.option)

    return vote
  }

  async findEmployeeIncludeMerit(employeeId: number): Promise<Employee> {
    const employee = await this.employeeRepo.findOne({
      where: {
        id: employeeId,
      },
      relations: {
        merits: true,
      },
    })

    if (!employee) {
      throw new NotFoundException('Employee dont found')
    }

    return employee
  }

  async findOptionIncludeVoting(optionId: number): Promise<Option> {
    const option = await this.optionRepo.findOne({
      where: {
        id: optionId,
      },
      relations: {
        voting: true,
      },
    })

    if (!option) {
      throw new NotFoundException('Option dont found')
    }

    return option
  }
}
