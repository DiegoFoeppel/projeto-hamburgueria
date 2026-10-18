import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import UserProfile from "./pages/UserProfile";
import UserContext from "./context/UserContext";

import { PublicOnlyRoute } from "./auth/PublicRoute";
import CartContext from "./context/CartContext";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <UserContext>
      <CartContext>
        <Routes>
          <Route index path='/' element={<HomePage />} />
          <Route path='home' element={<HomePage />} />

          <Route element={<PublicOnlyRoute />}>
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
          </Route>

          <Route path='pedidos' element={<OrdersPage />} />

          {/* <Route
            path='pedidos'
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          /> */}

          <Route path='profile' element={<UserProfile />} />
        </Routes>
      </CartContext>
    </UserContext>
  );
}

export default App;
