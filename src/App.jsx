import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ThemeToggle } from './components/atoms/ThemeToggle/ThemeToggle'
import { Counter } from './components/organisms/Counter/Counter'
import { useCounterContext } from './contexts/counterContext'
import { selectThemeMode } from './store/slices/themeSlice'

function App() {
    const themeMode = useSelector(selectThemeMode)
    const { applySettings } = useCounterContext()
    const [initialValue, setInitialValue] = useState(10)
    const [step, setStep] = useState(5)
    const [draftInitial, setDraftInitial] = useState(initialValue.toString())
    const [draftStep, setDraftStep] = useState(step.toString())

    useEffect(() => {
        const root = document.documentElement
        if (themeMode === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [themeMode])

    const handleClickApply = () => {
        const newInitial = Number(draftInitial)
        const newStep = Number(draftStep)
        if (
            draftInitial.trim() !== '' &&
            !Number.isNaN(newInitial) &&
            newInitial >= 0 &&
            draftStep.trim() !== '' &&
            !Number.isNaN(newStep) &&
            newStep > 0
        ) {
            setInitialValue(newInitial)
            setStep(newStep)
            applySettings({ initialValue: newInitial, step: newStep })
            setDraftInitial(newInitial.toString())
            setDraftStep(newStep.toString())
        } else {
            setDraftInitial(initialValue.toString())
            setDraftStep(step.toString())
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
            <div className="flex flex-col gap-6 w-full max-w-md">
                <div className="flex justify-end">
                    <ThemeToggle />
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 transition-colors duration-300">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
                        Counter Settings
                    </h3>

                    <div className="flex gap-3 flex-wrap">
                        <div>
                            <label
                                htmlFor="initial-value"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Initial Value
                            </label>
                            <input
                                id="initial-value"
                                type="number"
                                value={draftInitial}
                                onChange={e => {
                                    const val = e.target.value
                                    setDraftInitial(val)
                                }}
                                className="w-full px-3 py-2 border text-black border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="step-value"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Step Value
                            </label>
                            <input
                                id="step-value"
                                type="number"
                                value={draftStep}
                                onChange={e => {
                                    const val = e.target.value
                                    setDraftStep(val)
                                }}
                                className="w-full px-3 py-2 text-black border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                onClick={handleClickApply}
                                className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>

                <Counter />
            </div>
        </div>
    )
}

export default App
