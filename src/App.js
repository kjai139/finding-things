
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
        <Route path='/finding-things' exact element={<Homepage />} />
        <Route path='/finding-things/:id' element={<NsixtyfourStage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
