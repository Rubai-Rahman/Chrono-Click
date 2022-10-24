import React from "react";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Dashboard.css";
const Dashboard = () => {
  const {
    allContexts: { user, logOut, admin },
  } = useAuth();

  return (
    <div className="dashboard">
      <div className="drawer">
        <Link style={{ textDecoration: "none" }} to={`/dashboard/payment`}>
          <button className="drawer_button">Pay</button>
        </Link>
        <Link style={{ textDecoration: "none" }} to={`/dashboard/myOrders`}>
          <button className="drawer_button">My Order</button>
        </Link>
        <Link style={{ textDecoration: "none" }} to={`/dashboard/review`}>
          <button className="drawer_button">Review</button>
        </Link>
        {admin && (
          <>
            <Link
              style={{ textDecoration: "none" }}
              to={`/dashboard/manageOrders`}
            >
              <button className="drawer_button">Manage All Order</button>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to={`/dashboard/makeAdmin`}
            >
              <button className="drawer_button">Make Admin</button>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to={`/dashboard/addProduct`}
            >
              <button className="drawer_button">Add a Product</button>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to={`/dashboard/manageProduct`}
            >
              <button className="drawer_button">ManageProduct</button>
            </Link>
          </>
        )}

        <button className="drawer_button" onClick={logOut}>
          Log out
        </button>
      </div>
      <div className="outlet">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
