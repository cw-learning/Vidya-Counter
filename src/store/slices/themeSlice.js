import { createSlice } from '@reduxjs/toolkit'

const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme')
        return savedTheme || 'light'
    }
    return 'light'
}

const initialState = {
    mode: getInitialTheme(),
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', state.mode)
            }
        },
        setTheme: (state, action) => {
            state.mode = action.payload
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', state.mode)
            }
        },
    },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export const selectThemeMode = (state) => state.theme.mode
export default themeSlice.reducer
