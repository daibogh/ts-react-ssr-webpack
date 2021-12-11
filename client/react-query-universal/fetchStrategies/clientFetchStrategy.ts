import { makeQueryCache } from 'react-query'

const defaultOptions = {
  reactQueryConfig: {},
}
interface IClientFetchStrategy {
  options: any
  cacheData: any
  queryCache: any
}
class ClientFetchStrategy implements IClientFetchStrategy {
  cacheData = null as any
  options = null as any
  queryCache = null as any
  constructor(options = {} as any) {
    this.options = { ...defaultOptions, ...options }

    this.cacheData = [] as any
    this.queryCache = makeQueryCache()
    this.hydrateQueryCache()
  }

  hydrateQueryCache() {
    const cacheDataScript = document.getElementById('__react-query-universal__')

    if (!cacheDataScript) {
      return
    }

    this.cacheData = JSON.parse(cacheDataScript.innerHTML)
    this.cacheData.forEach(({ queryKey, data, config }: any) => {
      this.queryCache.setQueryData(queryKey, data, config)
    })
  }

  getCacheData() {
    return this.cacheData
  }

  get reactQueryConfig() {
    return {
      ...this.options.reactQueryConfig,
      shared: {
        ...this.options.reactQueryConfig.shared,
        suspense: false,
        useErrorBoundary: true,
        throwOnError: true,
      },
    }
  }
}

export default ClientFetchStrategy
