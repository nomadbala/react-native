import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export type User = {
  username: string;
  password: string;
  email: string;
  avatarUri?: string;
  creditCard?: {
    number: string;
    expiryDate: string;
    cvv: string;
  };
};

interface AuthContextType {
  isLoggedIn: boolean;
  currentUser: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    username: string,
    password: string,
    email: string
  ) => Promise<void>;
  updateAvatar: (uri: string) => Promise<void>;
  addCreditCard: (cardInfo: {
    number: string;
    expiryDate: string;
    cvv: string;
  }) => Promise<void>;
  removeCreditCard: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (loggedIn === "true") {
        const user = await AsyncStorage.getItem("currentUser");
        if (user) {
          setCurrentUser(JSON.parse(user));
        }
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    AsyncStorage.removeItem("isLoggedIn");
    AsyncStorage.removeItem("currentUser");
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, null, {
        params: { username, password },
      });
      const user = response.data;
      setCurrentUser(user);
      setIsLoggedIn(true);
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("currentUser", JSON.stringify(user));
    } catch (error) {
      throw new Error("Invalid username or password");
    }
  };

  const register = async (
    username: string,
    password: string,
    email: string
  ) => {
    try {
      await axios.post(`${API_URL}/register`, null, {
        params: { username, password, email },
      });
    } catch (error) {
      throw new Error("Registration failed");
    }
  };

  const updateAvatar = async (uri: string) => {
    if (currentUser) {
      try {
        const response = await axios.post(`${API_URL}/update-avatar`, null, {
          params: { username: currentUser.username, avatarUri: uri },
        });
        setCurrentUser(response.data);
        await AsyncStorage.setItem(
          "currentUser",
          JSON.stringify(response.data)
        );
      } catch (error) {
        throw new Error("Failed to update avatar");
      }
    }
  };

  const addCreditCard = async (cardInfo: {
    number: string;
    expiryDate: string;
    cvv: string;
  }) => {
    if (currentUser) {
      try {
        const response = await axios.post(`${API_URL}/add-credit-card`, null, {
          params: { username: currentUser.username, ...cardInfo },
        });
        setCurrentUser(response.data);
        await AsyncStorage.setItem(
          "currentUser",
          JSON.stringify(response.data)
        );
      } catch (error) {
        throw new Error("Failed to add credit card");
      }
    }
  };

  const removeCreditCard = async () => {
    if (currentUser) {
      try {
        const response = await axios.post(
          `${API_URL}/remove-credit-card`,
          null,
          {
            params: { username: currentUser.username },
          }
        );
        setCurrentUser(response.data);
        await AsyncStorage.setItem(
          "currentUser",
          JSON.stringify(response.data)
        );
      } catch (error) {
        throw new Error("Failed to remove credit card");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        login,
        logout,
        register,
        updateAvatar,
        addCreditCard,
        removeCreditCard,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
