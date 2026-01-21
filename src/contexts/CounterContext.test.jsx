import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
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

        describe('increment operation', () => {
            it('should increment count by step value', () => {
                const { result } = renderWithCounterProvider({ initialValue: 0, step: 5 })

                act(() => {
                    result.current.setCount(prev => prev + result.current.step)
                })

                expect(result.current.count).toBe(5)
            })

            it('should handle multiple increments', () => {
                const { result } = renderWithCounterProvider({ initialValue: 0, step: 2 })

                act(() => {
                    result.current.setCount(prev => prev + result.current.step)
                    result.current.setCount(prev => prev + result.current.step)
                    result.current.setCount(prev => prev + result.current.step)
                })

                expect(result.current.count).toBe(6)
            })

            it('should increment with negative step value', () => {
                const { result } = renderWithCounterProvider({ initialValue: 0, step: -3 })

                act(() => {
                    result.current.setCount(prev => prev + result.current.step)
                })

                expect(result.current.count).toBe(-3)
            })
        })

        describe('decrement operation', () => {
            it('should decrement count by step value', () => {
                const { result } = renderWithCounterProvider({ initialValue: 10, step: 3 })

                act(() => {
                    result.current.setCount(prev => prev - result.current.step)
                })

                expect(result.current.count).toBe(7)
            })

            it('should handle multiple decrements', () => {
                const { result } = renderWithCounterProvider({ initialValue: 20, step: 4 })

                act(() => {
                    result.current.setCount(prev => prev - result.current.step)
                    result.current.setCount(prev => prev - result.current.step)
                })

                expect(result.current.count).toBe(12)
            })

            it('should decrement with negative step value', () => {
                const { result } = renderWithCounterProvider({ initialValue: 0, step: -3 })

                act(() => {
                    result.current.setCount(prev => prev - result.current.step)
                })

                expect(result.current.count).toBe(3)
            })
        })

        describe('reset operation', () => {
            it('should reset count to initial value', () => {
                const { result } = renderWithCounterProvider({ initialValue: 15 })

                act(() => {
                    result.current.setCount(prev => prev + result.current.step)
                    result.current.setCount(prev => prev + result.current.step)
                })

                expect(result.current.count).toBe(17)

                act(() => {
                    result.current.setCount(result.current.initialValue)
                })

                expect(result.current.count).toBe(15)
            })
        })

        describe('mixed operations', () => {
            it('should maintain correct count through increment and decrement', () => {
                const { result } = renderWithCounterProvider({ initialValue: 5, step: 3 })

                act(() => {
                    result.current.setCount(prev => prev + result.current.step)
                    result.current.setCount(prev => prev + result.current.step)
                    result.current.setCount(prev => prev - result.current.step)
                    result.current.setCount(prev => prev + result.current.step)
                })

                expect(result.current.count).toBe(11)
            })

            it('should reset correctly after mixed operations', () => {
                const { result } = renderWithCounterProvider({ initialValue: 5, step: 3 })

                act(() => {
                    result.current.setCount(prev => prev + result.current.step)
                    result.current.setCount(prev => prev + result.current.step)
                    result.current.setCount(prev => prev - result.current.step)
                    result.current.setCount(prev => prev + result.current.step)
                })

                expect(result.current.count).toBe(11)

                act(() => {
                    result.current.setCount(result.current.initialValue)
                })

                expect(result.current.count).toBe(5)
            })

            it('should work with negative initial and increment', () => {
                const { result } = renderWithCounterProvider({ initialValue: -10, step: 2 })

                expect(result.current.count).toBe(-10)

                act(() => {
                    result.current.setCount(prev => prev + result.current.step)
                })

                expect(result.current.count).toBe(-8)
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
