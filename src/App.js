import "./App.css";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import About from "./components/about/About";
import Home from "./components/home/Home";
import NotFound from "./components/notFound/NotFound";
import FlashCards from "./components/card/FlashCards";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import { useAuthContext } from "./hooks/useAuthContext";
import Admin from "./components/admin/admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route
              path="login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="profile"
              element={!!user ? <Profile /> : <Navigate to="/" />}
            />
            <Route
              path="admin"
              element={!!user ? <Admin /> : <Navigate to="/" />}
            />
            <Route path="flashCards/:id" element={<FlashCards />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
}

export default App;
