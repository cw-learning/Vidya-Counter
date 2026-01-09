import { describe, it, expect} from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../../../store/slices/themeSlice'
import { ThemeToggle } from './ThemeToggle'

const createMockStore = (initialTheme = 'light') => {
    return configureStore({
        reducer: {
            theme: themeReducer,
        },
        preloadedState: {
            theme: { mode: initialTheme },
        },
    })
}

const renderWithStore = (component, store) => {
    return render(<Provider store={store}>{component}</Provider>)
}

describe('ThemeToggle', () => {
    it('renders theme toggle button', () => {
        const store = createMockStore()
        renderWithStore(<ThemeToggle />, store)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
    })

    it('shows moon icon in light mode', () => {
        const store = createMockStore('light')
        renderWithStore(<ThemeToggle />, store)
        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
    })

    it('shows sun icon in dark mode', () => {
        const store = createMockStore('dark')
        renderWithStore(<ThemeToggle />, store)
        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
    })

    it('toggles theme from light to dark when clicked', async () => {
        const store = createMockStore('light')
        renderWithStore(<ThemeToggle />, store)
        const user = userEvent.setup()

        const button = screen.getByRole('button')
        await user.click(button)

        const state = store.getState()
        expect(state.theme.mode).toBe('dark')
    })

    it('toggles theme from dark to light when clicked', async () => {
        const store = createMockStore('dark')
        renderWithStore(<ThemeToggle />, store)
        const user = userEvent.setup()

        const button = screen.getByRole('button')
        await user.click(button)

        const state = store.getState()
        expect(state.theme.mode).toBe('light')
    })

    it('toggles theme multiple times', async () => {
        const store = createMockStore('light')
        renderWithStore(<ThemeToggle />, store)
        const user = userEvent.setup()

        const button = screen.getByRole('button')

        await user.click(button)
        expect(store.getState().theme.mode).toBe('dark')

        await user.click(button)
        expect(store.getState().theme.mode).toBe('light')

        await user.click(button)
        expect(store.getState().theme.mode).toBe('dark')
    })

    it('has proper accessibility label for light mode', () => {
        const store = createMockStore('light')
        renderWithStore(<ThemeToggle />, store)
        const button = screen.getByLabelText('Switch to dark mode')
        expect(button).toBeInTheDocument()
    })

    it('has proper accessibility label for dark mode', () => {
        const store = createMockStore('dark')
        renderWithStore(<ThemeToggle />, store)
        const button = screen.getByLabelText('Switch to light mode')
        expect(button).toBeInTheDocument()
    })
})
