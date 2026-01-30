import clsx from 'clsx'
import PropTypes from 'prop-types'

export const Display = ({ value, label, className = '' }) => {
    const ariaLabel = label ? `${label}: ${value}` : `counter value: ${value}`

    return (
        <div className={clsx('text-center', className)}>
            {label && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium">{label}</p>
            )}

            <output
                className="block text-7xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent tabular-nums transition-all duration-300"
                aria-live="polite"
                aria-label={ariaLabel}
            >
                {value}
            </output>
        </div>
    )
}

Display.propTypes = {
    value: PropTypes.number.isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
}
