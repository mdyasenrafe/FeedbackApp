import React from 'react';
import {createBox} from '@shopify/restyle';
import {Theme} from '../../../theme';
import {BoxProps} from '../Box';

const BaseBox = createBox<Theme>();

export const Row: React.FC<BoxProps> = ({children, flexDirection, ...rest}) => {
  return (
    <BaseBox flexDirection={'row'} {...rest}>
      {children}
    </BaseBox>
  );
};
