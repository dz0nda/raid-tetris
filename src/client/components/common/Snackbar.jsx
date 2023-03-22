import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useSnackbar } from 'notistack'

function Snackbar(props) {
  const { message, variant } = props
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    enqueueSnackbar(message, { variant })
  })

  return null
}

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  message: state.app.snackbar.message,
  variant: state.app.snackbar.variant
})

export default connect(mapStateToProps)(Snackbar)
