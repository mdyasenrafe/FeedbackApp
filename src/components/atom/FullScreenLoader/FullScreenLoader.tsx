import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

type Props = {
  visible?: boolean;
  message?: string;
};

export const FullScreenLoader: React.FC<Props> = ({
  visible = true,
  message,
}) => {
  if (!visible) return null;
  return (
    <View style={styles.backdrop} pointerEvents="none">
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  center: {alignItems: 'center'},
  msg: {marginTop: 12, fontSize: 14},
});
