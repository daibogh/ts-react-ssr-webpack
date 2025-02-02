import express from 'express'
import fs from 'fs'
import path from 'path'
import ReactDOMServer from 'react-dom/server'
import { App } from '../client/components/app'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import React from 'react'
import { StaticRouter } from 'react-router-dom/server'
import { ChunkExtractor } from '@loadable/server'
import { Provider } from 'react-redux'
import { createStore } from '../client/store'
import ssrPrepass from 'react-ssr-prepass'
import createFetchStrategy from '../client/react-query-universal/fetchStrategies/createFetchStrategy'
import 'isomorphic-fetch'
import { isServer } from 'react-query/types/core/utils'

const sheet = new ServerStyleSheet()
const server = express()

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))

server.use('/', express.static(path.join(__dirname, 'static')))

const manifest = fs.readFileSync(
  path.join(__dirname, 'static/manifest.json'),
  'utf-8',
)
const assets = JSON.parse(manifest)
const statsFile = path.resolve('./dist/static/loadable-stats.json')
server.get('*', async (req, res) => {
  const chunkExtractor = new ChunkExtractor({
    statsFile,
    entrypoints: ['client'],
  })
  const store = createStore({ launchedTime: new Date().toISOString() })
  const fetchStrategy = createFetchStrategy({ enableSharedCache: true }, true)
  const appElem = (
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <StyleSheetManager sheet={sheet.instance}>
          <App fetchStrategy={fetchStrategy} />
        </StyleSheetManager>
      </StaticRouter>
    </Provider>
  )
  const collectedChunks = chunkExtractor.collectChunks(appElem)
  await ssrPrepass(collectedChunks)
  const scriptTags = chunkExtractor.getScriptTags()
  const component = ReactDOMServer.renderToString(collectedChunks)
  const styleTags = sheet.getStyleTags()
  const preloadedState = JSON.stringify(store.getState())
  res.render('client', {
    assets,
    component,
    styleTags,
    scriptTags,
    preloadedState,
  })
})

server.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`)
})
