import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, View, StatusBar } from 'react-native';

import actions from '../../../actions';
import { paths } from '../../../common/constants';

class Selection extends React.Component {
  componentWillMount() {
    StatusBar.setHidden(true);
  }

  componentDidMount() {
    const { navigation, getAuthUser, getAuthPlayer } = this.props;

    AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          getAuthUser()
            .then(({ result }) => {
              getAuthPlayer(result.data.username)
                .then(() => {
                  navigation.navigate('Auth');
                });
            })
            .catch(() => {
              // AsyncStorage.clear()
              // .then(() => {
              navigation.navigate('App');
              // });
            });
        } else {
          navigation.navigate('App');
        }
      });
  }

  render() {
    return (
      <React.Fragment>
        <View />
      </React.Fragment>
    );
  }
}

Selection.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  getAuthUser: PropTypes.func.isRequired,
};

export default connect(
  null,
  {
    ...actions.user,
    ...actions.player,
  },
)(Selection);
