import { createAction, handleActions } from 'redux-actions'
// import moment from 'moment'
import { isNil } from 'lodash'

export const CHANGE_VALUES = 'filters/CHANGE_FILTER'

const initalState = {}

export const changeValues = createAction(CHANGE_VALUES)

export default handleActions({
  [CHANGE_VALUES]: (state, { payload: { id, selectedDate, stepBacklogTime, stepLeadTime } }) => {
    if (isNil(state[id])) {
      return ({
        ...state,
        [id]: {
          selectedDate: selectedDate,
          stepBacklogTime: stepBacklogTime,
          stepLeadTime: stepLeadTime
        }
      })
    } else {
      return ({
        ...state,
        [id]: {
          selectedDate: isNil(selectedDate) ? state[id].selectedDate : selectedDate,
          stepBacklogTime: isNil(stepBacklogTime) ? state[id].stepBacklogTime : stepBacklogTime,
          stepLeadTime: isNil(stepLeadTime) ? state[id].stepLeadTime : stepLeadTime
        }
      })
    }
  }
}, initalState)
