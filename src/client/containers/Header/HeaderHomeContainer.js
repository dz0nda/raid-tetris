import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../actions';
import HeaderHome from '../../components/Header/HeaderHome';

function HeaderHomeConnect(props) {
  const { reqLogout } = props;

  return <HeaderHome reqLogout={reqLogout} />;
}

HeaderHomeConnect.propTypes = {
  reqLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  reqLogout: actions.reqLogout,
};

export default connect(null, mapDispatchToProps)(HeaderHomeConnect);
