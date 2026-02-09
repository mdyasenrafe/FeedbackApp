// RemoteImage.tsx
import React, {memo, useMemo, useState, useCallback} from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  NativeSyntheticEvent,
  ImageErrorEventData,
} from 'react-native';

export type RemoteImageProps = Omit<ImageProps, 'source'> & {
  url?: string;
  source?: ImageSourcePropType;
  fallbackSource?: ImageSourcePropType; // optional placeholder
};

const RemoteImageComponent: React.FC<RemoteImageProps> = ({
  url,
  source,
  fallbackSource,
  style,
  onError,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  const imageSource = useMemo<ImageSourcePropType | undefined>(() => {
    if (!hasError) {
      if (source) return source;

      const candidate = url?.trim();
      if (
        candidate &&
        (candidate.startsWith('http://') || candidate.startsWith('https://'))
      ) {
        return {uri: candidate};
      }
    }

    return fallbackSource;
  }, [source, url, fallbackSource, hasError]);

  const handleError = useCallback(
    (e: NativeSyntheticEvent<ImageErrorEventData>) => {
      console.warn('RemoteImage load error:', {
        url,
        message: e.nativeEvent.error,
      });
      setHasError(true);
      onError?.(e);
    },
    [url, onError],
  );

  if (!imageSource) {
    // No valid source at all → render nothing instead of breaking layout
    return null;
  }

  return (
    <Image source={imageSource} {...rest} style={style} onError={handleError} />
  );
};

export const RemoteImage = memo(RemoteImageComponent);
