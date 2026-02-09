import React from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type KeyboardAwareViewProps = {
  children: React.ReactNode;
};

export const KeyboardAwareView: React.FC<KeyboardAwareViewProps> = ({
  children,
}) => {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      scrollEnabled={false} // ✅ FlatList handles scrolling, not the wrapper
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={Platform.OS === 'android' ? 100 : 80}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};
