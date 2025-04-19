
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Employees from "./user"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='container'>
          <Routes> 
            <Route path="/" element={<Employees></Employees>} ></Route> 
          </Routes>
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default App;