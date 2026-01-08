import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CounterProvider, useCounterContext } from './CounterContext'

describe('CounterContext', () => {
    describe('useCounterContext', () => {
        it('should throw error when used outside provider', () => {
            expect(() => {
                renderHook(() => useCounterContext())
            }).toThrow('useCounterContext must be used within CounterProvider')
        })
    })

    describe('CounterProvider', () => {
        it('should initialize with default values', () => {
            const { result } = renderHook(() => useCounterContext(), {
                wrapper: CounterProvider,
            })

            expect(result.current.count).toBe(0)
            expect(result.current.initialValue).toBe(0)
            expect(result.current.step).toBe(1)
        })

        it('should initialize with custom initial value', () => {
            const { result } = renderHook(() => useCounterContext(), {
                wrapper: ({ children }) => (
                    <CounterProvider initialValue={10}>{children}</CounterProvider>
                ),
            })

            expect(result.current.count).toBe(10)
            expect(result.current.initialValue).toBe(10)
        })

        it('should initialize with custom step value', () => {
            const { result } = renderHook(() => useCounterContext(), {
                wrapper: ({ children }) => (
                    <CounterProvider step={5}>{children}</CounterProvider>
                ),
            })

            expect(result.current.step).toBe(5)
        })

        it('should initialize with custom initial and step values', () => {
            const { result } = renderHook(() => useCounterContext(), {
                wrapper: ({ children }) => (
                    <CounterProvider initialValue={20} step={3}>
                        {children}
                    </CounterProvider>
                ),
            })

            expect(result.current.count).toBe(20)
            expect(result.current.initialValue).toBe(20)
            expect(result.current.step).toBe(3)
        })

        it('should increment count by step value', () => {
            const { result } = renderHook(() => useCounterContext(), {
                wrapper: ({ children }) => (
                    <CounterProvider initialValue={0} step={5}>
                        {children}
                    </CounterProvider>
                ),
            })

            act(() => {
                result.current.handleIncrement()
            })

            expect(result.current.count).toBe(5)
        })

        it('should decrement count by step value', () => {
            const { result } = renderHook(() => useCounterContext(), {
                wrapper: ({ children }) => (
                    <CounterProvider initialValue={10} step={3}>
                        {children}
                    </CounterProvider>
                ),
            })

            act(() => {
                result.current.handleDecrement()
            })

            expect(result.current.count).toBe(7)
        })

        it('should reset count to initial value', () => {
            const { result } = renderHook(() => useCounterContext(), {
                wrapper: ({ children }) => (
                    <CounterProvider initialValue={15}>{children}</CounterProvider>
                ),
            })

            act(() => {
                result.current.handleIncrement()
                result.current.handleIncrement()
            })

            expect(result.current.count).toBe(17)

            act(() => {
                result.current.handleReset()
            })

            expect(result.current.count).toBe(15)
        })

        it('should handle multiple increments', () => {
            const { result } = renderHook(() => useCounterContext(), {
                wrapper: ({ children }) => (
                    <CounterProvider initialValue={0} step={2}>
                        {children}
                    </CounterProvider>
                ),
            })

            act(() => {
                result.current.handleIncrement()
                result.current.handleIncrement()
                result.current.handleIncrement()
            })

            expect(result.current.count).toBe(6)
        })

        it('should handle multiple decrements', () => {
            const { result } = renderHook(() => useCounterContext(), {
                wrapper: ({ children }) => (
                    <CounterProvider initialValue={20} step={4}>
                        {children}
                    </CounterProvider>
                ),
            })

            act(() => {
                result.current.handleDecrement()
                result.current.handleDecrement()
            })

            expect(result.current.count).toBe(12)
        })

        it('should handle negative step values', () => {
            const { result } = renderHook(() => useCounterContext(), {
                wrapper: ({ children }) => (
                    <CounterProvider initialValue={0} step={-3}>
                        {children}
                    </CounterProvider>
                ),
            })

            act(() => {
                result.current.handleIncrement()
            })

            expect(result.current.count).toBe(-3)

            act(() => {
                result.current.handleDecrement()
            })

            expect(result.current.count).toBe(0)
        })

        it('should handle negative initial values', () => {
            const { result } = renderHook(() => useCounterContext(), {
                wrapper: ({ children }) => (
                    <CounterProvider initialValue={-10} step={2}>
                        {children}
                    </CounterProvider>
                ),
            })

            expect(result.current.count).toBe(-10)

            act(() => {
                result.current.handleIncrement()
            })

            expect(result.current.count).toBe(-8)
        })

        it('should maintain correct count through mixed operations', () => {
            const { result } = renderHook(() => useCounterContext(), {
                wrapper: ({ children }) => (
                    <CounterProvider initialValue={5} step={3}>
                        {children}
                    </CounterProvider>
                ),
            })

            act(() => {
                result.current.handleIncrement()
                result.current.handleIncrement()
                result.current.handleDecrement()
                result.current.handleIncrement()
            })

            expect(result.current.count).toBe(11)

            act(() => {
                result.current.handleReset()
            })

            expect(result.current.count).toBe(5)
        })
    })
})
