import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';

const UppercasedText = ({ style, children }) => (
  <Text style={style}>
    {children.length > 0 ? children.toUpperCase() : children}
  </Text>
);

UppercasedText.defaultProps = {
  style: undefined,
};

UppercasedText.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]),
  children: PropTypes.string.isRequired,
};

export default UppercasedText;
