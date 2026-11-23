import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../features/tasks/tasksSlice.js'

function createTaskId() {
  return globalThis.crypto?.randomUUID?.()
    ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function AddTask() {
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedDescription = description.trim()
    if (!trimmedDescription) return

    dispatch(addTask({
      id: createTaskId(),
      description: trimmedDescription,
      isDone: false,
    }))
    setDescription('')
  }

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-task">Nouvelle tâche</label>
      <span className="add-task-icon" aria-hidden="true">＋</span>
      <input
        id="new-task"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Ajouter une tâche à votre liste..."
        maxLength={180}
      />
      <button className="add-task-button" type="submit" disabled={!description.trim()}>
        Ajouter <span aria-hidden="true">↗</span>
      </button>
    </form>
  )
}

export default AddTask
