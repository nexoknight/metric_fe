import { call, put } from 'redux-saga/effects'
import { get, isNil } from 'lodash'
import createdStore from 'createdStore'

import {
  LOAD_METRICS,
  LOAD_METRICS_SUCCESS,
  LOAD_METRICS_ERROR,
  LOAD_METRICS_FAILURE,

  LOAD_GROUPS_SUCCESS,
  LOAD_GROUPS_ERROR,
  LOAD_GROUPS_FAILURE,

  ADD_METRICS_SUCCESS,
  ADD_METRICS_ERROR,
  ADD_METRICS_FAILURE,

  DELETE_METRICS_SUCCESS,
  DELETE_METRICS_ERROR,
  DELETE_METRICS_FAILURE
} from 'reducers/internal'

import { fetchMetrics, fetchGroups, fetchAddMetric, fetchDeleteMetric } from 'api'

export function * fetchMetricsSaga ({ payload }) {
  try {
    const store = createdStore.getState()
    const { internalState: { activeGroupId, metrics } } = store
    let groupId

    if (isNil(payload)) {
      groupId = payload.id
    } else {
      groupId = activeGroupId
    }

    const isMetricsLoaded = get(metrics, `[${groupId}]`)
    if (groupId && !isMetricsLoaded) {
      const { data } = yield call(fetchMetrics, { groupId: groupId })
      if (data.IsSuccess) {
        yield put({ type: LOAD_METRICS_SUCCESS, payload: { metrics: data.Data, groupId: groupId } })
      } else {
        yield put({ type: LOAD_METRICS_ERROR, payload: data.Message })
      }
    }
  } catch (exception) {
    yield put({ type: LOAD_METRICS_FAILURE, message: exception.message.text })
  }
}

export function * fetchGroupsSaga () {
  try {
    const { data } = yield call(fetchGroups)
    if (data.IsSuccess) {
      yield put({ type: LOAD_GROUPS_SUCCESS, payload: data.Data })
    } else {
      yield put({ type: LOAD_GROUPS_ERROR, payload: data.Message })
    }
  } catch (exception) {
    yield put({ type: LOAD_GROUPS_FAILURE, message: exception.message.text })
  }
}

export function * fetchAddMetricSaga (payload) {
  try {
    const { data } = yield call(fetchAddMetric, payload)
    if (data.IsSuccess) {
      yield put({ type: ADD_METRICS_SUCCESS, payload: data.Data })
      yield put({ type: LOAD_METRICS, payload: { id: '5c7416681c9d4400004a9cb0' } })
    } else {
      yield put({ type: ADD_METRICS_ERROR, payload: data.Message })
    }
  } catch (exception) {
    yield put({ type: ADD_METRICS_FAILURE, message: exception.message.text })
  }
}

export function * fetchDeleteMetricSaga (payload) {
  try {
    const { data } = yield call(fetchDeleteMetric, payload)
    if (data.IsSuccess) {
      yield put({ type: DELETE_METRICS_SUCCESS, payload: data.Data })
      yield put({ type: LOAD_METRICS, payload: { id: '5c7416681c9d4400004a9cb0' } })
    } else {
      yield put({ type: DELETE_METRICS_ERROR, payload: data.Message })
    }
  } catch (exception) {
    yield put({ type: DELETE_METRICS_FAILURE, message: exception.message.text })
  }
}
