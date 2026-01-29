/**
 * Theme constants for Counter Application
 * Centralized color palette and design tokens
 */

export const colors = {
    primary: {
        light: 'green-50',
        base: 'green-600',
        dark: 'green-700',
        gradient: 'from-green-600 to-emerald-600',
    },
    secondary: {
        base: 'gray-600',
        dark: 'gray-700',
    },
    danger: {
        base: 'red-600',
        dark: 'red-700',
    },
    background: {
        gradient: 'from-green-50 via-emerald-50 to-teal-50',
    },
}

export const spacing = {
    cardPadding: 'p-10',
    buttonGap: 'gap-4',
}

export const shadows = {
    card: 'shadow-2xl',
    button: 'shadow-md hover:shadow-lg',
}

export const borderRadius = {
    card: 'rounded-3xl',
    button: 'rounded-xl',
    display: 'rounded-2xl',
}
