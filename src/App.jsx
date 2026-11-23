import { useSelector } from 'react-redux'
import AddTask from './components/AddTask.jsx'
import ListTask from './components/ListTask.jsx'

function App() {
  const tasks = useSelector((state) => state.tasks.items)
  const remainingCount = tasks.filter((task) => !task.isDone).length

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Le Petit Plan, accueil">
          <span className="brand-mark" aria-hidden="true">p.</span>
          <span>le petit plan</span>
        </a>
        <span className="topbar-note"><span className="status-dot" /> VOTRE JOURNÉE, EN DOUCEUR</span>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <div className="intro-copy">
          <p className="eyebrow"><span className="eyebrow-sparkle" aria-hidden="true">✳</span> UN ESPRIT PLUS LÉGER COMMENCE ICI</p>
          <h1 id="page-title">Les choses à faire,<br /><span>une à la fois.</span></h1>
          <p className="intro-description">
            Faites de la place dans votre tête. Notez ce qui compte, puis avancez à votre rythme.
          </p>
        </div>
        <div className="day-card">
          <span className="day-card-label">IL VOUS RESTE</span>
          <strong>{remainingCount.toString().padStart(2, '0')}</strong>
          <span>{remainingCount === 1 ? 'petite chose à faire' : 'petites choses à faire'}</span>
          <span className="day-card-flower" aria-hidden="true">✳</span>
        </div>
      </section>

      <div className="content-card">
        <AddTask />
        <ListTask />
      </div>

      <footer className="page-footer">
        <span>AVANCEZ À VOTRE RYTHME.</span>
        <span>✳ <span>LE PETIT PLAN</span></span>
      </footer>
    </main>
  )
}

export default App
