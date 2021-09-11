import React from 'react';
import { KnownErrorsKey } from '../../../../shared/knownErrorsKeys';
import { KNOWN_ERRORS } from '../../knownErrors';
import { useTypedSelector } from '../../redux/store';
import { GenericErrorPage } from './ErrorsPages/GenericErrorPage/GenericErrorPage';

export const ErrorsMUX = (): JSX.Element => {
  const errors = useTypedSelector(state => state.errors);
  const errorKeys = Object.keys(errors) as KnownErrorsKey[];

  const keyWitchComponent = errorKeys.find(key => KNOWN_ERRORS[key].Component);

  if (keyWitchComponent) {
    const Component = KNOWN_ERRORS[keyWitchComponent]
      .Component as () => JSX.Element;

    return <Component />;
  }

  return (
    <GenericErrorPage
      error={
        KNOWN_ERRORS[errorKeys[0]] || KNOWN_ERRORS.UNEXPECTED_REDIRECT_TO_ERROR
      }
    />
  );
};
