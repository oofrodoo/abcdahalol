import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Existing imports
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import AcceptableItems from "./pages/AcceptableItems";
import ListedItems from "./pages/ListedItems";
import FormPage from "./components/FormPage.jsx";
import PostsPage from "./components/PostsPage.jsx";
import AdminPage from "./components/AdminPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/event" element={<Events />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/donate" element={<Donate />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/admin" element={<AdminPage />} />
        <Route exact path="/acceptable-items" element={<AcceptableItems />} />
        <Route exact path="/listed-items" element={<ListedItems />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route exact path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}
