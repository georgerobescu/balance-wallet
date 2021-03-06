import withViewLayoutProps from '@hocs/with-view-layout-props';
import PropTypes from 'prop-types';
import React from 'react';
import RadialGradient from 'react-native-radial-gradient';
import styled, { css } from 'styled-components/primitives';
import { componentFromProp } from 'recompact';
import { colors, padding, position, shadow } from '../../styles';
import ButtonPressAnimation from '../animations';
import { Centered } from '../layout';
import { Text } from '../text';
import { Icon } from '../icons';

const BlockButtonBorderRadius = 14;
const BlockButtonHeight = 59;

const containerStyles = css`
  border-radius: ${BlockButtonBorderRadius};
  flex-grow: 0;
  height: ${BlockButtonHeight};
`;

const ContainerElement = componentFromProp('component');

const Container = styled(ContainerElement)`
  border-radius: ${BlockButtonBorderRadius};
`;

const Content = styled(Centered)`
  ${containerStyles}
  ${padding(15, 15)}
  overflow: hidden;
`;

const GradientBackground = styled(RadialGradient)`
  ${position.cover}
`;

const InnerBorder = styled.View`
  ${position.cover}
  border-color: ${colors.alpha(colors.black, 0.06)}
  border-radius: ${BlockButtonBorderRadius};
  border-width: 0.5;
`;

const Label = styled(Text).attrs({
  color: 'white',
  size: 'large',
  weight: 'medium',
})`
  margin-bottom: 2;
`;

const Shadow = styled.View`
  ${containerStyles}
  ${shadow.build(0, 6, 10, colors.alpha(colors.purple, 0.14))}
  ${shadow.build(0, 1, 18, colors.alpha(colors.purple, 0.12))}
  ${shadow.build(0, 3, 5, colors.alpha(colors.purple, 0.2))}
`;

const LeftIcon = styled(Icon).attrs({ color: colors.white, size: 32 })`
  ${position.size(BlockButtonHeight)}
  position: absolute;
  left: 15px;
`;

const RightIcon = styled(Icon).attrs({ color: colors.white, size: 32 })`
  ${position.size(BlockButtonHeight)}
  position: absolute;
  right: 15px;
`;

const BlockButton = ({
  children,
  disabled,
  height,
  onLayout,
  width,
  leftIconName,
  leftIconProps,
  rightIconName,
  rightIconProps,
  ...props
}) => (
  <Container {...props} disabled={disabled}>
    <Shadow>
      <Content onLayout={onLayout}>
        <GradientBackground
          center={[0, (height / 2)]}
          colors={[disabled ? colors.grey : colors.primaryBlue, disabled ? colors.grey : '#006FFF']}
          radius={width}
        />
        <InnerBorder />
        {leftIconName ? <LeftIcon name={leftIconName} {...leftIconProps} /> : null}
        <Label>
          {children}
        </Label>
        {rightIconName ? <RightIcon name={rightIconName} {...rightIconProps} /> : null}
      </Content>
    </Shadow>
  </Container>
);

BlockButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.disabled,
  height: PropTypes.number,
  leftIconName: PropTypes.string,
  leftIconProps: PropTypes.object,
  onLayout: PropTypes.func,
  rightIconName: PropTypes.string,
  rightIconProps: PropTypes.object,
  width: PropTypes.number,
};

BlockButton.defaultProps = {
  component: ButtonPressAnimation,
  disabled: false,
  leftIconProps: {},
  rightIconProps: {},
};

export default withViewLayoutProps(({ width, height }) => ({ width, height }))(BlockButton);
