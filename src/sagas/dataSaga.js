import { call, put } from 'redux-saga/effects'
import createdStore from 'createdStore'
import moment from 'moment'

import {
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
  LOAD_DATA_FAILURE
} from 'reducers/dataReducer'

import { fetchData } from 'api'

export function * fetchDataSaga ({ payload }) {
  try {
    const store = createdStore.getState()
    const {
      internalState: { activeMetricId }
    } = store
    const { data } = yield call(fetchData, {
      queryId: activeMetricId,
      startDate: moment().subtract(1, 'year').format('YYYY-MM-DD'),
      stepBacklogTime: '5',
      stepLeadTime: '2'
    })
    if (data.PlotList) {
      yield put({ type: LOAD_DATA_SUCCESS, payload: { id: activeMetricId, data: data.PlotList } })
    } else {
      yield put({ type: LOAD_DATA_ERROR, payload: { id: activeMetricId, data: null } })
    }
  } catch (exception) {
    yield put({ type: LOAD_DATA_FAILURE, message: exception.message.text })
  }
}

export function * fetchDataFromFilterSaga ({ payload }) {
  try {
    const store = createdStore.getState()
    const {
      internalState: { activeMetricId },
      filtersState
    } = store
    const { data } = yield call(fetchData, {
      queryId: activeMetricId,
      startDate: filtersState[activeMetricId].selectedDate,
      stepBacklogTime: filtersState[activeMetricId].stepBacklogTime,
      stepLeadTime: filtersState[activeMetricId].stepLeadTime
    })
    if (data.PlotList) {
      yield put({ type: LOAD_DATA_SUCCESS, payload: { id: activeMetricId, data: data.PlotList } })
    } else {
      yield put({ type: LOAD_DATA_ERROR, payload: { id: activeMetricId, data: null } })
    }
  } catch (exception) {
    yield put({ type: LOAD_DATA_FAILURE, message: exception.message.text })
  }
}
