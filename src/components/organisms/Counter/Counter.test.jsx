import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from './Counter'

describe('Counter', () => {
    it('renders with initial value of 0', () => {
        render(<Counter />)
        expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('renders with custom initial value', () => {
        render(<Counter initialValue={10} />)
        expect(screen.getByText('10')).toBeInTheDocument()
    })

    it('increments counter when + button is clicked', async () => {
        const user = userEvent.setup()
        render(<Counter />)

        const incrementButton = screen.getByLabelText('increment counter')
        await user.click(incrementButton)

        expect(screen.getByText('1')).toBeInTheDocument()
    })

    it('decrements counter when - button is clicked', async () => {
        const user = userEvent.setup()
        render(<Counter />)

        const decrementButton = screen.getByLabelText('decrement counter')
        await user.click(decrementButton)

        expect(screen.getByText('-1')).toBeInTheDocument()
    })

    it('resets counter to initial value when reset button is clicked', async () => {
        const user = userEvent.setup()
        render(<Counter initialValue={5} />)

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
        render(<Counter step={5} />)

        const incrementButton = screen.getByLabelText('increment counter')
        await user.click(incrementButton)

        expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('decrements by custom step value', async () => {
        const user = userEvent.setup()
        render(<Counter step={3} />)

        const decrementButton = screen.getByLabelText('decrement counter')
        await user.click(decrementButton)

        expect(screen.getByText('-3')).toBeInTheDocument()
    })

    it('handles multiple increments and decrements', async () => {
        const user = userEvent.setup()
        render(<Counter />)

        const incrementButton = screen.getByLabelText('increment counter')
        const decrementButton = screen.getByLabelText('decrement counter')

        await user.click(incrementButton)
        await user.click(incrementButton)
        await user.click(incrementButton)
        expect(screen.getByText('3')).toBeInTheDocument()

        await user.click(decrementButton)
        expect(screen.getByText('2')).toBeInTheDocument()
    })

    it('displays counter application title', () => {
        render(<Counter />)
        expect(screen.getByText('Counter Application')).toBeInTheDocument()
    })

    it('displays current count label', () => {
        render(<Counter />)
        expect(screen.getByText('Current Count')).toBeInTheDocument()
    })
})
