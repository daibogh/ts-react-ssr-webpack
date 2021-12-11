import { makeQueryCache } from 'react-query'
// @ts-ignore
import LFUCache from 'tiny-lfu-cache'
const defaultOptions = {
  reactQueryConfig: {},
  enableSharedCache: false,
}

class ServerFetchStrategy {
  cacheData = null as any
  options = null as any
  queryCache = null as any
  queryCacheSubscription = null as any
  queriesByHash = null as any
  static sharedCache: any
  constructor(options = {}) {
    this.options = { ...defaultOptions, ...options }
    this.queriesByHash = new Map()

    this.queryCache = makeQueryCache()
    this.queryCacheSubscription = this.queryCache.subscribe(
      this.handleQueryCacheChanges.bind(this),
    )

    if (this.options.enableSharedCache) {
      this.warmUpFromSharedCache()
    }
  }

  handleQueryCacheChanges(queryCache: any, query: any) {
    if (!query) {
      return
    }

    const { queryHash, queryKey, state, config } = query
    this.queriesByHash.set(queryHash, query)

    if (
      this.options.enableSharedCache &&
      config.staleTime &&
      state.isSuccess &&
      !ServerFetchStrategy.sharedCache.has(queryHash)
    ) {
      ServerFetchStrategy.sharedCache.set(
        queryHash,
        { key: queryKey, data: state.data, staleTime: config.staleTime },
        config.staleTime,
      )
    }
  }

  warmUpFromSharedCache() {
    ;[...ServerFetchStrategy.sharedCache.keys()].forEach((queryHash: any) => {
      const cachedQuery = ServerFetchStrategy.sharedCache.get(queryHash)

      if (!cachedQuery) {
        return
      }

      const { key, data, staleTime } = cachedQuery
      this.queryCache.setQueryData(key, data, { staleTime })
    })
  }

  getCacheData() {
    const cacheData = [] as any
    this.queriesByHash.forEach((query: any) => {
      cacheData.push({
        queryKey: query.queryKey,
        data: this.queryCache.getQueryData(query.queryKey),
        config: {
          staleTime: query.config.staleTime,
          cacheTime: query.config.cacheTime,
        },
      })
    })

    return cacheData
  }

  get reactQueryConfig() {
    return {
      ...this.options.reactQueryConfig,
      shared: {
        ...this.options.reactQueryConfig.shared,
        suspense: true,
        useErrorBoundary: true,
        throwOnError: true,
      },
    }
  }
}

ServerFetchStrategy.sharedCache = new Map()

export default ServerFetchStrategy
