import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Layout from './Layout'
import { changeActiveGroup, changeActiveMetric, addMetrics, deleteMetrics } from 'reducers/internal'

const mapStateToProps = (state) => {
  return {
    isLoading: false,
    ...state.internalState
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  changeActiveGroup,
  changeActiveMetric,
  addMetrics,
  deleteMetrics
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))
