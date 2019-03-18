import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
// import Card from '@material-ui/core/Card'
// import CardActionArea from '@material-ui/core/CardActionArea'
// import CardContent from '@material-ui/core/CardContent'
// import Typography from '@material-ui/core/Typography'
// import GridList from '@material-ui/core/GridList'
// import GridListTile from '@material-ui/core/GridListTile'
import styles from 'constants/styles/StartStyles'

// const tileData = [
//   {
//     key: 0,
//     title: 'CRM',
//     subTitle: 'Требования без интеграции команд B и C',
//     cols: 2
//   },
//   {
//     key: 1,
//     title: 'CRM',
//     subTitle: 'Требования с интеграцией только Биллинг ВСЕ Команды',
//     cols: 2
//   }
// ]

class Start extends PureComponent {
  styles = styles(this.props.theme)
  render = () => {
    const { classes } = this.props
    return (
      <div className={classes.wrapper} >
        Выберите тип графика в меню справа
        {/* <Typography className={classes.headers}>
          Недавние
        </Typography>
        <GridList cellHeight={160} className={classes.gridList} cols={12}>
          {tileData.map(tile => (
            <GridListTile key={tile.key} cols={tile.cols}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {tile.title}
                    </Typography>
                    <Typography component='p'>
                      {tile.subTitle}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </GridListTile>
          ))}
        </GridList>
        <Typography className={classes.headers}>
          Сохраненные выборки
        </Typography>
        <Typography className={classes.headers}>
          Новая выборка
        </Typography> */}
      </div>
    )
  }
}

Start.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(Start)
