import React from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import FileInput from "./components/fileInput/FileInput";
import SandBox from "./components/SandBox";
import ProjectMenu from "./components/program/tabs/ProjectMenu";
import "./components/home/home.css"
import {Home} from "./components/home/Home";
import "./scss/well.css"
import Graphics from "./components/Graphics";

export default function App() {
    
    return (
        <Router>
            <div className={"app"}>
                <nav>
                    <ul className={"router"}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>

                        <li>
                            <Link to="/graphics">Graphics</Link>
                        </li>
                        <li>
                        <Link to="/sandbox">SandBox</Link>
                        </li>
                        <li>
                            <Link to="/fileInput">File Input</Link>
                        </li>
                    </ul>
                </nav>


                <Routes>
                    <Route path="/"
                           element={<Home/>}/>
                    <Route path="/graphics"
                           element={<Graphics/>}/>
                    <Route path="/users"
                           element={<ProjectMenu/>}/>
                    <Route path="/sandbox"
                           element={<SandBox/>}/>
                    <Route path="/fileInput"
                           element={<FileInput/>}/>
                </Routes>
            </div>
        </Router>
    );
}





