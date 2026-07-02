import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import { useAccount } from '../context/AccountContext';
import './SignUp.css';

const INITIAL_FORM = {
  fullName: '',
  phone: '',
  email: '',
  password: '',
  company: '',
  isAgency: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUp() {
  const navigate = useNavigate();
  const { createAccount } = useAccount();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    let value = e.target.value;
    if (field === 'phone') {
      // Allow digits only and limit to 10 characters
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const next = {};
    const trimmedEmail = form.email.trim();
    const phoneDigits = (form.phone || '').replace(/\D/g, '').trim();

    if (!form.fullName.trim()) next.fullName = 'Full name is required';
    if (!phoneDigits) next.phone = 'Phone number is required';
    else if (phoneDigits.length !== 10)
      next.phone = 'Phone number must be 10 digits';
    if (!trimmedEmail) next.email = 'Email address is required';
    else if (!EMAIL_PATTERN.test(trimmedEmail))
      next.email = 'Enter a valid email address';
    if (!form.password.trim()) next.password = 'Password is required';
    else if (form.password.length < 6)
      next.password = 'Password must be at least 6 characters';
    if (!form.isAgency) next.isAgency = 'Please select an option';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = createAccount({
      fullName: form.fullName.trim() || 'PopX User',
      phone: form.phone.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      company: form.company.trim(),
      isAgency: form.isAgency,
      photo: null,
    });

    if (!result.success) {
      setErrors((prev) => ({ ...prev, email: result.error }));
      return;
    }

    navigate('/profile');
  };

  return (
    <div className="app-frame signup">
      <form className="signup__content" onSubmit={handleSubmit} noValidate>
        <h1 className="signup__title">Create your PopX account</h1>

        <FormField
          id="fullName"
          label="Full Name"
          required
          type="text"
          placeholder="Enter your full name"
          value={form.fullName}
          onChange={handleChange('fullName')}
          error={errors.fullName}
        />

        <FormField
          id="phone"
          label="Phone number"
          required
          type="tel"
          placeholder="Enter your phone number"
          value={form.phone}
          onChange={handleChange('phone')}
          error={errors.phone}
        />

        <FormField
          id="email"
          label="Email address"
          required
          type="email"
          placeholder="Enter your email address"
          value={form.email}
          onChange={handleChange('email')}
          error={errors.email}
        />

        <FormField
          id="password"
          label="Password"
          required
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange('password')}
          error={errors.password}
        />

        <FormField
          id="company"
          label="Company Name"
          placeholder="Enter your company name"
          value={form.company}
          onChange={handleChange('company')}
        />

        <div className="signup__agency">
          <span className="signup__agency-label">
            Are you an Agency?<span className="signup__required">*</span>
          </span>
          <div className="signup__agency-options">
            <label className="signup__radio">
              <input
                type="radio"
                name="isAgency"
                value="yes"
                checked={form.isAgency === 'yes'}
                onChange={handleChange('isAgency')}
              />
              <span className="signup__radio-mark" />
              Yes
            </label>
            <label className="signup__radio">
              <input
                type="radio"
                name="isAgency"
                value="no"
                checked={form.isAgency === 'no'}
                onChange={handleChange('isAgency')}
              />
              <span className="signup__radio-mark" />
              No
            </label>
          </div>
          {errors.isAgency && (
            <span className="form-field__error">{errors.isAgency}</span>
          )}
        </div>

        <div className="signup__spacer" />

        <button type="submit" className="signup__submit">
          Create Account
        </button>
      </form>
    </div>
  );
}
