import { useEffect, useState } from 'react'
import { CounterContext } from './counterContext'

export const CounterProvider = ({ children, initialValue = 0, step = 1 }) => {
    const [count, setCount] = useState(initialValue)
    const [settings, setSettings] = useState({ initialValue, step })

    // Sync count when initialValue changes (e.g., after Apply is clicked)
    useEffect(() => {
        setCount(initialValue)
        setSettings({ initialValue, step })
    }, [initialValue, step])

    const applySettings = newSettings => {
        const { initialValue: newInitial, step: newStep } = newSettings
        setSettings({ initialValue: newInitial, step: newStep })
        setCount(newInitial)
    }

    const value = {
        count,
        initialValue: settings.initialValue,
        step: settings.step,
        setCount,
        applySettings,
    }

    return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
}
