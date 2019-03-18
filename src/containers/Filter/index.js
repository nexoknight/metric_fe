import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Filter from './Filter'
import { changeValues } from 'reducers/filterReducer'
import { loadData } from 'reducers/dataReducer'

const mapStateToProps = (state) => {
  return {
    ...state.internalState,
    filters: state.filtersState
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  changeValues,
  loadData
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter))
