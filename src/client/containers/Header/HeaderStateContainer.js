import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderState from '../../components/Header/HeaderState';

function HeaderStateConnect(props) {
  const { nbPlayers, nbGames } = props;

  return <HeaderState nbPlayers={nbPlayers} nbGames={nbGames} />;
}

HeaderStateConnect.propTypes = {
  nbPlayers: PropTypes.number.isRequired,
  nbGames: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  nbPlayers: state.app.infos.nbPlayers,
  nbGames: state.app.infos.nbGames,
});

export default connect(mapStateToProps)(HeaderStateConnect);
