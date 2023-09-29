import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface UserState {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  firstName: string | null;
  setFirstName: Dispatch<SetStateAction<string | null>>;
  lastName: string | null;
  setLastName: Dispatch<SetStateAction<string | null>>;
  email: string | null;
  setEmail: Dispatch<SetStateAction<string | null>>;
}

export const UserContext = createContext<UserState>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  token: null,
  setToken: () => {},
  firstName: null,
  setFirstName: () => {},
  lastName: null,
  setLastName: () => {},
  email: null,

  setEmail: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");
    const storedEmail = localStorage.getItem("email");
    if (storedLoggedIn === "true") {
      setIsLoggedIn(true);
    }
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }

    if (storedLastName) {
      setLastName(storedLastName);
    }

    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", "true");
    } else {
      localStorage.removeItem("isLoggedIn");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (firstName) {
      localStorage.setItem("firstName", firstName);
    }
  }, [firstName]);

  useEffect(() => {
    if (lastName) {
      localStorage.setItem("lastName", lastName);
    }
  }, [lastName]);

  useEffect(() => {
    if (email) {
      localStorage.setItem("email", email);
    }
  }, [email]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
