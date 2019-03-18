import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class SaveDialog extends PureComponent {
  state = {
    name: '',
    request: ''
  };

  onNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  onQueryChange = (event) => {
    this.setState({
      request: event.target.value
    })
  }

  render () {
    const { isDialogOpen, onClose, onAdd } = this.props
    const { name, request } = this.state
    return (
      <div>
        <Dialog
          open={isDialogOpen}
          onClose={onClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Добавить метрику</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Введите имя и запрос для метрики, добавленные метрики будут сохранены в группу "Saved"
            </DialogContentText>
            <TextField
              value={name}
              onChange={this.onNameChange}
              autoFocus
              margin='dense'
              id='name'
              label='Название'
              fullWidth
            />
            <TextField
              value={request}
              onChange={this.onQueryChange}
              margin='dense'
              id='query'
              label='Запрос'
              fullWidth
              multiline
              rows='4'
              rowsMax='6'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color='primary'>
              Отменить
            </Button>
            <Button onClick={() => onAdd(name, request)} color='primary'>
              Добавить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

SaveDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onAdd: PropTypes.func
}

export default SaveDialog
