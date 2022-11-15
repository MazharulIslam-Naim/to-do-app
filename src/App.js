import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login"
import List from "./pages/list";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="list" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
