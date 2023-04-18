import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllProjects from './pages/AllProjects'
import MyProjects from './pages/MyProjects'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import CreateProject from './pages/CreateProject'
import JoinProject from './pages/JoinProject'
import HwAvailability from './pages/HwAvailability'
import 'bootstrap/dist/css/bootstrap.min.css'
import './stylesheet.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SignIn/>} />
        <Route exact path="/sign-in" element={<SignIn/>} />
        <Route exact path="/sign-up" element={<SignUp/>} />
        {/* <Route exact path="/view-all-projects" element={<AllProjects/>} /> */}
        <Route exact path="/view-my-projects" element={<MyProjects/>} />
        <Route exact path="/create-project" element={<CreateProject/>} />
        <Route exact path="/join-project" element={<JoinProject/>} />
        <Route exact path="/view-all-availability" element={<HwAvailability/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;