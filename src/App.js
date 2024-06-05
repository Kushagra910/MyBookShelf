
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import MyBookShelf from './pages/MyBookShelf';


function App() {
  return (
    <div className='w-screen min-h-screen bg-black'>
       <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/bookShelf" element={<MyBookShelf/>}/>
          <Route path='*' element={<div className='text-2xl font-extrabold leading-4 text-gray-600'>ERROR 404 | NOT FOUND</div>}/>
       </Routes>
    </div>
  );
}

export default App;
