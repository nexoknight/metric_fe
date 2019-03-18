import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// #region import Material
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import CircularProgress from '@material-ui/core/CircularProgress'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import LinearProgress from '@material-ui/core/LinearProgress'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/Delete'
// #endregion import Material
import styles from 'constants/styles/LayoutStyles'
import SaveDialog from 'components/SaveDialog'

class Layout extends PureComponent {
  state = {
    open: false,
    groups: null,
    isDialogOpen: false
  }

  styles = styles(this.props.theme)

  static getDerivedStateFromProps = (props, state) => {
    const { groups, isGroupsLoading, isGroupsError } = props
    if (groups && !isGroupsLoading && !isGroupsError) {
      return ({ groups })
    }
    return null
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  onActiveGroupChange = (item) => {
    const { changeActiveGroup } = this.props
    if (item) {
      changeActiveGroup({ groupId: item.Id, groupName: item.Name })
    } else {
      changeActiveGroup({ groupId: null, groupName: null })
    }
  }

  onActiveMetricChange = (item) => {
    const { changeActiveMetric } = this.props
    if (item) {
      changeActiveMetric({ metricId: item.Id, metricName: item.Name })
    } else {
      changeActiveMetric({ metricId: null, metricName: null })
    }
  }

  onModal = () => {
    const { isDialogOpen } = this.state
    this.setState({
      isDialogOpen: !isDialogOpen
    })
  }

  onAdd = (name, request) => {
    const { isDialogOpen } = this.state
    const { addMetrics } = this.props
    addMetrics({ Name: name, Query: request.replace(/\\/g, '\\\\') })
    this.setState({ isDialogOpen: !isDialogOpen })
  }

  onDeleteMetric = (item) => {
    const { deleteMetrics } = this.props
    deleteMetrics({ id: item.Id })
  }

  render = () => {
    const { classes, theme, children, isLoading, activeGroupId, isMetricsLoading, activeMetricName, metrics } = this.props
    const { open, groups, isDialogOpen } = this.state

    return (
      <div className={classes.root}>
        <CssBaseline />
        <SaveDialog
          isDialogOpen={isDialogOpen}
          onOpen={this.onModal}
          onClose={this.onModal}
          onAdd={this.onAdd}
        />
        <Fab className={classes.fab} color={'primary'} size={'medium'} onClick={this.onModal}>
          <AddIcon />
        </Fab>
        <AppBar
          position='fixed'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              {!activeMetricName ? 'Метрики' : activeMetricName}
            </Typography>
          </Toolbar>
          { isLoading && <LinearProgress color={'secondary'} /> }
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <List>
            {
              !activeGroupId && groups && groups.map((item) => (
                <ListItem button onClick={() => this.onActiveGroupChange(item)}>
                  <ListItemText primary={item.Name} />
                </ListItem>
              ))
            }
            {
              activeGroupId &&
              <Fragment>
                <ListItem button onClick={() => this.onActiveGroupChange()}>
                  <ListItemIcon>
                    <ArrowBackIcon />
                  </ListItemIcon>
                </ListItem>
                {
                  isMetricsLoading &&
                    <CircularProgress className={classes.progress} />
                }
                {
                  metrics && metrics[activeGroupId] && metrics[activeGroupId].map((item) => (
                    <div className={classes.metricItem}>
                      <ListItem button onClick={() => this.onActiveMetricChange(item)}>
                        <ListItemText primary={item.Name} />
                      </ListItem>
                      <IconButton className={classes.actionButton} aria-label='Delete' onClick={() => this.onDeleteMetric(item)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))
                }
              </Fragment>
            }
          </List>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          {children}
        </main>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Layout)

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  changeActiveGroup: PropTypes.func.isRequired,
  changeActiveMetric: PropTypes.func.isRequired,
  deleteMetrics: PropTypes.func.isRequired,
  addMetrics: PropTypes.func.isRequired,
  isMetricsLoading: PropTypes.bool.isRequired,
  groups: PropTypes.array,
  isGroupsLoading: PropTypes.bool.isRequired,
  isGroupsError: PropTypes.bool.isRequired,
  metrics: PropTypes.object,
  activeMetricName: PropTypes.string,
  activeGroupId: PropTypes.string
}
