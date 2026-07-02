import { useNavigate } from 'react-router-dom';
import './Welcome.css';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="app-frame welcome">
      <div className="welcome__content">
        <h1 className="welcome__title">Welcome to PopX</h1>
        <p className="welcome__subtitle">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <button
          type="button"
          className="welcome__btn welcome__btn--primary"
          onClick={() => navigate('/signup')}
        >
          Create Account
        </button>
        <button
          type="button"
          className="welcome__btn welcome__btn--secondary"
          onClick={() => navigate('/login')}
        >
          Already Registered? Login
        </button>
      </div>
    </div>
  );
}
