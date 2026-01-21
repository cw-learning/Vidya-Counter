import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

const getCount = () => screen.getByLabelText(/current count/i)

describe('App Integration Tests', () => {
    it('only applies new initial/step after clicking Apply', async () => {
        const user = userEvent.setup()
        render(<App />)

        // Initial state: count should be at initialValue (10)
        expect(getCount()).toHaveTextContent('10')

        // Change settings but do NOT apply
        const initialValueInput = screen.getByLabelText(/initial value/i)
        const stepValueInput = screen.getByLabelText(/step value/i)

        await user.clear(initialValueInput)
        await user.type(initialValueInput, '100')

        await user.clear(stepValueInput)
        await user.type(stepValueInput, '10')

        // Increment counter - should use OLD step (5) not new step (10)
        await user.click(screen.getByRole('button', { name: /increment counter/i }))

        // Count should be 10 + 5 = 15 (old step)
        expect(getCount()).toHaveTextContent('15')

        // Now click Apply to apply new settings
        await user.click(screen.getByRole('button', { name: /apply/i }))

        // After Apply, count should reset to new initialValue (100)
        expect(getCount()).toHaveTextContent('100')

        // Increment with new step (10)
        await user.click(screen.getByRole('button', { name: /increment counter/i }))

        // Count should be 100 + 10 = 110 (new step)
        expect(getCount()).toHaveTextContent('110')
    })

    it('should reset to new initial value after applying settings', async () => {
        const user = userEvent.setup()
        render(<App />)

        // Increment counter
        await user.click(screen.getByRole('button', { name: /increment counter/i }))
        expect(getCount()).toHaveTextContent('15')

        // Change initial value to 50
        const initialValueInput = screen.getByLabelText(/initial value/i)
        await user.clear(initialValueInput)
        await user.type(initialValueInput, '50')

        // Apply settings
        await user.click(screen.getByRole('button', { name: /apply/i }))

        // Count should be reset to 50
        expect(getCount()).toHaveTextContent('50')

        // Reset should now use the new initial value
        await user.click(screen.getByRole('button', { name: /increment counter/i }))
        await user.click(screen.getByRole('button', { name: /reset counter/i }))

        expect(getCount()).toHaveTextContent('50')
    })

    it('should handle decrement with new step after applying', async () => {
        const user = userEvent.setup()
        render(<App />)

        // Change step to 3
        const stepValueInput = screen.getByLabelText(/step value/i)
        await user.clear(stepValueInput)
        await user.type(stepValueInput, '3')

        // Apply settings
        await user.click(screen.getByRole('button', { name: /apply/i }))

        // Decrement with new step (3)
        await user.click(screen.getByRole('button', { name: /decrement counter/i }))

        // Count should be 10 - 3 = 7
        expect(getCount()).toHaveTextContent('7')
    })

    it('should preserve draft values when not applying', async () => {
        const user = userEvent.setup()
        render(<App />)

        const initialValueInput = screen.getByLabelText(/initial value/i)

        // Change to 999 but don't apply
        await user.clear(initialValueInput)
        await user.type(initialValueInput, '999')

        // Input should show 999
        expect(initialValueInput).toHaveValue(999)

        // But count should still be at original value
        expect(getCount()).toHaveTextContent('10')
    })

    it('should handle invalid input gracefully', async () => {
        const user = userEvent.setup()
        render(<App />)

        const initialValueInput = screen.getByLabelText(/initial value/i)

        // Clear input (empty string)
        await user.clear(initialValueInput)

        // Apply with empty input should keep previous value
        await user.click(screen.getByRole('button', { name: /apply/i }))

        // Should maintain the last valid value (10)
        expect(getCount()).toHaveTextContent('10')
    })
})
