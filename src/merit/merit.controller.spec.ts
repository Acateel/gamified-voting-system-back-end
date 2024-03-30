import { Test, TestingModule } from '@nestjs/testing'
import { MeritController } from './merit.controller'
import { MeritService } from './merit.service'

describe('MeritController', () => {
  let controller: MeritController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeritController],
      providers: [MeritService],
    }).compile()

    controller = module.get<MeritController>(MeritController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
