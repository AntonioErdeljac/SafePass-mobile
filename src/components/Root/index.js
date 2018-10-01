import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import Toast from 'react-native-easy-toast';

import selectors from './selectors';

import actions from '../../actions';

class Root extends React.Component {
  constructor() {
    super();

    this.toastRef = React.createRef();
  }

  componentWillReceiveProps(newProps) {
    const { showToast, clearToastsData } = this.props;

    if (newProps.showToast && !showToast) {
      this.toastRef.show('Something went wrong!', 500, () => {
        clearToastsData();
      });
    }
  }

  render() {
    const { children } = this.props;

    return (
      <Container>
        <Toast
          ref={(ref) => { this.toastRef = ref; }}
          style={{ backgroundColor: '#ff2f3e', width: '90%', padding: 15 }}
        />
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
