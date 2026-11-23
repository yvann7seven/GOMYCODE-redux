import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  filter: 'all',
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      state.items.unshift(action.payload)
    },
    updateTask(state, action) {
      const task = state.items.find((item) => item.id === action.payload.id)
      if (task) task.description = action.payload.description
    },
    toggleTask(state, action) {
      const task = state.items.find((item) => item.id === action.payload)
      if (task) task.isDone = !task.isDone
    },
    deleteTask(state, action) {
      state.items = state.items.filter((task) => task.id !== action.payload)
    },
    setFilter(state, action) {
      state.filter = action.payload
    },
  },
})

export const { addTask, updateTask, toggleTask, deleteTask, setFilter } = tasksSlice.actions
export default tasksSlice.reducer
