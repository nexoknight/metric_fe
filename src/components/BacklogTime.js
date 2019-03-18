import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Highcharts from 'highcharts'
import {
  withHighcharts, Title, Tooltip, HighchartsChart, Chart, XAxis, YAxis, SplineSeries
} from 'react-jsx-highcharts'
import styles from 'constants/styles/CardStyles'
import DataTable from './DataTable'

class BacklogTime extends PureComponent {
  styles = styles(this.props.theme)
  state = {
    expanded: false,
    rows: null
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  refreshTableData = (index) => {
    const { table } = this.props
    this.setState({
      rows: table[index]
    })
  }

  render = () => {
    const { classes, name, backlogCategories, percentilBacklogTime } = this.props
    const { rows } = this.state

    return (
      <Fragment>
        <Card className={classes.card}>
          <CardContent>
            <Grid container spacing={24}>
              <Grid xs={10}>
                <div className={classes.wrapper}>
                  <HighchartsChart>
                    <Title style={{ fontFamily: 'Product Sans' }}>{name}</Title>
                    <Chart height={700} />
                    <Tooltip />
                    <XAxis categories={backlogCategories} />
                    <YAxis>
                      <SplineSeries
                        name={name}
                        data={percentilBacklogTime}
                        onClick={(event) => this.refreshTableData(event.point.x)}
                      />
                    </YAxis>
                  </HighchartsChart>
                </div>
              </Grid>
              {
                rows
                  ? <Grid xs={2}>
                    <DataTable rows={rows} isLead={false} isBacklog />
                  </Grid>
                  : <Grid xs={2}>
                    <div className={classes.emptyWrapper}>Нажмите на точку графика, чтобы увидеть перечень рабочих элементов</div>
                  </Grid>
              }
            </Grid>
          </CardContent>
        </Card>
      </Fragment>
    )
  }
}

BacklogTime.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  table: PropTypes.array.isRequired,
  backlogCategories: PropTypes.array.isRequired,
  percentilBacklogTime: PropTypes.array.isRequired
}

export default withStyles(styles, { withTheme: true })(withHighcharts(BacklogTime, Highcharts))
