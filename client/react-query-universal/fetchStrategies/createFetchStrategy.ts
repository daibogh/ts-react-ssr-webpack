// @ts-ignore
import ServerFetchStrategy from './ServerFetchStrategy'
// @ts-ignore
import ClientFetchStrategy from './ClientFetchStrategy'

const createFetchStrategy = (options?: any, isServer?: boolean) => {
  if (isServer) {
    return new ServerFetchStrategy(options)
  } else {
    return new ClientFetchStrategy(options)
  }
}

export default createFetchStrategy
