import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateOptionDto } from './dto/create-option.dto'
import { UpdateOptionDto } from './dto/update-option.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Voting } from 'src/database/entities/voting.entity'
import { Repository } from 'typeorm'
import { Option } from 'src/database/entities/option.entity'

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Voting)
    private votingRepo: Repository<Voting>,
    @InjectRepository(Option)
    private optionRepo: Repository<Option>
  ) {}

  async create(
    votingId: number,
    createOptionDto: CreateOptionDto
  ): Promise<Option> {
    const voting = await this.votingRepo.findOneBy({ id: votingId })

    if (!voting) {
      throw new NotFoundException("Voting don't found")
    }

    const option = new Option()

    option.text = createOptionDto.text
    option.voting = voting

    const result = await this.optionRepo.save(option)

    return result
  }

  async findAll(votingId: number): Promise<Option[]> {
    const options = await this.optionRepo.findBy({ voting: { id: votingId } })

    return options
  }

  async findOne(votingId: number, id: number): Promise<Option> {
    const option = await this.optionRepo.findOneBy({
      id,
      voting: { id: votingId },
    })

    return option
  }

  async update(
    votingId: number,
    id: number,
    updateOptionDto: UpdateOptionDto
  ): Promise<Option> {
    const option = await this.optionRepo.findOneBy({
      id,
      voting: { id: votingId },
    })

    if (!option) {
      throw new NotFoundException("Option don't found")
    }

    option.text = updateOptionDto.text ?? option.text

    const result = await this.optionRepo.save(option)

    return result
  }

  async remove(votingId: number, id: number) {
    const option = await this.optionRepo.findOneBy({
      id,
      voting: { id: votingId },
    })

    if (!option) {
      throw new NotFoundException("Option don't found")
    }

    const result = await this.optionRepo.delete(id)

    if (result.affected == 0) {
      throw new ForbiddenException('Cannot delete option')
    }

    return option
  }
}
