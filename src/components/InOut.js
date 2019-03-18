import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Highcharts from 'highcharts'
import {
  withHighcharts, Tooltip, HighchartsChart, Chart, XAxis, YAxis, Title, Legend, ColumnSeries
} from 'react-jsx-highcharts'
import styles from 'constants/styles/CardStyles'
import DataTable from './DataTable'

class InOut extends PureComponent {
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
    const { classes, name, categories, activatedCount, closedCount, createdCount } = this.props
    const { rows } = this.state

    return (
      <Fragment>
        <Card className={classes.card}>
          <CardContent>
            <Grid container spacing={24}>
              <Grid xs={10}>
                <div className={classes.wrapper}>
                  <HighchartsChart>
                    <Chart height={700} />
                    <Tooltip />
                    <Title style={{ fontFamily: 'Product Sans' }}>{name}</Title>
                    <Legend />
                    <XAxis categories={categories} />
                    <YAxis>
                      <ColumnSeries onClick={(event) => this.refreshTableData(event.point.x)} color='#8187ff' name='Взятых в работу' data={activatedCount} />
                      <ColumnSeries onClick={(event) => this.refreshTableData(event.point.x)} color='#ffab40' name='Закрытых' data={closedCount} />
                      <ColumnSeries onClick={(event) => this.refreshTableData(event.point.x)} color='#9e9e9e' name='Заведенных' data={createdCount} />
                    </YAxis>
                  </HighchartsChart>
                </div>
              </Grid>
              {
                rows
                  ? <Grid xs={2}>
                    <DataTable rows={rows} />
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

InOut.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  activatedCount: PropTypes.array.isRequired,
  closedCount: PropTypes.array.isRequired,
  createdCount: PropTypes.array.isRequired,
  table: PropTypes.array.isRequired
}

export default withStyles(styles, { withTheme: true })(withHighcharts(InOut, Highcharts))
