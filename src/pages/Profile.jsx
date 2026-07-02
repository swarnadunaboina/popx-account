import { useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAccount } from '../context/AccountContext';
import cameraIcon from '../assets/camera-icon.svg';
import avatarPlaceholder from '../assets/avatar-placeholder.png';
import './Profile.css';

export default function Profile() {
  const { account, updateAccount } = useAccount();
  const fileInputRef = useRef(null);

  if (!account) {
    return <Navigate to="/" replace />;
  }

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      updateAccount({ photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="app-frame profile">
      <header className="profile__header">Account Settings</header>

      <section className="profile__card">
        <div className="profile__user-info">
          <div className="profile__avatar-wrap">
            <img
              src={account.photo || avatarPlaceholder}
              alt={`${account.fullName}'s avatar`}
              className="profile__avatar"
            />
            <button
              type="button"
              className="profile__avatar-edit"
              onClick={handlePhotoClick}
              aria-label="Change profile photo"
            >
              <img src={cameraIcon} alt="" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handlePhotoChange}
            />
          </div>

          <div className="profile__identity">
            <h2 className="profile__name">{account.fullName}</h2>
            <p className="profile__email">{account.email}</p>
          </div>
        </div>

        <p className="profile__bio">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
          Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam
          Erat, Sed Diam
        </p>
      </section>
    </div>
  );
}
