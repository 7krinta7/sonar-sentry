import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Launch from './pages/Launch/Launch'
import DetectionResults from './pages/DetectionResults/DetectionResults'
import Reports from './pages/Reports/Reports'
import Settings from './pages/Settings/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Launch />} />
        <Route path="/results" element={<DetectionResults />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}
