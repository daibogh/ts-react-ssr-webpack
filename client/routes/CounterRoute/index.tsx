import React from 'react'
import loadable from '@loadable/component'
export const CounterRoute = loadable(() => import('./CounterRoute'), {
  fallback: <>...</>,
}) as any
