import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header></Header>
      <div className='height-30'></div>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='*' element={<HomePage></HomePage>}></Route>
      </Routes>
    </>
  );
}

export default App;
