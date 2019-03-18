import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Skeleton from 'react-loading-skeleton'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import styles from 'constants/styles/CardStyles'

const LoadingSkeleton = ({ classes }) => (
  <Fragment>
    <Card className={classes.card}>
      <CardContent className={classes.skeleton}>
        <Grid container spacing={24}>
          <Grid xs={10}>
            <div className={classes.leftSkeleton}>
              <Skeleton animated={false} count={10} />
            </div>
          </Grid>
          <Grid xs={2}>
            <div className={classes.rightSkeleton}>
              <Skeleton animated={false} count={4} />
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    <Card className={classes.card}>
      <CardContent className={classes.skeleton}>
        <Grid container spacing={24}>
          <Grid xs={10}>
            <div className={classes.leftSkeleton}>
              <Skeleton animated={false} count={10} />
            </div>
          </Grid>
          <Grid xs={2}>
            <div className={classes.rightSkeleton}>
              <Skeleton animated={false} count={4} />
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    <Card className={classes.card}>
      <CardContent className={classes.skeleton}>
        <Grid container spacing={24}>
          <Grid xs={10}>
            <div className={classes.leftSkeleton}>
              <Skeleton animated={false} count={10} />
            </div>
          </Grid>
          <Grid xs={2}>
            <div className={classes.rightSkeleton}>
              <Skeleton animated={false} count={4} />
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Fragment>
)

LoadingSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(LoadingSkeleton)
