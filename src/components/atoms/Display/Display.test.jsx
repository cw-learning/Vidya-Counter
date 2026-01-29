import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Display from './Display'

describe('Display', () => {
    it('renders the counter value', () => {
        render(<Display value={5} />)
        expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('renders with label', () => {
        render(<Display value={10} label="Counter" />)
        expect(screen.getByText('Counter')).toBeInTheDocument()
        expect(screen.getByText('10')).toBeInTheDocument()
    })

    it('renders without label', () => {
        render(<Display value={0} />)
        expect(screen.queryByRole('paragraph')).not.toBeInTheDocument()
        expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('displays negative numbers', () => {
        render(<Display value={-5} />)
        expect(screen.getByText('-5')).toBeInTheDocument()
    })

    it('displays large numbers', () => {
        render(<Display value={9999} />)
        expect(screen.getByText('9999')).toBeInTheDocument()
    })

    it('has aria-live for accessibility', () => {
        render(<Display value={42} />)
        const display = screen.getByText('42')
        expect(display).toHaveAttribute('aria-live', 'polite')
    })

    it('has correct aria-label with label prop', () => {
        render(<Display value={7} label="Count" />)
        const display = screen.getByText('7')
        expect(display).toHaveAttribute('aria-label', 'Count: 7')
    })

    it('has default aria-label without label prop', () => {
        render(<Display value={3} />)
        const display = screen.getByText('3')
        expect(display).toHaveAttribute('aria-label', 'counter value: 3')
    })

    it('applies custom className', () => {
        render(<Display value={1} className="my-custom-class" />)
        const container = screen.getByText('1').parentElement
        expect(container).toHaveClass('my-custom-class')
    })
})
