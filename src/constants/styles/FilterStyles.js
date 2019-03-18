const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  filters: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit
  },
  primaryButton: {
    marginRight: theme.spacing.unit
  },
  paper: {
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.12)'
  }
})

export default styles
