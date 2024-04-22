import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./components/AdminDashboard";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login"  element={<LoginForm/>} />
          <Route path="/admindashboard"  element={<AdminDashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
