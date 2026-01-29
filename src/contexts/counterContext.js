import { createContext, useContext } from 'react'

const CounterContext = createContext(undefined)

export const useCounterContext = () => {
    const context = useContext(CounterContext)
    if (context === undefined) {
        throw new Error('useCounterContext must be used within CounterProvider')
    }
    return context
}

export { CounterContext }
