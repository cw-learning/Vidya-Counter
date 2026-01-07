import clsx from 'clsx'

const Button = ({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    ariaLabel,
    className = ''
}) => {
    const baseStyles = 'px-6 py-3 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md hover:shadow-lg'

    const variants = {
        primary: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
        secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
        danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    }

    const disabledStyles = 'opacity-50 cursor-not-allowed'

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className={clsx(
                baseStyles,
                variants[variant],
                disabled && disabledStyles,
                className
            )}
        >
            {children}
        </button>
    )
}

export default Button
