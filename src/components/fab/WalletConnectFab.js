import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { withNavigation } from 'react-navigation';
import RadialGradient from 'react-native-radial-gradient';
import { compose, onlyUpdateForKeys, withHandlers } from 'recompact';
import styled from 'styled-components/primitives';
import { colors, position } from '../../styles';
import Icon from '../icons/Icon';
import FloatingActionButton from './FloatingActionButton';

const GradientBackground = styled(RadialGradient)`
  ${position.cover}
`;

const WalletConnectFab = ({ disabled, onPress, ...props }) => (
  <FloatingActionButton {...props} disabled={disabled} onPress={onPress}>
    {({ size }) => (
      <Fragment>
        {!disabled && (
          <GradientBackground
            center={[0, (size / 2)]}
            colors={[colors.primaryBlue, '#006FFF']}
            radius={size}
          />
        )}
        <Icon
          color={colors.white}
          name="camera"
          style={{ marginBottom: 2 }}
        />
      </Fragment>
    )}
  </FloatingActionButton>
);

WalletConnectFab.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default compose(
  withNavigation,
  withHandlers({ onPress: ({ navigation }) => () => navigation.navigate('QRScannerScreen') }),
  onlyUpdateForKeys(['disabled']),
)(WalletConnectFab);
