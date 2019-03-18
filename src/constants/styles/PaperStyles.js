const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    marginTop: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.12)'
  },
  chartText: {
    fontFamily: 'Product Sans'
  }
})

export default styles
