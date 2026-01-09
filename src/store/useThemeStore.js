import { create } from 'zustand'

const getInitialTheme = () => {
    if (globalThis.window !== undefined) {
        const savedTheme = globalThis.localStorage.getItem('theme')
        return savedTheme || 'light'
    }
    return 'light'
}

export const useThemeStore = create((set) => ({
    mode: getInitialTheme(),
    toggleTheme: () =>
        set((state) => {
            const newMode = state.mode === 'light' ? 'dark' : 'light'
            if (globalThis.window !== undefined) {
                globalThis.localStorage.setItem('theme', newMode)
            }
            return { mode: newMode }
        }),
    setTheme: (mode) =>
        set(() => {
            if (globalThis.window !== undefined) {
                globalThis.localStorage.setItem('theme', mode)
            }
            return { mode }
        }),
}))
