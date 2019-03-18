import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { isNil } from 'lodash'
// #region import Material
import { DatePicker } from 'material-ui-pickers'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
// #endregion import Material
import styles from 'constants/styles/FilterStyles'

class Filter extends PureComponent {
  state = {
    selectedDate: moment().subtract(1, 'year'),
    stepBacklogTime: '5',
    stepLeadTime: '2'
  }

  styles = styles(this.props.theme)

  static getDerivedStateFromProps = (props, state) => {
    const { activeMetricId, filters } = props
    if (isNil(activeMetricId)) {
      return null
    } else {
      return filters[activeMetricId]
    }
  }

  handleChange = name => event => {
    const { changeValues, activeMetricId } = this.props

    this.setState({ [name]: event.target.value })
    changeValues({
      id: activeMetricId,
      [name]: event.target.value
    })
  }

  handleDateChange = date => {
    const { changeValues, activeMetricId } = this.props

    this.setState({ selectedDate: date })
    changeValues({
      id: activeMetricId,
      selectedDate: moment(date).format('YYYY-MM-DD')
    })
  }

  handleClick = __ => {
    const { changeValues, activeMetricId } = this.props

    changeValues({
      id: activeMetricId,
      selectedDate: moment().format('YYYY-MM-DD'),
      stepBacklogTime: '0',
      stepLeadTime: '0'
    })
  }

  handleLoading = __ => {
    const { loadData } = this.props
    loadData()
  }

  render () {
    const { classes } = this.props
    const { selectedDate, stepBacklogTime, stepLeadTime } = this.state

    return (
      <Fragment>
        <Paper className={classes.paper}>
          <div className={classes.filters}>
            <DatePicker
              margin='normal'
              variant='filled'
              label='Дата начала'
              value={selectedDate}
              onChange={this.handleDateChange}
              format='MM.YYYY'
            />
            <TextField
              id='outlined-number'
              label='Step Backlog Time'
              variant='filled'
              value={stepBacklogTime}
              onChange={this.handleChange('stepBacklogTime')}
              type='number'
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin='normal'
            />
            <TextField
              id='outlined-number'
              label='Step Lead Time'
              variant='filled'
              value={stepLeadTime}
              onChange={this.handleChange('stepLeadTime')}
              type='number'
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin='normal'
            />
          </div>
          <Divider />
          <div className={classes.filters}>
            <Button className={classes.primaryButton} variant='text' onClick={this.handleLoading} size='small'>Загрузить</Button>
            <Button variant='text' onClick={this.handleClick} size='small'>Очистить</Button>
          </div>
        </Paper>
      </Fragment>
    )
  }
}

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  changeValues: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  activeMetricId: PropTypes.string
}

export default (withStyles(styles, { withTheme: true })(Filter))
