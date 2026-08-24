import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Launch from './pages/Launch/Launch'
import DetectionResults from './pages/DetectionResults/DetectionResults'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Launch />} />
        <Route path="/results" element={<DetectionResults />} />
      </Routes>
    </BrowserRouter>
  )
}
