import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css"
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'


const queryClient = new QueryClient();

const PUBLISHABLE_KEY ='pk_test_c2Vuc2libGUtdG9tY2F0LTUxLmNsZXJrLmFjY291bnRzLmRldiQ'

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
         <BrowserRouter
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>

    <App />
         </ClerkProvider>
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
