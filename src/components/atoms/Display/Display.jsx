import clsx from 'clsx'

const Display = ({ value, label, className = '' }) => {
    return (
        <div className={clsx('text-center', className)}>
            {label && (
                <p className="text-sm text-gray-600 mb-2 font-medium">{label}</p>
            )}
            <div
                className="text-6xl font-bold text-gray-800 tabular-nums"
                aria-live="polite"
                aria-label={label ? `${label}: ${value}` : `counter value: ${value}`}
            >
                {value}
            </div>
        </div>
    )
}

export default Display
