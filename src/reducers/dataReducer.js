import { createAction, handleActions } from 'redux-actions'
import moment from 'moment'
import getTableData from 'helpers/tableHalperForSaga'

export const LOAD_DATA = 'data/LOAD_DATA'
export const LOAD_DATA_SUCCESS = 'data/LOAD_DATA_SUCCESS'
export const LOAD_DATA_ERROR = 'data/LOAD_DATA_ERROR'
export const LOAD_DATA_FAILURE = 'data/LOAD_DATA_FAILURE'

const initalState = {
  data: null,
  isDataNull: true,
  isLoading: true,
  isError: false
}

export const loadData = createAction(LOAD_DATA)

export default handleActions({
  [LOAD_DATA]: (state, { payload }) => {
    return ({
      ...state,
      data: {
        ...state.data
      },
      isLoading: true,
      isError: false,
      isDataNull: true
    })
  },
  [LOAD_DATA_SUCCESS]: (state, { payload: { id, data } }) => {
    return ({
      ...state,
      data: {
        ...state.data,
        [id]: {
          inOut: {
            name: data[0].DataName,
            categories: data[0].Periods.map(item => moment(item.startDate).format('MMMM YYYY')),
            activatedCount: data[0].Periods.map(item => item.activatedCount),
            createdCount: data[0].Periods.map(item => item.createdCount),
            closedCount: data[0].Periods.map(item => item.closedCount),
            table: getTableData(data[0].Periods)
          },
          backlog: {
            name: data[1].DataName,
            categories: data[1].Periods.map(item => `${moment(item.startDate).format('MMMM YYYY')} - ${moment(item.endDate).format('MMMM YYYY')}`),
            percentil: data[1].Periods.map(item => item.percentilBacklogTime),
            table: getTableData(data[1].Periods)
          },
          lead: {
            name: data[2].DataName,
            categories: data[2].Periods.map(item => `${moment(item.startDate).format('MMMM YYYY')} - ${moment(item.endDate).format('MMMM YYYY')}`),
            percentil: data[2].Periods.map(item => item.percentilLeadTime),
            table: getTableData(data[2].Periods)
          }
        }
      },
      isLoading: false,
      isError: false,
      isDataNull: false
    })
  },
  [LOAD_DATA_ERROR]: (state, { payload: { id, data } }) => ({
    ...state,
    data: {
      ...state.data,
      [id]: null
    },
    isLoading: false,
    isError: true,
    isDataNull: false
  }),
  [LOAD_DATA_FAILURE]: (state, { payload: { id, data } }) => ({
    ...state,
    data: {
      ...state.data,
      [id]: null
    },
    isLoading: false,
    isError: true,
    isDataNull: false
  })
}, initalState)
