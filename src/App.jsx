import { Route, Routes } from "react-router-dom"
import Dashboard from "./assets/pages/Dashboard"

function App() {
 

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App
