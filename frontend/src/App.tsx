import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import UserProfile from "./pages/UserProfile";
import UserContext from "./context/UserContext";
import AdminPage from "./pages/OrdersPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import { PublicOnlyRoute } from "./auth/PublicRoute";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <UserContext>
      <Routes>
        <Route index path='/' element={<HomePage />} />
        <Route path='home' element={<HomePage />} />

        <Route element={<PublicOnlyRoute />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>

        {/* <Route
          path='admin'
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path='pedidos'
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route path='profile' element={<UserProfile />} />
      </Routes>
    </UserContext>
  );
}

export default App;
