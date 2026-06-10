import { Outlet } from "react-router-dom";
import Aside from "./components/Aside";
import "./App.css";

function App() {
  return (
    <div className="app-layout">
      {}
      <Aside /> 
      
      <main className="content-area">
        {}
        <Outlet />
      </main>
    </div>
  );
}

export default App;