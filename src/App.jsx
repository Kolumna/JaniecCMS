import Header from "./components/layout/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
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
import AuthContext from "./context/authContext";
import { useState } from "react";
import Login from "./pages/auth/Login";
import Modules from "./pages/modules/Modules";
import AddModule from "./pages/modules/AddModule";

function App() {
  const [auth, setAuth] = useState({
    isAuth: false,
    user: null,
  });

  return (
    <Router>
      <AuthContext.Provider
        value={{
          user: auth.user,
          login: (user) => setAuth({ isAuth: true, user }),
          logout: () => setAuth({ isAuth: false, user: null }),
        }}
      >
        <Header />
        <main className="d-flex">
          {auth.isAuth && <Aside />}
          <section
            style={{ width: "100%" }}
            className="d-flex justify-content-center p-5"
          >
            <Routes>
              <Route
                path="/login"
                element={auth.isAuth ? <Navigate to="/" /> : <Login />}
              />
              {auth.isAuth ? (
                <>
                  {" "}
                  <Route path="/" element={<Home />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/add" element={<AddCourse />} />
                  <Route path="/courses/edit/:id" element={<EditCourse />} />
                  <Route
                    path="/courses/edit/:courseName/:id"
                    element={<EditCourse />}
                  />
                  <Route path="/quizy" element={<Quizy />} />
                  <Route path="/quizy/add" element={<AddQuiz />} />
                  <Route path="/quizy/edit/:id" element={<EditQuiz />} />
                  <Route path="/modules" element={<Modules />} />
                  <Route path="/modules/add" element={<AddModule />} />
                  <Route path="/modules/edit/:id" element={<EditQuiz />} />
                  <Route path="/add" element={<Add />} />
                </>
              ) : (
                <Route path="/*" element={<Navigate to="/login" />} />
              )}
            </Routes>
          </section>
        </main>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
