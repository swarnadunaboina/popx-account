# PopX

A pixel-perfect React clone of the PopX mobile onboarding flow: Welcome →
Create Account → Login → Account Settings (profile), with client-side
validation and a working profile photo upload.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL — the mobile screen is centered on the page.

Build for production:

```bash
npm run build
npm run preview
```

## How it works

- **Routing** — `react-router-dom` (`HashRouter`) drives navigation between
  `/`, `/signup`, `/login`, and `/profile`.
- **State** — `src/context/AccountContext.jsx` holds the signed-up user's
  details (name, email, phone, company, photo) in React context and mirrors
  it to `localStorage`, so a page refresh doesn't lose the session.
- **Sign up** (`/signup`) — Full Name, Phone, Email, Password, Company Name,
  and an Agency yes/no radio group, each validated on submit. On success the
  account is saved and the user is taken straight to their profile.
- **Login** (`/login`) — the button stays disabled (matching the design)
  until a valid email and a password are entered. On submit it checks the
  entered email against the account created during sign up.
- **Profile** (`/profile`) — shows the signed-up user's name and email, and
  lets them tap the camera badge on the avatar to upload a new photo (read
  via `FileReader`, stored as a data URL). This route redirects to Welcome
  if no account exists yet.

## Project structure

```
src/
  components/       Reusable UI (labeled input field)
  context/            AccountContext (session state + localStorage)
  pages/              Welcome, SignUp, Login, Profile (+ styles)
  assets/             Camera icon, default avatar image
```

## Design tokens

| Token              | Value                     |
| ------------------ | ------------------------- |
| Screen background   | `rgba(247, 248, 249, 1)`  |
| Border              | `rgba(203, 203, 203, 1)`  |
| Text                | `rgba(29, 34, 38, 1)`     |
| Primary (purple)    | `rgba(108, 37, 255, 1)`   |
| Surface / white     | `rgba(255, 255, 255, 1)`  |
| Hairline shadow     | `rgba(0, 0, 0, 0.03)`     |
| Font                | Rubik (400/500/600/700)   |
