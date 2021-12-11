import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { decremented, incremented } from '../../store/slices/counter'
const Paragraph = styled.div`
  color: brown;
`
const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 150px;
`
const CounterRoute: React.FC = () => {
  const counter = useAppSelector((state) => state.value)
  const launchedTime = useAppSelector((state) => state.launchedTime)
  const dispatch = useAppDispatch()
  const inc = useCallback(() => dispatch(incremented()), [])
  const dec = useCallback(() => dispatch(decremented()), [])
  return (
    <div>
      <Paragraph>counter equal {counter}</Paragraph>
      <Toolbar>
        <button onClick={dec}>-</button>
        <button onClick={inc}>+</button>
      </Toolbar>
      <Paragraph>launched at {launchedTime}</Paragraph>
    </div>
  )
}

export default CounterRoute
