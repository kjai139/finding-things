
import './App.css';
import { FireLogin } from './Components/FireLogin';
import { Homepage } from './Components/Homepage';
import { NsixtyfourStage } from './Components/NsixtyfourStage';
import { TopNav } from './Components/TopNav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/N64' element={<NsixtyfourStage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
