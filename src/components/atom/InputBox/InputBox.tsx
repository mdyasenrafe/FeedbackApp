import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import {
  useRestyle,
  composeRestyleFunctions,
  layout,
  spacing,
  border,
  backgroundColor,
} from '@shopify/restyle';
import { Theme } from '../../../theme';
import { palette } from '../../../theme/elements';
import { Box } from '../Box';
import { Text } from '../Text';
import { RestyleInputProps, TextInputProps } from './types';
import { Row } from '../Row';
import { FONTS } from '../../../theme/fonts';

export const InputBox: React.FC<TextInputProps> = React.memo(
  ({
    onChangeText,
    value,
    placeholder = '',
    isSecureTextEntry = false,
    placeholderTextColor,
    inputStyle,
    inputType,
    capitalizationMode = 'none',
    isEditable,
    textMaxLength,
    hasShowPasswordOption,
    showPasswordToggleComponent,
    keyboardReturnKeyType,
    returnKeyLabelText,
    onReturnKeySubmit,
    textInputRef,
    shouldAutoFocus,
    leadingIcon,
    leadingIconComponent,
    onBlur,
    label,
    error,
    labelColor = 'black',
    multiline,
    onFocus,
    ...rest
  }) => {
    const restyleFunctions = composeRestyleFunctions<Theme, RestyleInputProps>([
      spacing,
      border,
      backgroundColor,
      layout,
    ]);
    const props = useRestyle(restyleFunctions, rest);

    return (
      <Box>
        {label && (
          <Row
            mt="xl"
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
          >
            <Text variant="p3" color={labelColor}>
              {label}
            </Text>
            {error && (
              <Text variant="p4" color="red">
                {error}
              </Text>
            )}
          </Row>
        )}
        <View
          {...props}
          style={[
            styles.container,
            { flexDirection: 'row' },
            props.style,
            error ? { borderColor: 'red' } : {},
          ]}
        >
          {leadingIconComponent}
          <TextInput
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            secureTextEntry={isSecureTextEntry}
            placeholderTextColor={placeholderTextColor}
            style={[styles.input, inputStyle]}
            autoCapitalize={capitalizationMode}
            keyboardType={inputType}
            editable={isEditable}
            maxLength={textMaxLength}
            onSubmitEditing={onReturnKeySubmit}
            returnKeyLabel={returnKeyLabelText}
            returnKeyType={keyboardReturnKeyType}
            ref={textInputRef || null}
            autoFocus={shouldAutoFocus}
            multiline={multiline}
            textBreakStrategy="simple"
            autoComplete="off"
            importantForAutofill="no"
            onFocus={onFocus}
            autoCorrect={false}
            spellCheck={false}
            underlineColorAndroid="transparent"
          />

          {hasShowPasswordOption && showPasswordToggleComponent}
        </View>
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 46,
    borderWidth: 1,
    borderColor: palette.red,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 0,
  },
  input: {
    fontSize: 14,
    color: palette.black,
    flex: 1,
    fontFamily: FONTS.regular,
    paddingTop: 0,
    paddingBottom: 0,
    textAlignVertical: 'center',
    paddingHorizontal: 16,
    textDecorationLine: 'none',
  },
});
