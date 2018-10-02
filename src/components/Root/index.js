import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'native-base';

import selectors from './selectors';

import actions from '../../actions';

class Root extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { children } = this.props;

    return (
      <Container>
        {children}
      </Container>
    );
  }
}

Root.propTypes = {
  children: PropTypes.element.isRequired,
  showToast: PropTypes.bool.isRequired,
  clearToastsData: PropTypes.func.isRequired,
};

export default connect(
  selectors,
  {
    ...actions.toasts,
  },
)(Root);
