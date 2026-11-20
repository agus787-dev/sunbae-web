import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { DemoSection } from './components/sections/DemoSection'
import { Hero } from './components/sections/Hero'
import { ModelOverview } from './components/sections/ModelOverview'
import { Roadmap } from './components/sections/Roadmap'
import { useApiHealth } from './hooks/useApiHealth'

function App() {
  const { status, isMock } = useApiHealth()

  return (
    <div id="top" className="flex min-h-screen flex-col overflow-x-clip bg-background text-foreground">
      <a
        href="#demo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Demoga o'tish
      </a>
      <Header status={status} isMock={isMock} />
      <main className="flex-1">
        <Hero />
        <DemoSection healthStatus={status} isMock={isMock} />
        <ModelOverview />
        <Roadmap />
      </main>
      <Footer />
    </div>
  )
}

export default App
