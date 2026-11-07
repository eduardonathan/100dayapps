import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NewWinePage } from "./pages/NewWinePage";
import { WineDetailPage } from "./pages/WineDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wines/new" element={<NewWinePage />} />
        <Route path="/wines/:id" element={<WineDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
