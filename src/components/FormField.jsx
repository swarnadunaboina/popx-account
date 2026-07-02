import './FormField.css';

export default function FormField({
  label,
  required = false,
  id,
  error,
  ...inputProps
}) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-field__label">
        {label}
        {required && <span className="form-field__required">*</span>}
      </label>
      <input id={id} className="form-field__input" {...inputProps} />
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
}
