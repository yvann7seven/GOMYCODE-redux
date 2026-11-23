import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../features/tasks/tasksSlice.js'
import Tache from './Tache.jsx'

const filters = [
  { value: 'all', label: 'Toutes' },
  { value: 'active', label: 'À faire' },
  { value: 'completed', label: 'Terminées' },
]

function ListTask() {
  const dispatch = useDispatch()
  const { items, filter } = useSelector((state) => state.tasks)
  const completedCount = items.filter((task) => task.isDone).length
  const visibleTasks = items.filter((task) => {
    if (filter === 'active') return !task.isDone
    if (filter === 'completed') return task.isDone
    return true
  })

  return (
    <section className="task-list-section" aria-labelledby="list-title">
      <div className="list-heading">
        <div>
          <p className="section-kicker">VOTRE ESPACE</p>
          <h2 id="list-title">Ma liste <span className="task-total">{items.length}</span></h2>
        </div>
        <div className="filter-tabs" role="group" aria-label="Filtrer les tâches">
          {filters.map((option) => (
            <button
              className={`filter-tab${filter === option.value ? ' filter-tab-active' : ''}`}
              type="button"
              key={option.value}
              aria-pressed={filter === option.value}
              onClick={() => dispatch(setFilter(option.value))}
            >
              {option.label}
              {option.value === 'completed' && completedCount > 0 && (
                <span className="filter-count">{completedCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {visibleTasks.length > 0 ? (
        <ul className="task-list">
          {visibleTasks.map((task) => <Tache key={task.id} task={task} />)}
        </ul>
      ) : (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">{filter === 'completed' ? '✓' : '✳'}</span>
          <h3>{items.length === 0 ? 'Un petit pas à la fois.' : 'Rien à afficher ici.'}</h3>
          <p>
            {items.length === 0
              ? 'Ajoutez votre première tâche et donnez forme à votre journée.'
              : filter === 'active'
                ? 'Toutes vos tâches sont terminées. Bien joué !'
                : 'Les tâches terminées apparaîtront ici.'}
          </p>
        </div>
      )}

      <footer className="list-footer">
        <span>{completedCount} terminée{completedCount !== 1 ? 's' : ''} sur {items.length}</span>
        <span className="progress-track" aria-label={`${items.length ? Math.round((completedCount / items.length) * 100) : 0}% des tâches terminées`}>
          <span style={{ width: `${items.length ? (completedCount / items.length) * 100 : 0}%` }} />
        </span>
      </footer>
    </section>
  )
}

export default ListTask
