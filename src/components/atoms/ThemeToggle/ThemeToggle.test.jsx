import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useThemeStore } from '../../../store/useThemeStore'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
    beforeEach(() => {
        // Reset store to light mode before each test
        useThemeStore.setState({ mode: 'light' })
    })

    it('renders theme toggle button', () => {
        render(<ThemeToggle />)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
    })

    it('shows moon icon in light mode', () => {
        render(<ThemeToggle />)
        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
    })

    it('shows sun icon in dark mode', () => {
        useThemeStore.setState({ mode: 'dark' })
        render(<ThemeToggle />)
        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
    })

    it('toggles theme from light to dark when clicked', async () => {
        render(<ThemeToggle />)
        const user = userEvent.setup()

        const button = screen.getByRole('button')
        await user.click(button)

        expect(useThemeStore.getState().mode).toBe('dark')
    })

    it('toggles theme from dark to light when clicked', async () => {
        useThemeStore.setState({ mode: 'dark' })
        render(<ThemeToggle />)
        const user = userEvent.setup()

        const button = screen.getByRole('button')
        await user.click(button)

        expect(useThemeStore.getState().mode).toBe('light')
    })

    it('toggles theme multiple times', async () => {
        render(<ThemeToggle />)
        const user = userEvent.setup()

        const button = screen.getByRole('button')

        await user.click(button)
        expect(useThemeStore.getState().mode).toBe('dark')

        await user.click(button)
        expect(useThemeStore.getState().mode).toBe('light')

        await user.click(button)
        expect(useThemeStore.getState().mode).toBe('dark')
    })

    it('has proper accessibility label for light mode', () => {
        render(<ThemeToggle />)
        const button = screen.getByLabelText('Switch to dark mode')
        expect(button).toBeInTheDocument()
    })

    it('has proper accessibility label for dark mode', () => {
        useThemeStore.setState({ mode: 'dark' })
        render(<ThemeToggle />)
        const button = screen.getByLabelText('Switch to light mode')
        expect(button).toBeInTheDocument()
    })
})
