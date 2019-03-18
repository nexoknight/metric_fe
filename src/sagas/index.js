import { all, takeEvery } from 'redux-saga/effects'

import { LOAD_DATA } from '../reducers/dataReducer'
import { fetchDataSaga, fetchDataFromFilterSaga } from './dataSaga'

import { LOAD_GROUPS, CHANGE_ACTIVE_GROUP, CHANGE_ACTIVE_METRIC, ADD_METRICS, LOAD_METRICS, DELETE_METRICS } from '../reducers/internal'
import { fetchMetricsSaga, fetchGroupsSaga, fetchAddMetricSaga, fetchDeleteMetricSaga } from './internal'

function * mySaga () {
  yield all([
    takeEvery(LOAD_DATA, fetchDataFromFilterSaga),
    takeEvery(CHANGE_ACTIVE_METRIC, fetchDataSaga),
    takeEvery(CHANGE_ACTIVE_GROUP, fetchMetricsSaga),
    takeEvery(LOAD_METRICS, fetchMetricsSaga),
    takeEvery(LOAD_GROUPS, fetchGroupsSaga),
    takeEvery(ADD_METRICS, fetchAddMetricSaga),
    takeEvery(DELETE_METRICS, fetchDeleteMetricSaga)
  ])
}

export default mySaga
