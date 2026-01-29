import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectThemeMode } from './store/slices/themeSlice'
import { Counter } from './components/organisms/Counter/Counter'
import { ThemeToggle } from './components/atoms/ThemeToggle/ThemeToggle'

function App() {
  const themeMode = useSelector(selectThemeMode)
  const [initialValue, setInitialValue] = useState(10)
  const [step, setStep] = useState(5)
  const [key, setKey] = useState(0)

  useEffect(() => {
    const root = document.documentElement
    if (themeMode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [themeMode])

  const handleClickApply = () => {
    setKey((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="flex flex-col gap-6 w-full max-w-md">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 transition-colors duration-300">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
            Counter Settings
          </h3>

          <div className="flex gap-3 flex-wrap">
            <input
              type="number"
              value={initialValue}
              onChange={(e) => setInitialValue(Number(e.target.value))}
            />
            <input
              type="number"
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
            />
            <button type="submit" onClick={handleClickApply} className="px-4 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200">Apply</button>
          </div>
        </div>

        <Counter key={key} initialValue={initialValue} step={step} />
      </div>
    </div>
  )
}

export default App
