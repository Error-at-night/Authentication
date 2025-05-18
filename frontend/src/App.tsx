import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<Register/>} />
        <Route path="login" element={<h1>Register</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
