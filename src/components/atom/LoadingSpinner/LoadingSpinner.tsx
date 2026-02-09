import React from 'react';
import {Box} from '../Box';
import {ActivityIndicator} from 'react-native';
import {getScreenDimensions} from '../../../utils/screenDimensions';
import {palette} from '../../../theme/elements';
import {Text} from '../Text';

type LoadingSpinnerProps = {
  height?: number;
  width?: number;
  size?: 'large' | 'small';
  color?: string;
  scale?: number;
  showText?: boolean;
};

const {screenHeight, screenWidth} = getScreenDimensions();

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  height = screenHeight,
  width = screenWidth,
  size = 'small',
  color = palette.primary,
  scale = 1,
  showText = false,
}) => {
  return (
    <Box
      width={width}
      height={height}
      justifyContent="center"
      alignItems="center">
      <ActivityIndicator
        size={size === 'small' || size === 'large' ? size : 'small'}
        color={color}
      />
      {showText && (
        <Box mt="md">
          <Text color="black" fontSize={14}>
            טוען...
          </Text>
        </Box>
      )}
    </Box>
  );
};
