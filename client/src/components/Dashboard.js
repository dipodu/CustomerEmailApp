import React, { Component } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <div className="fixed-action-btn">
        <Link
          to="/survey/new"
          class="btn-floating btn-large waves-effect waves-light red"
        >
          <i class="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
