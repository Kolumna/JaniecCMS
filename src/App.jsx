import Header from "./components/layout/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/content/Home";
import Pages from "./pages/aside/Pages";
import Aside from "./components/layout/Aside";
import AddCourse from "./pages/courses/AddCourse";
import Courses from "./pages/courses/Courses";
import Quizy from "./pages/quizy/Quizy";
import AddQuiz from "./pages/quizy/AddQuiz";
import EditQuiz from "./pages/quizy/EditQuiz";
import Add from "./pages/aside/Add";
import EditCourse from "./pages/courses/EditCourse";

function App() {
  return (
    <Router>
      <Header />
      <main className="d-flex">
        <Aside />
        <section
          style={{ width: "100%" }}
          className="d-flex justify-content-center p-5"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start" element={<Pages />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/add" element={<AddCourse />} />
            <Route path="/courses/edit/:id" element={<EditCourse />} />
            <Route path="/quizy" element={<Quizy />} />
            <Route path="/quizy/add" element={<AddQuiz />} />
            <Route path="/quizy/edit/:id" element={<EditQuiz />} />
            <Route path="/add" element={<Add />} />
          </Routes>
        </section>
      </main>
    </Router>
  );
}

export default App;
