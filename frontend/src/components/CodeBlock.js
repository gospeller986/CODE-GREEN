import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import "./Card.css";
import "./CodeBlock.css";

const CodeBlock = () => {
  const [code, setCode] = useState("// some comment");
  const [carbon, setCarbon] = useState({});
  const [suggest, setSuggest] = useState([]);
  const languages = ["python", "java", "cpp", "javascript"];
  const customthemes = ["light", "vs-dark"];
  const [presentLanguage, setPresentLanguage] = useState(languages[0]);
  const [presentTheme, setPresentTheme] = useState(customthemes[0]);

  const editorRef = useRef(null);
  function handleChange() {
    //logged the codes data in order to check in console

    //   console.log(editorRef.current?.getValue())
    setTimeout(() => {
      setCode(editorRef.current?.getValue());
    }, 1000);
  }

  function handleMount(editor) {
    editorRef.current = editor;
    editorRef.current.onDidChangeModelContent(handleChange);
  }
  const sendCode = {
    code: code,
    language : presentLanguage ,
  };

  const newurl = {
    url: "http://127.0.0.1:3333",
  };

  const handleSuggestion = async () => {
    const site = `http://localhost:5000/suggest`;
    await axios
      .post(site, sendCode)
      .then((response) => {
        setSuggest(response.data.suggestions);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleVisualize = async () => {
    const u = `http://localhost:5000/visualize`;
    await axios
      .post(u, newurl)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = async () => {
    const url = `http://localhost:5000/predict?code=${sendCode}`;
    setTimeout(() => {
      setCode(editorRef.current?.getValue());
    }, 2000);

    await axios
      .post(url, sendCode)
      .then(function (response) {
        setCarbon(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  return (
    <div className="container">
      <div className="container">
      <select  
              className="lang"
              value={presentLanguage}
              onChange={(e) => setPresentLanguage(e.target.value)}
            >
              {languages.map((value, i) => (
                <option value={value} key={i}>
                  {value}
                </option>
              ))}
            </select>

            <select className="lang"
              value={presentTheme}
              onChange={(e) => setPresentTheme(e.target.value)}
            >
              {customthemes.map((value, i) => (
                <option value={value} key={i}>
                  {value}
                </option>
              ))}
            </select>
      </div>
      <div className="container">
        {suggest.length !== 0 &&
          suggest.map((sug, i) => {
            return (
              <div className="alert alert-danger" role="alert" key={i}>
                {sug}
              </div>
            );
          })}
      </div>
      <div>
        <Editor
          height="50vh"
          width="80vw"
          theme={presentTheme}
          language={presentLanguage}
          onMount={handleMount}
          value={code}
        />
        <div className="container mb-4 ">
          <button
            className="btn btn-success mt-4 mb-4 m-3"
            onClick={handleClick}
          >
            Analyze Cabon Footprint{" "}
          </button>

          <button
            className="btn btn-success mt-4 mb-4 m-3"
            onClick={handleVisualize}
          >
            Prepare For Visualization
          </button>

          <a
            className="btn btn-info mt-4 mb-4 m-3 "
            target="_blank"
            rel="noreferrer"
            href="http://127.0.0.1:3333"
          >
            Visualize
          </a>

          <button className="btn btn-info m-3" onClick={handleSuggestion}>
            Suggest Optimisation
          </button>
       
        </div>
      </div>

      {carbon && (
        <div className="container">
          <div className="mb-3">
            <div className="col-md-10 mb-3">
              <div className="row ">
                <div className="col-xl-6 col-lg-6 mb-3 ">
                  <div className="card l-bg-cherry">
                    <div className="card-statistic-3 p-4">
                      <div className="card-icon card-icon-large">
                        <i className="fas fa-shopping-cart"></i>
                      </div>
                      <div className="mb-4">
                        <h5 className="card-title mb-0">Carbon Emmissions</h5>
                      </div>
                      <div className="row align-items-center mb-2 d-flex">
                        <div className="col-8">
                          <h2 className="d-flex align-items-center mb-0">
                            {carbon.emissions} Kg
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 mb-3">
                  <div className="card l-bg-blue-dark">
                    <div className="card-statistic-3 p-4">
                      <div className="card-icon card-icon-large">
                        <i className="fas fa-users"></i>
                      </div>
                      <div className="mb-4">
                        <h5 className="card-title mb-0">Execution Time</h5>
                      </div>
                      <div className="row align-items-center mb-2 d-flex">
                        <div className="col-8">
                          <h2 className="d-flex align-items-center mb-0">
                            {carbon.duration} secs
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 mb-3">
                  <div className="card l-bg-green-dark">
                    <div className="card-statistic-3 p-4">
                      <div className="card-icon card-icon-large">
                        <i className="fas fa-ticket-alt"></i>
                      </div>
                      <div className="mb-4">
                        <h5 className="card-title mb-0">Energy Consumed</h5>
                      </div>
                      <div className="row align-items-center mb-2 d-flex">
                        <div className="col-8">
                          <h2 className="d-flex align-items-center mb-0">
                            {carbon.energy_consumed} &nbsp; J{" "}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 mb-3 ">
                  <div className="card l-bg-orange-dark">
                    <div className="card-statistic-3 p-4">
                      <div className="card-icon card-icon-large">
                        <i className="fas fa-dollar-sign"></i>
                      </div>
                      <div className="mb-4">
                        <h5 className="card-title mb-0"> {presentLanguage} Version</h5>
                      </div>
                      <div className="row align-items-center mb-2 d-flex">
                        <div className="col-8">
                          <h2 className="d-flex align-items-center mb-0">
                           {/* {presentLanguage === 'cpp' ? 17 : `${carbon.python_version}` }  */}

                           { presentLanguage === 'cpp' && 
                             17
                           }
                           {
                            presentLanguage ==='javascript' && "ES2015"
                           }

                           {
                            presentLanguage === 'python' && `${carbon.python_version}`
                           }
  
                            version
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
