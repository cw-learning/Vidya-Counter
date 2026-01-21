import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CounterProvider } from '../../../contexts/CounterProvider'
import Counter from './Counter'

const renderWithProvider = (initialValue = 0, step = 1) => {
    return render(
        <CounterProvider initialValue={initialValue} step={step}>
            <Counter />
        </CounterProvider>
    )
}

describe('Counter', () => {
    it('renders with initial value of 0', () => {
        renderWithProvider()
        expect(screen.getByLabelText(/current count/i)).toHaveTextContent('0')
    })

    it('renders with custom initial value', () => {
        renderWithProvider(10)
        expect(screen.getByLabelText(/current count/i)).toHaveTextContent('10')
    })

    it('increments counter when + button is clicked', async () => {
        const user = userEvent.setup()
        renderWithProvider()

        const incrementButton = screen.getByLabelText('increment counter')
        await user.click(incrementButton)

        expect(screen.getByLabelText(/current count/i)).toHaveTextContent('1')
    })

    it('decrements counter when - button is clicked', async () => {
        const user = userEvent.setup()
        renderWithProvider()

        const decrementButton = screen.getByLabelText('decrement counter')
        await user.click(decrementButton)

        expect(screen.getByLabelText(/current count/i)).toHaveTextContent('-1')
    })

    it('resets counter to initial value when reset button is clicked', async () => {
        const user = userEvent.setup()
        renderWithProvider(5)

        const incrementButton = screen.getByLabelText('increment counter')
        await user.click(incrementButton)
        await user.click(incrementButton)

        expect(screen.getByLabelText(/current count/i)).toHaveTextContent('7')

        const resetButton = screen.getByLabelText('reset counter')
        await user.click(resetButton)

        expect(screen.getByLabelText(/current count/i)).toHaveTextContent('5')
    })

    it('increments by custom step value', async () => {
        const user = userEvent.setup()
        renderWithProvider(0, 5)

        const incrementButton = screen.getByLabelText('increment counter')
        await user.click(incrementButton)

        expect(screen.getByLabelText(/current count/i)).toHaveTextContent('5')
    })

    it('decrements by custom step value', async () => {
        const user = userEvent.setup()
        renderWithProvider(10, 3)

        const decrementButton = screen.getByLabelText('decrement counter')
        await user.click(decrementButton)

        expect(screen.getByLabelText(/current count/i)).toHaveTextContent('7')
    })

    it('handles multiple increments and decrements', async () => {
        const user = userEvent.setup()
        renderWithProvider(0, 2)

        const incrementButton = screen.getByLabelText('increment counter')
        const decrementButton = screen.getByLabelText('decrement counter')

        await user.click(incrementButton)
        await user.click(incrementButton)
        await user.click(decrementButton)

        expect(screen.getByLabelText(/current count/i)).toHaveTextContent('2')
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
