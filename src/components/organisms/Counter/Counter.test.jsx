import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CounterProvider } from '../../../contexts/CounterProvider'
import Counter from './Counter'

const renderWithProvider = (initialValue = 0, step = 1) => {
    return render(
        <CounterProvider initialValue={initialValue} step={step}>
            <Counter />
        </CounterProvider>,
    )
}

describe('Counter', () => {
    it('renders with initial value of 0', () => {
        renderWithProvider()
        expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('renders with custom initial value', () => {
        renderWithProvider(10)
        expect(screen.getByText('10')).toBeInTheDocument()
    })

    it('increments counter when + button is clicked', async () => {
        const user = userEvent.setup()
        renderWithProvider()

        const incrementButton = screen.getByLabelText('increment counter')
        await user.click(incrementButton)

        expect(screen.getByText('1')).toBeInTheDocument()
    })

    it('decrements counter when - button is clicked', async () => {
        const user = userEvent.setup()
        renderWithProvider()

        const decrementButton = screen.getByLabelText('decrement counter')
        await user.click(decrementButton)

        expect(screen.getByText('-1')).toBeInTheDocument()
    })

    it('resets counter to initial value when reset button is clicked', async () => {
        const user = userEvent.setup()
        renderWithProvider(5)

        const incrementButton = screen.getByLabelText('increment counter')
        await user.click(incrementButton)
        await user.click(incrementButton)

        expect(screen.getByText('7')).toBeInTheDocument()

        const resetButton = screen.getByLabelText('reset counter')
        await user.click(resetButton)

        expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('increments by custom step value', async () => {
        const user = userEvent.setup()
        renderWithProvider(0, 5)

        const incrementButton = screen.getByLabelText('increment counter')
        await user.click(incrementButton)

        expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('decrements by custom step value', async () => {
        const user = userEvent.setup()
        renderWithProvider(10, 3)

        const decrementButton = screen.getByLabelText('decrement counter')
        await user.click(decrementButton)

        expect(screen.getByText('7')).toBeInTheDocument()
    })

    it('handles multiple increments and decrements', async () => {
        const user = userEvent.setup()
        renderWithProvider(0, 2)

        const incrementButton = screen.getByLabelText('increment counter')
        const decrementButton = screen.getByLabelText('decrement counter')

        await user.click(incrementButton)
        await user.click(incrementButton)
        await user.click(decrementButton)

        expect(screen.getByText('2')).toBeInTheDocument()
    })

    it('displays counter application title', () => {
        renderWithProvider()
        expect(screen.getByText('Counter Application')).toBeInTheDocument()
    })

    it('displays current count label', () => {
        renderWithProvider()
        expect(screen.getByText('Current Count')).toBeInTheDocument()
    })
})
