import { FC } from 'react'
import { createCurve } from './points'
import {Base, Line} from './curve.styles'
import {EXPERT_COLOR, PROFICIENT_COLOR, NOVICE_COLOR} from './score-colors'


interface CurveProps {
  height: number
  width: number
}

/**
 * Score curve portion of the skill graph
 */
export const Curve: FC<CurveProps> = ({ height, width }) => (
  <Base  aria-hidden>
    <Line
      stroke={NOVICE_COLOR}
      strokeWidth={2}
      d={createCurve(0, 100, height, width)}
    />
    <Line
      stroke={PROFICIENT_COLOR}
      strokeWidth={2}
      d={createCurve(100, 200, height, width)}
    />
    <Line
      stroke={EXPERT_COLOR}
      strokeWidth={2}
      d={createCurve(200, 300, height, width)}
    />
  </Base>
)