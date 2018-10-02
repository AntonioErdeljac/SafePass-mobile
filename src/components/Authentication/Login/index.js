import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { StatusBar, View, Text, Image, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Keyboard, AsyncStorage, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

import selectors from './selectors';
import validations from './validations';

import styles from '../common/styles';

import { Input, Form } from '../../common/components';

import actions from '../../../actions';
import images from '../../../static/images';
import { paths, forms } from '../../../common/constants';

class Login extends Form {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      showLogo: true,
      validating: {},
      errors: {},
    };

    this.chooseContent = React.createRef();

    this.formId = forms.LOGIN;
    this.validations = validations;
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.hideLogo);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.showLogo);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  hideLogo = () => {
    this.setState({
      showLogo: false,
    });
  }

  showLogo = () => {
    this.setState({
      showLogo: true,
    });
  }

  handleLogin = () => {
    this.handleSubmit()
      .then((canSubmit) => {
        const { values, login, navigation, getPlayerByUsername, getAuthUser } = this.props;
        if (canSubmit) {
          login(values)
            .then(({ result }) => {
              AsyncStorage.setItem('token', result.data.key)
                .then(() => {
                  AsyncStorage.getItem('token')
                    .then((token) => {
                      getAuthUser()
                        .then((authUser) => {
                          getPlayerByUsername(authUser.result.data.username)
                            .then((player) => {
                              if (player.result.data[0].nationality) {
                                navigation.navigate(paths.client.WhatsNext);
                              } else {
                                navigation.navigate(paths.client.WhatsNext);
                              }
                            });
                        });
                    });
                });
            });
        }
        return canSubmit;
      });
  }

  handleForm = (form) => {
    const { isLoggingIn, isRegistering } = this.state;

    if (!isLoggingIn && !isRegistering) {
      this.chooseContent.fadeOutDown()
        .then(() => {
          this.setState({
            isLoggingIn: form === 'register' ? false : true,
            isRegistering: form === 'register' ? true : false
          })
        })
    }

    if (isLoggingIn) {
      this.loginForm.fadeOutDown()
        .then(() => {
          this.setState({
            isLoggingIn: false,
            isRegistering: true
          }, () => this.registerForm.fadeInUp())
        })
    }

    if (isRegistering) {
      this.registerForm.fadeOutDown()
        .then(() => {
          this.setState({
            isLoggingIn: true,
            isRegistering: false
          }, () => this.loginForm.fadeInUp())
        })
    }
  }

  render() {
    const { navigation, values, isSubmitting } = this.props;
    const { isLoggingIn, isRegistering } = this.state;

    const formContent = isRegistering
      ? (
        <Animatable.View ref={(ref) => {
            if(ref) {
              this.registerForm = ref;
            }
          }}
          animation="fadeInUp" style={{ flex: 2, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', width: '100%', padding: 15 }}>
          <View style={{width: Dimensions.get('window').width - 50}}>
            <Input
              itemStyle={styles.itemEmail}
              {...this.getFieldProps('email')}
              label="Email"
              type="email"
              labelStyle={styles.inputLabel}
              style={styles.input}
            />
            <Input
              itemStyle={styles.itemEmail}
              {...this.getFieldProps('password')}
              label="Password"
              labelStyle={styles.inputLabel}
              style={styles.input}
              type="password"
            />
            <Input
              itemStyle={styles.itemEmail}
              {...this.getFieldProps('passwordConfirmation')}
              label="Confirm password"
              type="password"
              labelStyle={styles.inputLabel}
              style={styles.input}
            />
            </View>
            <View style={{width: Dimensions.get('window').width - 50}}>
              <TouchableOpacity onPress={() => this.setState({ isLoggingIn: true, isRegistering: false })} style={{ backgroundColor: '#2d89e5', marginTop: 30, padding: 15, width: '100%', alignSelf: 'center', borderRadius: 5, elevation: 1 }}>
                <Text style={{ fontFamily: 'Poppins-Medium', color: '#fff', fontSize: 17, textAlign: 'center' }}>Sign Up</Text>
              </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleForm('login')}>
              <Text style={{ fontFamily: 'Poppins-Regular', color: 'rgba(0,0,0,.6)', fontSize: 14, textAlign: 'center', paddingTop: 15 }}>I already have an account</Text>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      )
      : (

        <Animatable.View ref={(ref) => {
          if(ref) {
            this.loginForm = ref;
          }
        }} animation="fadeInUp" style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', width: '100%', padding: 15 }}>
          <View style={{width: Dimensions.get('window').width - 50}}>
            <Input
              itemStyle={styles.itemEmail}
              {...this.getFieldProps('email')}
              label="Email"
              type="email"
              labelStyle={styles.inputLabel}
              style={styles.input}
            />
            <Input
              itemStyle={styles.itemEmail}
              {...this.getFieldProps('password')}
              label="Password"
              labelStyle={styles.inputLabel}
              style={styles.input}
              type="password"
            />
            </View>
            <View style={{width: Dimensions.get('window').width - 50}}>
              <TouchableOpacity onPress={() => this.setState({ isLoggingIn: true, isRegistering: false })} style={{ backgroundColor: '#2d89e5', marginTop: 30, padding: 15, width: '100%', alignSelf: 'center', borderRadius: 5, elevation: 1 }}>
                <Text style={{ fontFamily: 'Poppins-Medium', color: '#fff', fontSize: 17, textAlign: 'center' }}>Sign In</Text>
              </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleForm('register')}>
              <Text style={{ fontFamily: 'Poppins-Regular', color: 'rgba(0,0,0,.6)', fontSize: 14, textAlign: 'center', paddingTop: 15 }}>I don't have an account</Text>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      );

    return (
      <ImageBackground
          style={styles.imageBackground}
          imageStyle={styles.bgImage}
          source={images.bg}
        >
        <View style={styles.container}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'Poppins-Bold', color: 'white', fontSize: 40, textAlign: 'center' }}>SafePass</Text>
            <Text style={{ fontFamily: 'Poppins-Regular', color: 'white', fontSize: 17, textAlign: 'center', paddingTop: 15 }}>All your passwords in one place.</Text>
          </View>
          {isLoggingIn || isRegistering
            ? formContent
            : (
              <Animatable.View ref={(ref) => {
                if(ref) {
                  this.chooseContent = ref;
                }}}
                 style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.handleForm('login')} style={{ backgroundColor: '#fff', padding: 15, width: Dimensions.get('window').width - 100, borderRadius: 5, elevation: 1 }}>
                  <Text style={{ fontFamily: 'Poppins-Medium', color: '#2d89e5', fontSize: 17, textAlign: 'center' }}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleForm('register')} style={{ marginTop: 30, backgroundColor: 'transparent', padding: 15, width: Dimensions.get('window').width - 100, borderRadius: 10 }}>
                  <Text style={{ fontFamily: 'Poppins-Medium', color: '#fff', fontSize: 17, textAlign: 'center' }}>Sign Up</Text>
                </TouchableOpacity>
              </Animatable.View>
              )
            }
          </View>
      </ImageBackground>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default connect(
  selectors,
  {
    ...actions.forms,
    ...actions.authentication,
    ...actions.player,
    ...actions.user,
  },
)(Login);
