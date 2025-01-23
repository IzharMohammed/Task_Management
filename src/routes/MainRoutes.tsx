import { Route, Routes } from 'react-router'
import Home from '../pages/Home'
import TaskListView from '../pages/TaskListView'
import { AuthProvider } from '../context/AuthContext'

function MainRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/taskListView' element={<TaskListView />} />
      </Routes>
    </AuthProvider>
  )
}

export default MainRoutes