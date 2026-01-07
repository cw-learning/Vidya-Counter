import clsx from 'clsx'

const Display = ({ value, label, className = '' }) => {
    return (
        <div className={clsx('text-center', className)}>
            {label && (
                <p className="text-sm text-gray-600 mb-2 font-medium">{label}</p>
            )}
            <div
                className="text-7xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent tabular-nums transition-all duration-300"
                aria-live="polite"
                aria-label={label ? `${label}: ${value}` : `counter value: ${value}`}
            >
                {value}
            </div>
        </div>
    )
}

export default Display
