import React from 'react';
import classNames from '../utils/classNames';

// PUBLIC_INTERFACE
export default function Badge({ children, variant = 'default', className, ...rest }) {
  /** Small status tag using theme tokens. Variants: default, success, error */
  return (
    <span
      className={classNames('badge', variant === 'success' && 'success', variant === 'error' && 'error', className)}
      {...rest}
    >
      {children}
    </span>
  );
}
