import { createAction, handleActions } from 'redux-actions'
import moment from 'moment'
import getTableData from 'helpers/tableHalperForSaga'

export const TEAM_A_S_FETCH = 'data/TEAM_A_S_FETCH'
export const TEAM_A_S_FETCH_SUCCESS = 'data/TEAM_A_S_FETCH_SUCCESS'
export const TEAM_A_S_FETCH_ERROR = 'data/TEAM_A_S_FETCH_ERROR'
export const TEAM_A_S_FETCH_FAILURE = 'data/TEAM_A_S_FETCH_FAILURE'

export const getTeamAS = createAction(TEAM_A_S_FETCH)

const initialState = {
  data: null,
  isLoading: false,
  isError: false
}

export default handleActions({
  [TEAM_A_S_FETCH]: (state) => ({
    ...state,
    data: null,
    isLoading: true,
    isError: false
  }),
  [TEAM_A_S_FETCH_SUCCESS]: (state, { payload }) => {
    return ({
      ...state,
      data: {
        inOut: {
          name: payload[0].DataName,
          categories: payload[0].Periods.map(item => moment(item.startDate).format('MMMM YYYY')),
          activatedCount: payload[0].Periods.map(item => item.activatedCount),
          createdCount: payload[0].Periods.map(item => item.createdCount),
          closedCount: payload[0].Periods.map(item => item.closedCount),
          table: getTableData(payload[0].Periods)
        },
        backlog: {
          name: payload[1].DataName,
          categories: payload[1].Periods.map(item => `${moment(item.startDate).format('MMMM YYYY')} - ${moment(item.endDate).format('MMMM YYYY')}`),
          percentil: payload[1].Periods.map(item => item.percentilBacklogTime),
          table: getTableData(payload[1].Periods)
        },
        lead: {
          name: payload[2].DataName,
          categories: payload[2].Periods.map(item => `${moment(item.startDate).format('MMMM YYYY')} - ${moment(item.endDate).format('MMMM YYYY')}`),
          percentil: payload[2].Periods.map(item => item.percentilLeadTime),
          table: getTableData(payload[2].Periods)
        }
      },
      isLoading: false,
      isError: false
    })
  },
  [TEAM_A_S_FETCH_ERROR]: (state) => ({
    ...state,
    data: null,
    isLoading: false,
    isError: true
  }),
  [TEAM_A_S_FETCH_FAILURE]: (state) => ({
    ...state,
    data: null,
    isLoading: false,
    isError: true
  })
}, initialState)
