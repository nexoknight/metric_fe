import { createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: blue,
    secondary: blue
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Product Sans'
    ].join(','),
    button: {
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 6
  },
  background: 'white'
})

export default theme
