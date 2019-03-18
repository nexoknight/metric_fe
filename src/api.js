import axios from 'axios'
import qs from 'query-string'

axios.interceptors.request.use(
  config => ({
    ...config,
    withCredentials: true,
    paramsSerializer: params => qs.stringify(params, { encode: false })
  }),
  error => Promise.reject(error)
)

// backend endpoint
const path = 'http://some-address'

export const fetchData = (payload) => {
  return axios.get(`${path}/allIntegrationOnlyBilling`, { params: payload })
}

export const fetchMetrics = (payload) => {
  return axios.get(`${path}/query/get-queries`, { params: payload })
}

export const fetchGroups = () => {
  return axios.get(`${path}/query/get-all`)
}

export const fetchAddMetric = ({ payload }) => {
  return axios.post(`${path}/query/save`, payload)
}

export const fetchDeleteMetric = ({ payload }) => {
  return axios.get(`${path}/query/delete`, { params: payload })
}
