import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {
  useRestyle,
  backgroundColor,
  border,
  spacing,
  composeRestyleFunctions,
  BackgroundColorProps,
  BorderProps,
  SpacingProps,
  LayoutProps,
  layout,
} from '@shopify/restyle';
import {Theme} from '../../../theme';
import {Text, TextProps} from '../Text';
import {palette} from '../../../theme/elements';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  LayoutProps<Theme> & {
    style?: ViewStyle | ViewStyle[];
  };

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  backgroundColor,
  layout,
]);

interface ButtonProps extends RestyleProps {
  label: string;
  variant?: TextProps['variant'];
  isLoading?: boolean;
  isDisabled?: boolean;
  loadingColor?: 'primary' | 'white';
  icon?: boolean;
  iconComponent?: React.ReactNode;

  // Touchable callbacks
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;

  // 🔹 Haptics
  enableHaptics?: boolean;
}

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const Button: React.FC<ButtonProps> = ({
  onPress,
  onPressIn,
  onPressOut,
  label,
  variant = 'buttonLabel',
  isLoading,
  isDisabled,
  loadingColor,
  icon,
  iconComponent,
  enableHaptics,
  ...rest
}) => {
  const props = useRestyle(restyleFunctions, rest);

  const handlePress = () => {
    if (enableHaptics) {
      // impactMedium feels good for primary actions
      ReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
    }
    onPress?.();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={isDisabled}
      {...props}
      style={[styles.container, props.style, isDisabled && styles.disabled]}>
      {isLoading ? (
        <ActivityIndicator
          color={loadingColor === 'primary' ? palette.primary : 'white'}
        />
      ) : (
        <>
          {icon && iconComponent}
          <Text variant={variant} alignSelf="center">
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  disabled: {
    opacity: 0.5,
  },
});
