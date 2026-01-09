import clsx from 'clsx'
import PropTypes from 'prop-types'

export const Display = ({ value, label, className = '' }) => {
    const displayAriaLabel = label ? `${label}: ${value}` : `counter value: ${value}`

    return (
        <div className={clsx('text-center', className)}>
            {label && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium">{label}</p>
            )}
            <div
                className="text-7xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent tabular transition-all duration-300"
                style={{ fontVariantNumeric: 'tabular' }}
                aria-live="polite"
                aria-label={displayAriaLabel}
            >
                {value}
            </div>
        </div>
    )
}

Display.propTypes = {
    value: PropTypes.number.isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
}
