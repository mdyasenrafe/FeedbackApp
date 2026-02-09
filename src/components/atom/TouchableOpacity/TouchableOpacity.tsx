import {createBox} from '@shopify/restyle';
import {TouchableOpacity as RNTouchableOpacity} from 'react-native';
import type {TouchableOpacityProps as RNTouchableOpacityProps} from 'react-native';
import {Theme} from '../../../theme';

export const TouchableOpacity = createBox<Theme, RNTouchableOpacityProps>(
  RNTouchableOpacity,
);

export type TouchableOpacityProps = React.ComponentProps<
  typeof TouchableOpacity
>;
