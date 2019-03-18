import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import XLSX from 'xlsx'

const styles = theme => ({
  root: {
    fontFamily: 'Open Sans',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  grid: {
    marginBottom: 5,
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: 6
  },
  gridContent: {
    padding: '10px !important'
  },
  gridList: {
    padding: '10px 3px 3px 0',
    width: '100%',
    height: 700
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  id: {
    textTransform: 'uppercase',
    color: '#878787',
    fontSize: 10
  },
  title: {
    fontFamily: 'Product Sans',
    fontSize: 14,
    cursor: 'pointer'
  },
  name: {
    fontSize: 12
  },
  subTitle: {
    fontSize: 10,
    color: '#878787'
  },
  time: {
    fontSize: 24,
    fontWeight: 500
  },
  redTime: {
    fontSize: 24,
    fontWeight: 500,
    borderRadius: 6,
    color: '#E53935',
    backgroundColor: ''
  },
  button: {
    width: '100%',
    marginBottom: 5
  }
})

const COLS_WIDTH = [
  { wpx: 50 },
  { wpx: 50 },
  { wpx: 50 },
  { wpx: 500 },
  { wpx: 50 },
  { wpx: 50 },
  { wpx: 100 },
  { wpx: 100 },
  { wpx: 100 },
  { wpx: 100 },
  { wpx: 200 },
  { wpx: 150 },
  { wpx: 150 },
  { wpx: 150 },
  { wpx: 150 }
]

class DataTable extends PureComponent {
  handleExportClick = () => {
    const { rows } = this.props
    const filename = `stat.xlsx`
    const wsName = `stat`
    const data = [ ...rows ]
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(data, { skipHeader: false })
    ws['!cols'] = COLS_WIDTH

    XLSX.utils.book_append_sheet(wb, ws, wsName)
    XLSX.writeFile(wb, filename)
  }

  onClick = (id) => {
    const win = window.open(`https://tfs.tele2.ru/tfs/Main/Tele2/_workitems?id=${id}&_a=edit`, '_blank')
    win.focus()
  }

  render = () => {
    const { rows, classes, isLead, isBacklog } = this.props
    return (
      <div className={classes.root}>
        <Button onClick={() => { this.handleExportClick() }} variant='outlined' color='secondary' className={classes.button}>
          Экспортировать в Excel
        </Button>
        <GridList cellHeight={'100%'} cols={1} className={classes.gridList}>
          {rows.map(tile => (
            <GridListTile className={classes.grid} key={tile.id}>
              <div className={classes.gridContent}>
                <div className={classes.id}>{`${tile.workItemType} ${tile.id}`}</div>
                <div className={classes.title} onClick={() => { this.onClick(tile.id) }}>{tile.title}</div>
                <Grid container spacing={8}>
                  <Grid item xs={6}>
                    <div className={(isLead && (tile.leadTime >= tile.percentilLeadTime)) ? classes.redTime : classes.time}>{tile.leadTime}</div>
                    <div className={classes.subTitle}>Lead time</div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className={(isBacklog && (tile.backlogTime >= tile.percentilBacklogTime)) ? classes.redTime : classes.time}>{tile.backlogTime}</div>
                    <div className={classes.subTitle}>Backlog time</div>
                  </Grid>
                </Grid>
              </div>
              <Divider />
              <div className={classes.gridContent}>
                <Grid container spacing={8}>
                  <Grid item xs={4}>
                    <div className={classes.subTitle}>Дата активации:</div>
                    <div className={classes.name}>{moment(tile.activatedDate).format('DD.MM.YYYY')}</div>
                  </Grid>
                  <Grid item xs={4}>
                    <div className={classes.subTitle}>Дата создания:</div>
                    <div className={classes.name}>{moment(tile.createdDate).format('DD.MM.YYYY')}</div>
                  </Grid>
                  <Grid item xs={4}>
                    <div className={classes.subTitle}>Дата закрытия:</div>
                    <div className={classes.name}>{moment(tile.closedDate).format('DD.MM.YYYY')}</div>
                  </Grid>
                  <Grid item xs={4}>
                    <div className={classes.subTitle}>Статус:</div>
                    <div className={classes.name}>{tile.state}</div>
                  </Grid>
                  <Grid item xs={8}>
                    <div className={classes.subTitle}>Область:</div>
                    <div className={classes.name}>{tile.areaPath}</div>
                  </Grid>
                </Grid>
              </div>
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}

export default withStyles(styles)(DataTable)

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
  isLead: PropTypes.bool.isRequired,
  isBacklog: PropTypes.bool.isRequired
}
