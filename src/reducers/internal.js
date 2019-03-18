import { createAction, handleActions } from 'redux-actions'

export const CHANGE_ACTIVE_GROUP = 'internal/CHANGE_ACTIVE_GROUP'
export const CHANGE_ACTIVE_METRIC = 'internal/CHANGE_ACTIVE_METRIC'

export const LOAD_METRICS = 'internal/LOAD_METRICS'
export const LOAD_METRICS_SUCCESS = 'internal/LOAD_METRICS_SUCCESS'
export const LOAD_METRICS_ERROR = 'internal/LOAD_METRICS_ERROR'
export const LOAD_METRICS_FAILURE = 'internal/LOAD_METRICS_FAILURE'

export const ADD_METRICS = 'internal/ADD_METRICS'
export const ADD_METRICS_SUCCESS = 'internal/ADD_METRICS_SUCCESS'
export const ADD_METRICS_ERROR = 'internal/ADD_METRICS_ERROR'
export const ADD_METRICS_FAILURE = 'internal/ADD_METRICS_FAILURE'

export const DELETE_METRICS = 'internal/DELETE_METRICS'
export const DELETE_METRICS_SUCCESS = 'internal/DELETE_METRICS_SUCCESS'
export const DELETE_METRICS_ERROR = 'internal/DELETE_METRICS_ERROR'
export const DELETE_METRICS_FAILURE = 'internal/DELETE_METRICS_FAILURE'

export const LOAD_GROUPS = 'internal/LOAD_GROUPS'
export const LOAD_GROUPS_SUCCESS = 'internal/LOAD_GROUPS_SUCCESS'
export const LOAD_GROUPS_ERROR = 'internal/LOAD_GROUPS_ERROR'
export const LOAD_GROUPS_FAILURE = 'internal/LOAD_GROUPS_FAILURE'

const initalState = {
  activeGroupId: null,
  activeMetricId: null,

  isMetricsLoading: false,
  isMetricsError: false,
  metrics: null,

  isMetricAdd: false,
  isAddMetricError: false,
  addMetric: null,

  isGroupsLoading: false,
  isGroupsError: false,
  groups: null
}

export const changeActiveGroup = createAction(CHANGE_ACTIVE_GROUP)
export const changeActiveMetric = createAction(CHANGE_ACTIVE_METRIC)
export const loadMetrics = createAction(LOAD_METRICS)
export const addMetrics = createAction(ADD_METRICS)
export const deleteMetrics = createAction(DELETE_METRICS)
export const loadGroups = createAction(LOAD_GROUPS)

export default handleActions({
  [CHANGE_ACTIVE_GROUP]: (state, { payload: { groupId, groupName } }) => {
    return ({
      ...state,
      activeGroupId: !!groupId && groupId,
      activeGroupName: !!groupName && groupName
    })
  },
  [CHANGE_ACTIVE_METRIC]: (state, { payload: { metricId, metricName } }) => {
    return ({
      ...state,
      activeMetricId: !!metricId && metricId,
      activeMetricName: !!metricName && metricName
    })
  },

  [LOAD_METRICS]: (state, { payload }) => {
    return ({
      ...state,
      isMetricsLoading: true,
      isMetricsError: false,
      metrics: null
    })
  },
  [LOAD_METRICS_SUCCESS]: (state, { payload: { metrics, groupId } }) => {
    return ({
      ...state,
      isMetricsLoading: false,
      isMetricsError: false,
      metrics: {
        ...state.metrics,
        [groupId]: metrics
      }
    })
  },
  [LOAD_METRICS_ERROR]: (state, { payload }) => {
    return ({
      ...state,
      isMetricsLoading: false,
      isMetricsError: true,
      metrics: null
    })
  },
  [LOAD_METRICS_FAILURE]: (state, { payload }) => {
    return ({
      ...state,
      isMetricsLoading: false,
      isMetricsError: true,
      metrics: null
    })
  },

  [DELETE_METRICS]: (state, { payload }) => {
    return ({
      ...state,
      isMetricsDeleting: true,
      isMetricsDeleteError: false
    })
  },
  [DELETE_METRICS_SUCCESS]: (state, { payload: { metrics, groupId } }) => {
    return ({
      ...state,
      isMetricsDeleting: false,
      isMetricsDeleteError: false
    })
  },
  [DELETE_METRICS_ERROR]: (state, { payload }) => {
    return ({
      ...state,
      isMetricsDeleting: false,
      isMetricsDeleteError: true
    })
  },
  [DELETE_METRICS_FAILURE]: (state, { payload }) => {
    return ({
      ...state,
      isMetricsDeleting: false,
      isMetricsDeleteError: true
    })
  },

  [LOAD_GROUPS]: (state, { payload }) => {
    return ({
      ...state,
      isGroupsLoading: true,
      isGroupsError: false,
      groups: null
    })
  },
  [LOAD_GROUPS_SUCCESS]: (state, { payload }) => {
    return ({
      ...state,
      isGroupsLoading: false,
      isGroupsError: false,
      groups: payload
    })
  },
  [LOAD_GROUPS_ERROR]: (state, { payload }) => {
    return ({
      ...state,
      isGroupsLoading: false,
      isGroupsError: true,
      groups: null
    })
  },
  [LOAD_GROUPS_FAILURE]: (state, { payload }) => {
    return ({
      ...state,
      isGroupsLoading: false,
      isGroupsError: true,
      groups: null
    })
  },

  [ADD_METRICS]: (state, { payload }) => {
    return ({
      ...state,
      isMetricAdd: true,
      isAddMetricError: false,
      addMetric: null
    })
  },
  [ADD_METRICS_SUCCESS]: (state, { payload }) => {
    return ({
      ...state,
      isMetricAdd: false,
      isAddMetricError: false,
      addMetric: payload
    })
  },
  [ADD_METRICS_ERROR]: (state, { payload }) => {
    return ({
      ...state,
      isMetricAdd: false,
      isAddMetricError: false,
      addMetric: null
    })
  },
  [ADD_METRICS_FAILURE]: (state, { payload }) => {
    return ({
      ...state,
      isMetricAdd: false,
      isAddMetricError: false,
      addMetric: null
    })
  }
}, initalState)
