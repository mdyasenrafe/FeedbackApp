import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Platform,
  StatusBarStyle,
  ViewStyle,
} from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
type ScreenProps = {
  children: React.ReactNode;
  name: string;
  expandToTopEdge?: boolean;
  expandToBottomEdge?: boolean;
  statusBarStyle?: StatusBarStyle;
  style?: ViewStyle;
};
export const Screen: React.FC<ScreenProps> = ({
  children,
  expandToTopEdge,
  expandToBottomEdge,
  statusBarStyle = 'default',
  style,
}) => {
  let edges: Edge[] = ['right', 'left'];
  if (!expandToTopEdge) {
    edges.push('top');
  }
  if (expandToBottomEdge === false) {
    edges.push('bottom');
  }
  // Set the status bar appearance when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle(statusBarStyle);
      if (expandToTopEdge && Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
      }
    }, [expandToTopEdge, statusBarStyle]),
  );
  return (
    <SafeAreaView style={[styles.container, style]} edges={edges}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
