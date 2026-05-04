import LoginPanel from "./components/Login/Login.jsx";
import { Routes, Route } from "react-router-dom";
import RegisterPanel from "./components/Register/Register.jsx";
import Dealers from './components/Dealers/Dealers.jsx';
import Dealer from "./components/Dealers/Dealer.jsx"; 
import PostReview from "./components/Dealers/PostReview.jsx";
import Home from "./components/home.jsx";
import Home1 from "./components/home1.jsx";
import Contact from "./components/Contact.jsx";
import About from "./components/about.jsx";
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/home1" element={<Home1 />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<RegisterPanel />} />
      <Route path="/dealers" element={<Dealers/>} />
      <Route path="/dealer/:id" element={<Dealer/>} />
      <Route path="/postreview/:id" element={<PostReview/>} />
    </Routes>
  );
}
export default App;
