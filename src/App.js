import React from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './Routes/Routes';
import { initializeLocalStorage } from './components/localStorageBootstrap'; // Import the bootstrap function
initializeLocalStorage();


function App() {
  return (
          <>
              <BrowserRouter  future={{ v7_startTransition: true,  v7_relativeSplatPath: true }}>
                <AppRoutes />
              </BrowserRouter>
          </>
    
  );
}

export default App;
