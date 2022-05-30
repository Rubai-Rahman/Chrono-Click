import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home/Home";
import Navigation from "./Pages/Shared/Navigation/Navigation";
import Shop from "./Pages/Shop/Shop";
import Order from "./Pages/Orders/Order";
import Notfound from "./Pages/Notfound/Notfound";
import Footer from "./Pages/Shared/Footer/Footer";
import SignUp from "./Pages/SignUp/SignUp";


function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/order" element={<Order />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
