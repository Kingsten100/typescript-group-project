import React, { createContext, useContext, useState } from "react";
import type { User } from "../types/types";

// Sample users - simulate being logged in as one of these
const sampleUsers: User[] = [
  {
    id: "user-1",
    username: "CurrentUser",
    email: "currentuser@example.com"
  },
  {
    id: "user-2",
    username: "TestUser",
    email: "testuser@example.com"
  },
  {
    id: "user-3",
    username: "ForumUser",
    email: "forumuser@example.com"
  }
];

type UserContextType = {
  currentUser: User;
  switchUser: (userId: string) => void;
  availableUsers: User[];
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to the first sample user
  const [currentUser, setCurrentUser] = useState<User>(sampleUsers[0]);

  const switchUser = (userId: string) => {
    const user = sampleUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, switchUser, availableUsers: sampleUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
};
