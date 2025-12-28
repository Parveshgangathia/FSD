import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import PageSkeleton from "./components/PageSkeleton";

/* -------- Lazy Loaded Pages -------- */
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));

const DashboardLayout = lazy(() => import("./pages/DashboardLayout"));
const Overview = lazy(() => import("./pages/dashboard/Overview"));
const Projects = lazy(() => import("./pages/dashboard/Projects"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));
const AdminDashboard = lazy(() =>
  import("./pages/dashboard/AdminDashboard")
);

function App() {
  return (
    <Layout>
      {/* Suspense wraps ALL lazy routes */}
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          {/* -------- Public Routes -------- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          {/* -------- Unauthorized -------- */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* -------- Admin Route -------- */}
          <Route
            path="/admin"
            element={
              <RoleRoute allowed={["admin"]}>
                <AdminDashboard />
              </RoleRoute>
            }
          />

          {/* -------- Protected Dashboard (Nested) -------- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="overview" element={<Overview />} />
            <Route path="projects" element={<Projects />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* -------- 404 -------- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
