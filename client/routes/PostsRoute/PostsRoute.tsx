import React from 'react'
import styled from 'styled-components'
import { usePosts } from '../../hooks/api/usePosts'
const Paragraph = styled.div`
  color: brown;
`
const Card = styled.div`
  border: 1px solid #775c5c;
  background-color: #ffdbb6;
  padding: 5px;
`
const Header = styled.h3``
const PostsRoute: React.FC = () => {
  const { isFetching, data } = usePosts()
  return isFetching ? (
    <>loading...</>
  ) : data ? (
    <div>
      {data.map(({ title, body }, idx) => (
        <Card key={idx}>
          <Header>{title}</Header>
          <div>{body}</div>
        </Card>
      ))}
    </div>
  ) : (
    <Paragraph>error!</Paragraph>
  )
}

export default PostsRoute
