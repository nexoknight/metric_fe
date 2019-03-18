const styles = theme => ({
  card: {
    maxWidth: '100%',
    marginTop: theme.spacing.unit,
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.12)'
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  skeleton: {
    fontSize: 150,
    lineHeight: 1.1
  },
  leftSkeleton: {
    paddingRight: 10,
    fontSize: 50,
    lineHeight: 1.3
  },
  chartTitle: {
    fontFamily: 'Product Sans'
  },
  wrapper: {
    marginRight: 10
  },
  emptyWrapper: {
    padding: 20,
    fontSize: 14
  }
})

export default styles
