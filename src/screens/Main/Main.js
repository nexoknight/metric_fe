import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { isNil, get, isEmpty } from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import Filter from 'containers/Filter'
import styles from 'constants/styles/PaperStyles'
import LeadTime from 'components/LeadTime'
import BacklogTime from 'components/BacklogTime'
import InOut from 'components/InOut'
import Skeleton from 'components/Skeleton'
import Start from 'screens/Start'

class Main extends Component {
  styles = styles(this.props.theme)

  state = {
    isLoading: false
  }

  static getDerivedStateFromProps = (props, state) => {
    const { changeValues, activeMetricId, filters } = props

    if (isEmpty(filters) && activeMetricId) {
      changeValues({
        id: activeMetricId,
        selectedDate: moment().subtract(1, 'year').format('YYYY-MM-DD'),
        stepBacklogTime: '5',
        stepLeadTime: '2'
      })
      return null
    }
    return null
  }

  render = () => {
    const { isLoading, isError, isDataNull, data, activeMetricId } = this.props

    if (!activeMetricId) {
      return <Start />
    }

    if (!isLoading && !isError && !isDataNull && data) {
      const metric = get(data, `[${activeMetricId}]`)

      if (!isNil(metric)) {
        const { lead, backlog, inOut } = metric

        return (
          <Fragment>
            <Filter />
            <LeadTime
              name={lead.name}
              leadCategories={lead.categories}
              percentilLeadTime={lead.percentil}
              table={lead.table}
            />
            <BacklogTime
              name={backlog.name}
              backlogCategories={backlog.categories}
              percentilBacklogTime={backlog.percentil}
              table={backlog.table}
            />
            <InOut
              name={inOut.name}
              categories={inOut.categories}
              activatedCount={inOut.activatedCount}
              closedCount={inOut.closedCount}
              createdCount={inOut.createdCount}
              table={inOut.table}
            />
          </Fragment>
        )
      } else {
        return (
          <Skeleton />
        )
      }
    } else {
      return (
        <Skeleton />
      )
    }
  }
}

Main.propTypes = {
  theme: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isDataNull: PropTypes.bool.isRequired,
  changeValues: PropTypes.func.isRequired,
  filters: PropTypes.object,
  activeMetricId: PropTypes.string,
  data: PropTypes.object
}

export default withStyles(styles, { withTheme: true })(Main)
