import Settings from './components/molecules/Settings/Settings'
import Counter from './components/organisms/Counter/Counter'
import { CounterProvider } from './contexts/CounterProvider'

const DEFAULT_INITIAL_VALUE = 10
const DEFAULT_STEP = 5

function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
            <div className="flex flex-col gap-6 w-full max-w-md">
                <CounterProvider initialValue={DEFAULT_INITIAL_VALUE} step={DEFAULT_STEP}>
                    <Settings />
                    <Counter />
                </CounterProvider>
            </div>
        </div>
    )
}

export default App
