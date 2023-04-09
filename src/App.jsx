import Header from "./components/layout/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/content/Home";
import Pages from "./pages/aside/Pages";
import Aside from "./components/layout/Aside";

function App() {
  return (
    <Router>
      <Header />
      <main className="d-flex">
        <Aside />
        <section
          style={{ width: "100%" }}
          className="d-flex justify-content-center p-2 py-5"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start" element={<Pages />} />
          </Routes>
        </section>
      </main>
    </Router>
  );
}

export default App;
