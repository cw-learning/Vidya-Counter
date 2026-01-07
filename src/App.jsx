import { useState } from 'react'
import Counter from './components/organisms/Counter/Counter'

function App() {
  const [initialValue, setInitialValue] = useState(10)
  const [step, setStep] = useState(5)
  const [key, setKey] = useState(0)

  const handleApply = () => {
    // Force Counter to re-render with new props by changing key
    setKey(prevKey => prevKey + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="flex flex-col gap-6 w-full max-w-md">
        {/* Settings Panel */}
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Counter Settings</h3>
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Initial Value
              </label>
              <input
                type="number"
                value={initialValue}
                onChange={(e) => setInitialValue(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Step Value
              </label>
              <input
                type="number"
                value={step}
                onChange={(e) => setStep(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleApply}
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
