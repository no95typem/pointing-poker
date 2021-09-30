import React from 'react';

export type ISelfRemoving = any & { selfRemove: () => void };

export type SelfRemovingReactElement =
  React.JSXElementConstructor<ISelfRemoving>;
