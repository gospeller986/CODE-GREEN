import React from "react";

import Base from "./Base";
import robot from "../assets/animation.gif";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Base title="Home Page" description="My home page">
        <div className="container">
          {/* <div className="main">
            <div className="container">
              <div className="tex">
                <h1>
                  <strong>
                    UnLeashing the Power <br />
                    of AI
                  </strong>
                </h1>
              </div>
            </div>
            <div className="container">
              <div className="vec">
                <img src={robot} alt="robot" className="img" />
              </div>
            </div>
          </div> */}
          <div className="container">
            <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
              <div className=" mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
                <div className="my-3 py-3">
                  <div className="tex">
                    <h1 className="title">
                      <strong>
                        UnLeashing the Power <br />
                        of <span className="span" >AI</span>
                      </strong>
                      <br/>
                      <br/>
                      <br/>
                      <div className="container m-4 ">
                        <h3 className="title-new">Code <span className="span" >Green</span>  Code Clean</h3>
                      </div>
                    </h1>
                  </div>
                </div>
                <div className="bg-light box-shadow mx-auto"></div>
              </div>
              <div className=" mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                <div className="my-3 p-3">
                  <div className="vec">
                    <img src={robot} alt="robot" className="img" />
                  </div>
                </div>
                <div className="bg-dark box-shadow mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
};

export default Home;
