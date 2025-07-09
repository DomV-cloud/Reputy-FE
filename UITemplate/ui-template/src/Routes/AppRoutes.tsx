// src/routes/AppRoutes.tsx
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "../Components/Loaders/Loader";
import Layout from "../Components/Layout";
import Login from "../Components/LoginForm";
import ProtectedRoute from "./ProtectedRoutes";
import RegisterForm from "../Components/RegisterForm";
import SelectRolePage from "../Pages/SelectRolePage";

const Home = lazy(() => import("../Pages/HomePage/Home"));
const Advertisement = lazy(
  () => import("../Pages/Advertisement/AdvertisementsPage")
);
const AdvertisementDetail = lazy(
  () => import("../Pages/Advertisement/AdvertisementDetailPage")
);

const NotFound = lazy(
  () => import("../Pages/StatusPages/NotFoundPage/NotFound")
);

const AppRoutes = () => (
  <Router>
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Veřejné stránky */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SelectRolePage />} />
        <Route path="/register/:role" element={<RegisterForm />} />

        {/* Chráněné */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/advertisement"
          element={
            <ProtectedRoute>
              <Layout>
                <Advertisement />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/advertisement/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <AdvertisementDetail />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRoutes;
