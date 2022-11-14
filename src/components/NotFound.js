import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div>
          <h1 className="mt-5">
              <Link to="/" className="text-decoration-none text-white">Parolingizni kiriting</Link>
          </h1>
        </div>
    );
};

export default NotFound;