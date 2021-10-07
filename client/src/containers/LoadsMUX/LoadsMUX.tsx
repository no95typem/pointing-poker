import React from 'react';
import { KnownLoadKey } from '../../../../shared/knownLoadsKeys';
import { KNOWN_LOADS } from '../../knownLoads';

import { useTypedSelector } from '../../redux/store';
import { GenericLoadPage } from './LoadsPages/GenericLoadPage/GenericLoadPage';

export const LoadsMUX = (): JSX.Element => {
  const loads = useTypedSelector(state => state.loads);
  const loadsKeys = Object.keys(loads) as KnownLoadKey[];

  const keyWitchComponent = loadsKeys.find(key => KNOWN_LOADS[key].Component);

  if (keyWitchComponent) {
    const Component = KNOWN_LOADS[keyWitchComponent]
      .Component as () => JSX.Element;

    return <Component />;
  }

  return <GenericLoadPage text="Please, stand by..." />;
};
