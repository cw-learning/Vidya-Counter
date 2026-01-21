import { useState } from 'react'
import { useCounterContext } from '../../../contexts/counterContext'

const Settings = () => {
    const { initialValue, step, applySettings } = useCounterContext()
    const [draftInitialValue, setDraftInitialValue] = useState(String(initialValue))
    const [draftStep, setDraftStep] = useState(String(step))

    const handleOnChangeInitialValue = event => {
        setDraftInitialValue(event.currentTarget.value)
    }

    const handleOnChangeStepValue = event => {
        setDraftStep(event.currentTarget.value)
    }

    const parseFiniteNumber = (raw, fallback) => {
        if (raw.trim() === '') return fallback

        const next = Number(raw)
        return Number.isFinite(next) ? next : fallback
    }

    const handleClickApply = () => {
        const newInitialValue = parseFiniteNumber(draftInitialValue, initialValue)
        const newStep = parseFiniteNumber(draftStep, step)

        applySettings({ initialValue: newInitialValue, step: newStep })
        setDraftInitialValue(String(newInitialValue))
        setDraftStep(String(newStep))
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Counter Settings</h3>

            <div className="flex gap-3 flex-wrap">
                <div className="flex-1 min-w-[140px]">
                    <label
                        htmlFor="initial-value"
                        className="block text-xs font-medium text-gray-700 mb-1"
                    >
                        Initial Value
                    </label>
                    <input
                        id="initial-value"
                        type="number"
                        value={draftInitialValue}
                        onChange={handleOnChangeInitialValue}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        step="any"
                    />
                </div>

                <div className="flex-1 min-w-[140px]">
                    <label
                        htmlFor="step-value"
                        className="block text-xs font-medium text-gray-700 mb-1"
                    >
                        Step Value
                    </label>
                    <input
                        id="step-value"
                        type="number"
                        value={draftStep}
                        onChange={handleOnChangeStepValue}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        step="any"
                    />
                </div>

                <div className="flex items-end">
                    <button
                        type="button"
                        onClick={handleClickApply}
                        className="px-4 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Settings
