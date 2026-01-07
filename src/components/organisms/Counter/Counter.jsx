import { useState } from 'react'
import Button from '../../atoms/Button/Button'
import Display from '../../atoms/Display/Display'

const Counter = ({ initialValue = 0, step = 1 }) => {
    const [count, setCount] = useState(initialValue)

    const increment = () => setCount(count + step)
    const decrement = () => setCount(count - step)
    const reset = () => setCount(initialValue)

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Counter Application
            </h2>

            <Display value={count} label="Current Count" className="mb-8" />

            <div className="flex gap-4 mb-4">
                <Button
                    onClick={decrement}
                    variant="danger"
                    ariaLabel="decrement counter"
                    className="flex-1"
                >
                    -
                </Button>
                <Button
                    onClick={increment}
                    variant="primary"
                    ariaLabel="increment counter"
                    className="flex-1"
                >
                    +
                </Button>
            </div>

            <Button
                onClick={reset}
                variant="secondary"
                ariaLabel="reset counter"
                className="w-full"
            >
                Reset
            </Button>
        </div>
    )
}

export default Counter
