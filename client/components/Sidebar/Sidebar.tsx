import styled from 'styled-components'
import { Link } from 'react-router-dom'
import React from 'react'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: black !important;
  font-size: 16px;
  line-height: 20px;
  padding: 20px;
  border-left: 2px solid white;
  border-right: 2px solid white;
  height: 100%;
  box-sizing: border-box;
  & a:-webkit-any-link {
    color: black;
    text-decoration: none;
  }
`

const Sidebar: React.FC = () => {
  return (
    <Container>
      <Link to="/">index</Link>
      <Link to="/hello">hello</Link>
      <Link to="/good-bye">goodbye</Link>
      <Link to="/counter">counter</Link>
      <Link to="/posts">posts</Link>
    </Container>
  )
}
export default Sidebar
