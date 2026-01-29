import { useCounterContext } from '../../../contexts/CounterProvider'
import { Button } from '../../atoms/Button/Button'
import { Display } from '../../atoms/Display/Display'

export const Counter = () => {
    const { count, initialValue, step, setCount } = useCounterContext()

    const handleIncrement = () => {
        setCount((prevCount) => prevCount + step)
    }

    const handleDecrement = () => {
        setCount((prevCount) => prevCount - step)
    }

    const handleReset = () => {
        setCount(initialValue)
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 w-full max-w-md transform transition-all duration-300 hover:shadow-green-200/50 dark:hover:shadow-green-900/50 hover:scale-[1.02]">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-10">
                Counter Application
            </h2>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8 mb-8 shadow-inner">
                <Display value={count} label="Current Count" className="mb-0" />
            </div>

            <div className="flex gap-4 mb-6">
                <Button
                    type="button"
                    onClick={handleDecrement}
                    variant="danger"
                    ariaLabel="decrement counter"
                    className="flex-1 text-2xl font-bold transform transition-transform active:scale-95"
                >
                    −
                </Button>

                <Button
                    type="button"
                    onClick={handleIncrement}
                    variant="primary"
                    ariaLabel="increment counter"
                    className="flex-1 text-2xl font-bold transform transition-transform active:scale-95"
                >
                    +
                </Button>
            </div>

            <Button
                type="button"
                onClick={handleReset}
                variant="secondary"
                ariaLabel="reset counter"
                className="w-full transform transition-transform active:scale-95"
            >
                Reset
            </Button>
        </div>
    )
}
