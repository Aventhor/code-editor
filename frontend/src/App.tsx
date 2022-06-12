import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LobbyPage } from "./pages/lobby.page";
import { CodePage } from "./pages/code.page";
import { useAuth } from "./hooks/useAuth";

import "rsuite/dist/rsuite.min.css";

function App() {
  useAuth({ autoGenerate: true });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<LobbyPage />} />
          <Route path="/code" element={<CodePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
