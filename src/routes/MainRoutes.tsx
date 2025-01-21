import { Route, Routes } from 'react-router'
import Home from '../pages/Home'
import TaskListView from '../pages/TaskListView'

function MainRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route  path='/taskListView' element={<TaskListView />}/>
    </Routes>
)
}

export default MainRoutes