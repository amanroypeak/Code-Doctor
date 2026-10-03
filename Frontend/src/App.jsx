import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Results from "./pages/Results";
import Scan from "./pages/Scan";
import Navbar from "./components/Navbar";

function App(){
    return(
        <div className="min-h-screen bg-slate-900 text-slate-100">
           
        <BrowserRouter>
         <Navbar/>
        <Routes>
            <Route path = "/" element ={<Home/>} />
            <Route path = "/auth" element={<Auth/>} />
            <Route path = "/dashboard" element = {<Dashboard/>} />
            <Route path = "/results" element = {<Results/>} />
            <Route path = "/scan" element = {<Scan/>} />
            <Route path="/results/:id" element={<Results />} />



        </Routes>
        </BrowserRouter>
        </div>
    )
}

export default App