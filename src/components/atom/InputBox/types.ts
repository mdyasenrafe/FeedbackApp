import {
  BackgroundColorProps,
  BorderProps,
  SpacingProps,
  LayoutProps,
} from '@shopify/restyle';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Theme} from '../../../theme';
import {palette} from '../../../theme/elements';

export type RestyleInputProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  LayoutProps<Theme> & {
    style?: ViewStyle | ViewStyle[];
  };

export interface TextInputProps extends RestyleInputProps {
  onChangeText?: (text: string) => void;
  value?: string;
  placeholder: string;
  isSecureTextEntry?: boolean;
  placeholderTextColor?: string;
  inputStyle?: TextStyle;
  capitalizationMode?: 'none' | 'sentences' | 'words' | 'characters';
  inputType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
  isEditable?: boolean;
  textMaxLength?: number;
  hasShowPasswordOption?: boolean;
  showPasswordToggleComponent?: React.ReactNode;
  returnKeyLabelText?: string;
  keyboardReturnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  onReturnKeySubmit?: () => void;
  leadingIconComponent?: React.ReactNode;
  textInputRef?: React.RefObject<TextInput>;
  shouldAutoFocus?: boolean;
  label?: string;
  leadingIcon?: boolean;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  error?: string;
  labelColor?: keyof typeof palette;
  multiline?: boolean;
  onFocus?: () => void;
}

// type labelColor = keyof palette
