import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
    it('renders button with children', () => {
        render(<Button>Click me</Button>)
        expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('calls onClick when clicked', async () => {
        const handleClick = vi.fn()
        const user = userEvent.setup()

        render(<Button onClick={handleClick}>Click me</Button>)
        await user.click(screen.getByText('Click me'))

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
        const handleClick = vi.fn()
        const user = userEvent.setup()

        render(
            <Button onClick={handleClick} disabled>
                Click me
            </Button>
        )
        await user.click(screen.getByText('Click me'))

        expect(handleClick).not.toHaveBeenCalled()
    })

    it('renders with primary variant by default', () => {
        render(<Button>Click me</Button>)
        const button = screen.getByText('Click me')
        expect(button).toHaveClass('bg-green-600')
    })

    it('renders with secondary variant', () => {
        render(<Button variant="secondary">Click me</Button>)
        const button = screen.getByText('Click me')
        expect(button).toHaveClass('bg-gray-600')
    })

    it('renders with danger variant', () => {
        render(<Button variant="danger">Click me</Button>)
        const button = screen.getByText('Click me')
        expect(button).toHaveClass('bg-red-600')
    })

    it('applies aria-label for accessibility', () => {
        render(<Button ariaLabel="increment counter">+</Button>)
        expect(screen.getByLabelText('increment counter')).toBeInTheDocument()
    })

    it('applies custom className', () => {
        render(<Button className="custom-class">Click me</Button>)
        expect(screen.getByText('Click me')).toHaveClass('custom-class')
    })
})
