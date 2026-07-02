import { createContext, useContext, useEffect, useState } from 'react';

const AccountContext = createContext(null);

const ACCOUNTS_STORAGE_KEY = 'popx_accounts';
const ACTIVE_ACCOUNT_STORAGE_KEY = 'popx_active_account';
const LEGACY_STORAGE_KEY = 'popx_account';

function readStoredAccounts() {
  try {
    const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch {
    // Ignore storage errors.
  }

  try {
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    return legacy ? [JSON.parse(legacy)] : [];
  } catch {
    return [];
  }
}

function readActiveAccount(accounts) {
  try {
    const storedEmail = localStorage.getItem(ACTIVE_ACCOUNT_STORAGE_KEY);
    if (storedEmail) {
      const match = accounts.find(
        (item) => item.email?.toLowerCase() === storedEmail.toLowerCase()
      );
      if (match) return match;
    }
  } catch {
    // Ignore storage errors.
  }

  return accounts[0] || null;
}

/**
 * Provides the current user's account details (created via the sign up
 * screen) to the rest of the app, and keeps it in sync with localStorage
 * so a refresh doesn't lose the session.
 */
export function AccountProvider({ children }) {
  const [accounts, setAccounts] = useState(() => readStoredAccounts());
  const [account, setAccount] = useState(() => readActiveAccount(readStoredAccounts()));

  useEffect(() => {
    try {
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
    } catch {
      // Ignore storage errors (e.g. private browsing quota).
    }
  }, [accounts]);

  useEffect(() => {
    try {
      if (account?.email) {
        localStorage.setItem(ACTIVE_ACCOUNT_STORAGE_KEY, account.email);
      } else {
        localStorage.removeItem(ACTIVE_ACCOUNT_STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors (e.g. private browsing quota).
    }
  }, [account]);

  const createAccount = (data) => {
    const normalizedEmail = (data.email || '').trim().toLowerCase();
    const duplicate = accounts.some(
      (existing) => existing.email?.toLowerCase() === normalizedEmail
    );

    if (duplicate) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const nextAccount = { ...data, email: data.email.trim() };
    setAccounts((prev) => [...prev, nextAccount]);
    setAccount(nextAccount);
    return { success: true, account: nextAccount };
  };

  const updateAccount = (patch) => {
    if (!account) return;

    const updatedAccount = { ...account, ...patch };
    setAccount(updatedAccount);
    setAccounts((prev) =>
      prev.map((existing) =>
        existing.email?.toLowerCase() === account.email.toLowerCase()
          ? updatedAccount
          : existing
      )
    );
  };

  const loginAccount = (email, password) => {
    const normalizedEmail = (email || '').trim().toLowerCase();
    const target = accounts.find(
      (existing) => existing.email?.toLowerCase() === normalizedEmail
    );

    if (!target) {
      return {
        success: false,
        error: 'We could not find an account with that email.',
      };
    }

    if (target.password && target.password !== password.trim()) {
      return {
        success: false,
        error: 'Password is incorrect. Please try again.',
      };
    }

    setAccount(target);
    return { success: true, account: target };
  };

  const logout = () => setAccount(null);

  return (
    <AccountContext.Provider
      value={{ account, accounts, createAccount, updateAccount, loginAccount, logout }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return ctx;
}
