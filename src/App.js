import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home/Home";
import Navigation from "./Pages/Shared/Navigation/Navigation";

import Order from "./Pages/Orders/Order";
import Notfound from "./Pages/Notfound/Notfound";
import Footer from "./Pages/Shared/Footer/Footer";
import SignUp from "./Pages/SignUp/SignUp";
import AuthProvider from "./Contexts/AuthProvider/AuthProvider";
import LogIn from "./Pages/LogIn/LogIn";
import PrivateRoute from "./Pages/PrivateRoute/PrivateRoute";
import ProductDetails from "./Pages/Details/ProductDetails/ProductDetails";
import Shop from "./Pages/Shop/Shop/Shop";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route
              path="/order"
              element={
                <PrivateRoute>
                  <Order />
                </PrivateRoute>
              }
            ></Route>

            <Route exact path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route
              exact
              path="/products/:productId"
              element={<ProductDetails />}
            />

            <Route path="*" element={<Notfound />} />
          </Routes>

          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
