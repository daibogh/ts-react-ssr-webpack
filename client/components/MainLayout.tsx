import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Sidebar } from './Sidebar'
const Container = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  background-color: #d1ff8c;
  grid-template-columns: 200px auto;
`
const Content = styled.div`
  padding: 20px;
  box-sizing: border-box;
`
export const MainLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <div>
        <Sidebar />
      </div>
      <Content>{children}</Content>
    </Container>
  )
}
