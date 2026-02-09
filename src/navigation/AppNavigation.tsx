import React from 'react';
import { Audience, getScreenDimensions, MedicineBootstrap } from '../utils';
import { useOnboarding } from '../context/OnboardingContext';
import { useAppSelector } from '../redux';
import { MainNavigation } from './MainNavigation';
import { OnboardingNavigation } from './OnboardingNavigation';

import { getLoadingImageByAudience } from '../utils/loadingAssets';
import { FullScreenLoadingImage } from '../components/atom';

export function AppNavigation() {
  const { screenHeight, screenWidth } = getScreenDimensions();
  const { isHydrated, shouldShowOnboarding, audience } = useOnboarding();

  const hasMedicines = useAppSelector(
    s => (s.medicine?.items?.length ?? 0) > 0,
  );

  const loadingSource = getLoadingImageByAudience(audience as Audience);

  if (!isHydrated) {
    return (
      <FullScreenLoadingImage
        source={loadingSource}
        width={screenWidth}
        height={screenHeight}
      />
    );
  }

  if (shouldShowOnboarding) {
    return <OnboardingNavigation />;
  }

  if (!hasMedicines) {
    return (
      <>
        <MedicineBootstrap />
        <FullScreenLoadingImage
          source={loadingSource}
          width={screenWidth}
          height={screenHeight}
        />
      </>
    );
  }

  return (
    <>
      <MedicineBootstrap />
      <MainNavigation />
    </>
  );
}
