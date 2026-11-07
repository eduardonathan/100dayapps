import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NewMemberPage } from "./pages/NewMemberPage";
import { MembershipDetailPage } from "./pages/MembershipDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/members/:id" element={<MembershipDetailPage />} />
        <Route path="/members/new" element={<NewMemberPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
