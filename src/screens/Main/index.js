import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { loadData } from 'reducers/dataReducer'
import { changeValues } from 'reducers/filterReducer'
import Main from './Main'

const mapStateToProps = (state) => {
  return {
    filters: state.filtersState, // window.location.pathname.replace('/', '')
    ...state.dataState,
    ...state.internalState
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadData,
  changeValues
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
