import React from 'react';
import classNames from '../utils/classNames';

// PUBLIC_INTERFACE
export default function Tile({ as: As = 'div', className, children, ...rest }) {
  /** Generic tile with hover elevation and rounded corners. */
  return (
    <As className={classNames('tile', className)} {...rest}>
      {children}
    </As>
  );
}
