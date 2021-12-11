import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { HelloRoute } from '../routes/HelloRoute'
import { GoodByeRoute } from '../routes/GoodByeRoute'
import { MainLayout } from './MainLayout'
import CounterRoute from '../routes/CounterRoute/CounterRoute'
import PostsRoute from '../routes/PostsRoute/PostsRoute'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()
export const App: React.FC = () => {
  useEffect(() => {
    console.log('only on client')
  }, [])
  console.log('on both sides')
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<MainLayout children={<>index</>} />} />
        <Route
          path="/hello"
          element={<MainLayout children={<HelloRoute />} />}
        />
        <Route
          path="/good-bye"
          element={<MainLayout children={<GoodByeRoute />} />}
        />
        <Route
          path="/counter"
          element={<MainLayout children={<CounterRoute />} />}
        />
        <Route
          path="/posts"
          element={<MainLayout children={<PostsRoute />} />}
        />
      </Routes>
    </QueryClientProvider>
  )
}
