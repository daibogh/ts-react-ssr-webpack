import React from 'react'
import loadable from '@loadable/component'
export const PostsRoute = loadable(() => import('./PostsRoute'), {
  fallback: <>...</>,
}) as any
// export {default as CounterRoute} from './CounterRoute'
