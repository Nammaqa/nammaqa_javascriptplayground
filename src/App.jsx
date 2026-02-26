import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Runner from './Runner'
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Runner/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
