import RBSheet from 'react-native-raw-bottom-sheet';
import React from 'react';
import { Box } from '../Box';
import { palette } from '../../../theme/elements';
import { ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type RBSheetRef = React.ElementRef<typeof RBSheet>;

type BottomSheetProps = {
  refRBSheet: React.RefObject<RBSheetRef | null>;
  children: React.ReactNode;
  height?: number;
  containerStyle?: ViewStyle;
};

export const BottomSheet: React.FC<BottomSheetProps> = ({
  refRBSheet,
  children,
  height,
  containerStyle,
}) => {
  const { top } = useSafeAreaInsets();

  return (
    <Box>
      <RBSheet
        height={height ?? 500}
        ref={refRBSheet}
        closeOnPressMask={false}
        closeOnPressBack={false}
        customStyles={{
          wrapper: {
            backgroundColor: palette.semiTransparentBlack,
            paddingTop: top,
          },
          draggableIcon: {
            display: 'none',
          },
          container: {
            backgroundColor: palette.white,
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            ...(containerStyle || {}),
          },
        }}
      >
        {children}
      </RBSheet>
    </Box>
  );
};
