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
import Payment from "./Pages/Payment/Payment";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MakeAdmin from "./Pages/Dashboard/Makeadmin/MakeAdmin";
import MyOrders from "./Pages/Dashboard/MyOrders/MyOrders";
import AddProduct from "./Pages/Dashboard/AddProduct/AddProduct";
import Review from "./Pages/Dashboard/Review/Review";
import ManageOrders from "./Pages/Dashboard/ManageOrders/ManageOrders";
import AdminRoute from "./Pages/AdminRoute/AdminRoute";
import ManageProduct from "./Pages/Dashboard/ManageProduct/ManageProduct";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/order"
              element={
                <PrivateRoute>
                  <Order />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              {/* Dashboard */}

              <Route
                path={`/dashboard/makeAdmin`}
                element={
                  <AdminRoute>
                    <MakeAdmin />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path={`/dashboard/myOrders`}
                element={<MyOrders />}
              ></Route>
              <Route path={`/dashboard/payment`} element={<Payment />}></Route>
              <Route
                path={`/dashboard/addProduct`}
                element={
                  <AdminRoute>
                    <AddProduct />
                  </AdminRoute>
                }
              ></Route>
              <Route path={`/dashboard/review`} element={<Review />}></Route>
              <Route
                path={`/dashboard/manageOrders`}
                element={
                  <AdminRoute>
                    <ManageOrders />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path={`/dashboard/manageProduct`}
                element={
                  <AdminRoute>
                    <ManageProduct />
                  </AdminRoute>
                }
              ></Route>
            </Route>

            {/* End DashBoard  */}

            <Route path="/shop" element={<Shop />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/dashboard" element={<Dashboard />} />
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
