import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateVotingDto } from './dto/create-voting.dto'
import { UpdateVotingDto } from './dto/update-voting.dto'
import { Repository } from 'typeorm'
import { Voting } from 'src/database/entities/voting.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class VotingService {
  constructor(
    @InjectRepository(Voting)
    private votingRepo: Repository<Voting>
  ) {}

  async create(createVotingDto: CreateVotingDto): Promise<Voting> {
    const voting = new Voting()

    voting.title = createVotingDto.title
    voting.details = createVotingDto.details
    voting.purposefulness_cof = createVotingDto.purposefulness_cof
    voting.determination_cof = createVotingDto.determination_cof
    voting.analysis_cof = createVotingDto.analysis_cof
    voting.planning_cof = createVotingDto.planning_cof
    voting.activity_cof = createVotingDto.activity_cof

    const result = this.votingRepo.save(voting)

    return result
  }

  async findAll(): Promise<Voting[]> {
    const votings = await this.votingRepo.find()

    return votings
  }

  async findOne(id: number): Promise<Voting> {
    const voting = await this.votingRepo.findOneBy({ id })

    return voting
  }

  async update(id: number, updateVotingDto: UpdateVotingDto): Promise<Voting> {
    const voting = await this.votingRepo.findOneBy({ id })

    if (!voting) {
      throw new NotFoundException("Voting don't found")
    }

    voting.title = updateVotingDto.title ?? voting.title
    voting.details = updateVotingDto.details ?? voting.details
    voting.purposefulness_cof =
      updateVotingDto.purposefulness_cof ?? voting.purposefulness_cof
    voting.determination_cof =
      updateVotingDto.determination_cof ?? voting.determination_cof
    voting.analysis_cof = updateVotingDto.analysis_cof ?? voting.analysis_cof
    voting.planning_cof = updateVotingDto.planning_cof ?? voting.planning_cof
    voting.activity_cof = updateVotingDto.activity_cof ?? voting.activity_cof

    const result = await this.votingRepo.save(voting)

    return result
  }

  async remove(id: number): Promise<Voting> {
    const voting = await this.votingRepo.findOneBy({ id })

    if (!voting) {
      throw new NotFoundException("Voting don't found")
    }

    const result = await this.votingRepo.delete(id)

    if (result.affected == 0) {
      throw new ForbiddenException('Cannot delete voting')
    }

    return voting
  }
}
