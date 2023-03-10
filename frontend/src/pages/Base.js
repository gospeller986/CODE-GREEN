import React from "react";
import Navbar from "../components/Navbar";



const Base = ({
  title = "My title",
  description = "My Desc",

  children,
}) => {
 
  return (
    <div>
     
       <Navbar/>
    
       
       
      <div className="container-fluid">
        <div className="main">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Base;
