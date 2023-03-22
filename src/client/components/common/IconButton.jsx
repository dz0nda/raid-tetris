import React from 'react'
import PropTypes from 'prop-types'
import { IconButton as MaterialIconButton }from '@mui/material'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  RedIconButton: {
    color: 'grey',
    '&:hover': {
      color: 'red'
    }
  }
})

function IconButton(props) {
  const { onClick, disabled, children } = props
  const classes = useStyles()

  return (
    <MaterialIconButton
      onClick={onClick}
      disabled={disabled}
      className={classes.RedIconButton}
    >
      {children}
    </MaterialIconButton>
  )
}

IconButton.defaultProps = {
  disabled: false
}

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default IconButton
