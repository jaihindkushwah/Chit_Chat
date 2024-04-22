import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import { Toaster } from 'react-hot-toast';
import ChatProvider from './Context/ChatProvider';


function App() {
  return (
    <div className="App">
        <Toaster position='top-right'></Toaster>
        <BrowserRouter>
        <ChatProvider>
            <Routes>
              <Route path='/' element={<HomePage/>}></Route>
              <Route path='/chat' element={<ChatPage/>}></Route>
            </Routes>
          </ChatProvider>
        </BrowserRouter>
        
    </div>
  );
}

export default App;
