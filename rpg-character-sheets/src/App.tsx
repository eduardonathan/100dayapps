import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { NewCharacterPage } from "./pages/NewCharacterPage";
import { CharacterDetailPage } from "./pages/CharacterDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters/:id" element={<CharacterDetailPage />} />
          <Route path="/characters/new" element={<NewCharacterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
