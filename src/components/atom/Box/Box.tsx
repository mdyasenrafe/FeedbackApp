import React from 'react';
import {createBox} from '@shopify/restyle';
import type {BoxProps as RestyleBoxProps} from '@shopify/restyle';
import {StyleProp, ViewStyle} from 'react-native';
import {Theme} from '../../../theme';

export type BoxProps = RestyleBoxProps<Theme> & {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Box = createBox<Theme>();
