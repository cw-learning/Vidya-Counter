import { createSlice } from '@reduxjs/toolkit'

const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'light'
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
            localStorage.setItem('theme', state.mode)
        },
        setTheme: (state, action) => {
            state.mode = action.payload
            localStorage.setItem('theme', state.mode)
        },
    },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export const selectThemeMode = (state) => state.theme.mode
export default themeSlice.reducer
