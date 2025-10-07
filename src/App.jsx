import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetails";
import AddCourse from "./pages/AddCourse";
import MyEnrollments from "./pages/MyEnrollments";
import CourseStudents from "./pages/CourseStudents";
import Recommendations from "./pages/Recommendations";
import ProtectedRoute from "./components/ProtectedRoute";
import EditCourse from "./pages/EditCourse";

function App() {
  return (
    <Router>
      <div className="container mx-auto ">
        <Navbar />
        <Routes>
          {/* public paths */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />

          {/* Protected for instructors */}
          <Route
            path="/courses/add"
            element={
              <ProtectedRoute allowedRoles={["instructor", "admin"]}>
                <AddCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:id/edit"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <EditCourse />
              </ProtectedRoute>
            }
          />

          {/* Protected for students */}
          <Route
            path="/enrollments/me"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <MyEnrollments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommendations"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Recommendations />
              </ProtectedRoute>
            }
          />
          {/* Protected for instructors/admins */}
          <Route
            path="/courses/:id/students"
            element={
              <ProtectedRoute allowedRoles={["instructor", "admin"]}>
                <CourseStudents />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
