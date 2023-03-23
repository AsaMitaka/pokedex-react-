import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

export const FavContext = createContext();

function Main() {
  const [favItem, setFavItem] = useState([]);

  return (
    <BrowserRouter>
      <FavContext.Provider value={{ favItem, setFavItem }}>
        <App />
      </FavContext.Provider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
