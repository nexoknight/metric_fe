const styles = theme => ({
  headers: {
    textTransform: 'uppercase'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '100%',
    height: 200
  },
  card: {
    maxWidth: '100%',
    marginTop: theme.spacing.unit,
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.12)'
  },
  wrapper: {
    height: '90vh'
  }
})

export default styles
