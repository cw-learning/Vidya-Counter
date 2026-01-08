import { createContext, useContext, useState } from 'react'

const CounterContext = createContext(undefined)

export const useCounterContext = () => {
  const context = useContext(CounterContext)
  if (!context) {
    throw new Error('useCounterContext must be used within CounterProvider')
  }
  return context
}

export const CounterProvider = ({ children, initialValue = 0, step = 1 }) => {
  const [count, setCount] = useState(initialValue)

  const handleIncrement = () => {
    setCount(prevCount => prevCount + step)
  }

  const handleDecrement = () => {
    setCount(prevCount => prevCount - step)
  }

  const handleReset = () => {
    setCount(initialValue)
  }

  const value = {
    count,
    initialValue,
    step,
    handleIncrement,
    handleDecrement,
    handleReset,
  }

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  )
}
