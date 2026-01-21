import { useCallback, useEffect, useMemo, useState } from 'react'
import { CounterContext } from './counterContext'

const isFiniteNumber = value => typeof value === 'number' && Number.isFinite(value)

export const CounterProvider = ({ children, initialValue = 0, step = 1 }) => {
    const [count, setCount] = useState(initialValue)
    const [settings, setSettings] = useState({ initialValue, step })

    // Sync internal state when provider props change (controlled usage)
    useEffect(() => {
        setCount(initialValue)
        setSettings({ initialValue, step })
    }, [initialValue, step])

    const applySettings = useCallback(
        (nextSettings = {}) => {
            const nextInitialValue = isFiniteNumber(nextSettings.initialValue)
                ? nextSettings.initialValue
                : settings.initialValue

            const nextStep = isFiniteNumber(nextSettings.step) ? nextSettings.step : settings.step

            setSettings({ initialValue: nextInitialValue, step: nextStep })
            setCount(nextInitialValue)
        },
        [settings.initialValue, settings.step]
    )

    const value = useMemo(
        () => ({
            count,
            initialValue: settings.initialValue,
            step: settings.step,
            setCount,
            applySettings,
        }),
        [count, settings.initialValue, settings.step, applySettings]
    )

    return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
}
