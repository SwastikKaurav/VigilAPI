import { Route, Routes } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import DetailPage from "./Pages/DetailPage"

export default function App(){
  return(
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/endpoints/:id" element={<DetailPage/>}/>
    </Routes>
  )
}