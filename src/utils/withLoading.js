import React from 'react';
import { getDisplayName } from './component';
import { Loading } from '../components';

export default function withLoading(BaseComponent) {
  function withLoadingScreen({ loading, children, ...props }) {
    const newProps = {
      loading,
      ...props,
    };

    return (
      <>
        {loading && (
          <Loading title="Loading data... Please wait!" />
        )}
        <BaseComponent {...newProps}>{children}</BaseComponent>
      </>
    );
  }

  withLoadingScreen.displayName = `LoadingAndError(${getDisplayName(BaseComponent)})`;

  return withLoadingScreen;
}
