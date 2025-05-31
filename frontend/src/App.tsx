import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import Register from './pages/Register'
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import ResendVerificationCode from './pages/ResendVerificationCode';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<Register/>} />
          <Route path="verify-email" element={<VerifyEmail/>} />
          <Route path="resend-verification-code" element={<ResendVerificationCode/>} />
          <Route path="login" element={<Login/>} />
          <Route path="forgot-password" element={<ForgotPassword/>} />
          <Route path="reset-password/:token" element={<ResetPassword/>} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 5000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "350px",
            padding: "16px 15px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default App