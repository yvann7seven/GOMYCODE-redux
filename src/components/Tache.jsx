import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask, toggleTask, updateTask } from '../features/tasks/tasksSlice.js'

function Tache({ task }) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(task.description)

  function saveEdit(event) {
    event.preventDefault()
    const trimmedDescription = description.trim()
    if (!trimmedDescription) return

    dispatch(updateTask({ id: task.id, description: trimmedDescription }))
    setIsEditing(false)
  }

  function cancelEdit() {
    setDescription(task.description)
    setIsEditing(false)
  }

  return (
    <li className={`task-row${task.isDone ? ' task-row-done' : ''}`}>
      <button
        className="task-check"
        type="button"
        aria-label={task.isDone ? 'Marquer comme à faire' : 'Marquer comme terminée'}
        aria-pressed={task.isDone}
        onClick={() => dispatch(toggleTask(task.id))}
      >
        {task.isDone && <span aria-hidden="true">✓</span>}
      </button>

      {isEditing ? (
        <form className="edit-task-form" onSubmit={saveEdit}>
          <label className="sr-only" htmlFor={`edit-${task.id}`}>Modifier la tâche</label>
          <input
            id={`edit-${task.id}`}
            autoFocus
            maxLength={180}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button className="task-action save-action" type="submit" aria-label="Enregistrer">✓</button>
          <button className="task-action" type="button" onClick={cancelEdit} aria-label="Annuler">×</button>
        </form>
      ) : (
        <>
          <span className="task-description">{task.description}</span>
          <div className="task-actions">
            <button
              className="task-action"
              type="button"
              aria-label={`Modifier : ${task.description}`}
              onClick={() => setIsEditing(true)}
            >
              <span aria-hidden="true">✎</span>
            </button>
            <button
              className="task-action delete-action"
              type="button"
              aria-label={`Supprimer : ${task.description}`}
              onClick={() => dispatch(deleteTask(task.id))}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default Tache
