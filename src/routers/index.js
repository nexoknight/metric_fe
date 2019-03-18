import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Router from './Router'
import { loadGroups } from 'reducers/internal'

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadGroups
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Router))
