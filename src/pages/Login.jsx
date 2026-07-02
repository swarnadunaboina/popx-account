import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import { useAccount } from '../context/AccountContext';
import './Login.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const navigate = useNavigate();
  const { loginAccount } = useAccount();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isValid = EMAIL_PATTERN.test(email.trim()) && password.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    const result = loginAccount(email, password);
    if (!result.success) {
      setError(result.error);
      return;
    }

    setError('');
    navigate('/profile');
  };

  return (
    <div className="app-frame login">
      <form className="login__content" onSubmit={handleSubmit} noValidate>
        <h1 className="login__title">
          Signin to your
          <br />
          PopX account
        </h1>
        <p className="login__subtitle">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>

        <FormField
          id="login-email"
          label="Email Address"
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormField
          id="login-password"
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="login__error">{error}</p>}

        <button
          type="submit"
          className="login__submit"
          disabled={!isValid}
        >
          Login
        </button>
      </form>
    </div>
  );
}
