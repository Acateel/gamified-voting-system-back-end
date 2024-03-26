import { Characteristic } from 'src/common/characteristic-enum'
import { Employee } from 'src/database/entities/employee.entity'
import { Merit } from 'src/database/entities/merit.entity'
import { Voting } from 'src/database/entities/voting.entity'

export function CalcVoteWeight(employee: Employee, voting: Voting): number {
  const {
    purposefulness_ex,
    determination_ex,
    analysis_ex,
    planning_ex,
    activity_ex,
  } = CalcMetits(employee.merits)

  const purposefulnessWeight =
    (purposefulness_ex + 1) *
    (employee.purposefulness / 100) *
    (voting.purposefulness_cof / 100)

  const determinationWeight =
    (determination_ex + 1) *
    (employee.determination / 100) *
    (voting.determination_cof / 100)

  const analysisWeight =
    (analysis_ex + 1) * (employee.analysis / 100) * (voting.analysis_cof / 100)

  const planningWeight =
    (planning_ex + 1) * (employee.planning / 100) * (voting.planning_cof / 100)

  const activityWeight =
    (activity_ex + 1) * (employee.activity / 100) * (voting.activity_cof / 100)

  const weight =
    purposefulnessWeight +
    determinationWeight +
    analysisWeight +
    planningWeight +
    activityWeight

  return weight
}

export function CalcMetits(merits: Merit[]) {
  const resultMerits = {
    purposefulness_ex: 0,
    determination_ex: 0,
    analysis_ex: 0,
    planning_ex: 0,
    activity_ex: 0,
  }

  for (const merit of merits) {
    switch (merit.characteristic) {
      case Characteristic.Purposefulness:
        resultMerits.purposefulness_ex += merit.coefficient / 100
        break
      case Characteristic.Determination:
        resultMerits.determination_ex += merit.coefficient / 100
        break
      case Characteristic.Analysis:
        resultMerits.analysis_ex += merit.coefficient / 100
        break
      case Characteristic.Planning:
        resultMerits.planning_ex += merit.coefficient / 100
        break
      case Characteristic.Activity:
        resultMerits.activity_ex += merit.coefficient / 100
        break
    }
  }

  return resultMerits
}
