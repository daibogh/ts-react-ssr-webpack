import { useQuery } from 'react-query'

const fetchPosts = () => {
  console.log('FETCH USERS')
  return fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
    res.json(),
  )
}
type Post = {
  title: string
  body: string
}
export function usePosts() {
  return useQuery<Post[]>('posts', () => fetchPosts(), {
    staleTime: 1000 * 10,
    refetchOnWindowFocus: false,
  })
}
