import React from 'react'
import loadable from '@loadable/component'
export const GoodByeRoute = loadable(() => import('./GoodByeRoute'), {fallback: <>...</>}) as any
// export {default as GoodByeRoute} from './GoodByeRoute'