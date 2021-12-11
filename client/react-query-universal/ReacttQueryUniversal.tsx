import React from 'react'
import { ReactQueryConfigProvider, ReactQueryCacheProvider } from 'react-query'

export default function ReactQueryUniversal({ fetchStrategy, children }: any) {
  return (
    <>
      <ReactQueryConfigProvider config={fetchStrategy.reactQueryConfig}>
        <ReactQueryCacheProvider queryCache={fetchStrategy.queryCache}>
          {children}
        </ReactQueryCacheProvider>
      </ReactQueryConfigProvider>
      <script
        type="application/json"
        id="__react-query-universal__"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(fetchStrategy.getCacheData()),
        }}
      />
    </>
  )
}
