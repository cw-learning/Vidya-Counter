import { useState, useEffect } from 'react'
import { useThemeStore } from './store/useThemeStore'
import { Counter } from './components/organisms/Counter/Counter'
import { ThemeToggle } from './components/atoms/ThemeToggle/ThemeToggle'

function App() {
  const mode = useThemeStore((state) => state.mode)
  const [initialValue, setInitialValue] = useState(10)
  const [step, setStep] = useState(5)
  const [key, setKey] = useState(0)

  // Apply theme to document on mount and when theme changes
  useEffect(() => {
    const root = document.documentElement
    if (mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [mode])

  const handleClickApply = () => {
    // Force Counter to re-render with new props by changing key
    setKey(prevKey => prevKey + 1)
  }

  const handleOnChangeInitialValue = (event) => {
    setInitialValue(Number(event.target.value))
  }

  const handleOnChangeStepValue = (event) => {
    setStep(Number(event.target.value))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="flex flex-col gap-6 w-full max-w-md">
        {/* Settings Panel */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Counter Settings</h3>
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Initial Value
              </label>
              <input
                type="number"
                value={initialValue}
                onChange={handleOnChangeInitialValue}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                step="any"
              />
            </div>
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Step Value
              </label>
              <input
                type="number"
                value={step}
                onChange={handleOnChangeStepValue}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                step="any"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleClickApply}
                className="px-4 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Counter Component */}
        <Counter key={key} initialValue={initialValue} step={step} />
      </div>
    </div>
  )
}

export default App
