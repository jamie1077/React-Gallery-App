import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => (
  <div>
    <ul>
      <li className="not-found">
        <h1>(404): Page Not Found</h1>
        <h3>Oh no..</h3>
        <Link to="/cats"></Link>
      </li>
  </ul>
  </div>
);

export default PageNotFound;