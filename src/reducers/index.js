import { combineReducers } from 'redux'
import filters from './filterReducer'
import data from './dataReducer'
import internal from './internal'

const rootReducer = combineReducers({
  internalState: internal,
  filtersState: filters,
  dataState: data
})

export default rootReducer
