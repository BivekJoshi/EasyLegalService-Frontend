import React from 'react'
import { useMagnetic } from '../../hooks/useMagnetic'

/**
 * Drop-in <a> or <button> that gently follows the cursor.
 * Pass `as="a"` for anchor (default).
 */
export default function MagneticButton({
  as: Tag = 'a',
  strength = 0.3,
  className = '',
  children,
  ...rest
}) {
  const ref = useMagnetic({ strength })
  return (
    <Tag ref={ref} className={`magnetic ${className}`} {...rest}>
      <span className="magnetic__inner">{children}</span>
    </Tag>
  )
}
