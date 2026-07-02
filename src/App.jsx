import { HashRouter, Routes, Route } from 'react-router-dom';
import { AccountProvider } from './context/AccountContext';
import Welcome from './pages/Welcome';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';

export default function App() {
  return (
    <AccountProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </HashRouter>
    </AccountProvider>
  );
}
