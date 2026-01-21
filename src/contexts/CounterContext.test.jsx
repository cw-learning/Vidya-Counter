import { act, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { CounterProvider } from './CounterProvider'
import { useCounterContext } from './counterContext'

const renderWithCounterProvider = ({ initialValue, step } = {}) => {
    const wrapper = ({ children }) => (
        <CounterProvider initialValue={initialValue} step={step}>
            {children}
        </CounterProvider>
    )
    return renderHook(() => useCounterContext(), { wrapper })
}

describe('CounterContext', () => {
    describe('useCounterContext', () => {
        it('should throw error when used outside provider', () => {
            expect(() => {
                renderHook(() => useCounterContext())
            }).toThrow('useCounterContext must be used within CounterProvider')
        })
    })

    describe('CounterProvider', () => {
        describe('initialization', () => {
            it('should initialize with default values', () => {
                const { result } = renderWithCounterProvider()

                expect(result.current.count).toBe(0)
                expect(result.current.initialValue).toBe(0)
                expect(result.current.step).toBe(1)
            })

            it('should initialize with custom initial value', () => {
                const { result } = renderWithCounterProvider({ initialValue: 10 })

                expect(result.current.count).toBe(10)
                expect(result.current.initialValue).toBe(10)
            })

            it('should initialize with custom step value', () => {
                const { result } = renderWithCounterProvider({ step: 5 })

                expect(result.current.step).toBe(5)
            })

            it('should initialize with custom initial and step values', () => {
                const { result } = renderWithCounterProvider({ initialValue: 20, step: 3 })

                expect(result.current.count).toBe(20)
                expect(result.current.initialValue).toBe(20)
                expect(result.current.step).toBe(3)
            })

            it('should handle negative initial values', () => {
                const { result } = renderWithCounterProvider({ initialValue: -10 })

                expect(result.current.count).toBe(-10)
            })

            it('should handle negative step values', () => {
                const { result } = renderWithCounterProvider({ step: -3 })

                expect(result.current.step).toBe(-3)
            })
        })

        describe('applySettings', () => {
            it('should update settings and reset count', () => {
                const { result } = renderWithCounterProvider({ initialValue: 10, step: 5 })

                act(() => {
                    result.current.applySettings({ initialValue: 20, step: 3 })
                })

                expect(result.current.count).toBe(20)
                expect(result.current.initialValue).toBe(20)
                expect(result.current.step).toBe(3)
            })

            it('should apply settings and then allow increment with new step', () => {
                const { result } = renderWithCounterProvider({ initialValue: 10, step: 5 })

                act(() => {
                    result.current.applySettings({ initialValue: 100, step: 10 })
                })

                act(() => {
                    result.current.setCount(prev => prev + result.current.step)
                })

                expect(result.current.count).toBe(110)
            })
        })
    })
})

describe('CounterContext Integration Tests', () => {
    it('only applies new initial/step after clicking Apply', async () => {
        const user = userEvent.setup()
        render(<App />)

        const getCount = () => screen.getByLabelText(/current count/i)
        expect(getCount()).toHaveTextContent('10')

        const initialValueInput = screen.getByLabelText(/initial value/i)
        await user.clear(initialValueInput)
        await user.type(initialValueInput, '100')

        await user.click(screen.getByRole('button', { name: /increment counter/i }))
        expect(getCount()).toHaveTextContent('15') // old step before Apply

        await user.click(screen.getByRole('button', { name: /apply/i }))
        expect(getCount()).toHaveTextContent('100')
    })
})
