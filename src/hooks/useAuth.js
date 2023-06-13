import { useState, useEffect } from "react";
import { auth } from "../firebase";

export default function useAuth() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    // Listen for the user's authentication State changes
    const unsubscribe = auth.onAuthStateChanged((authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser);
      } else {
        setUser(null);
      }
    });

    // Unsubscribe from the auth listener on component unmount
    return unsubscribe;
  }, []);

  return { user };
}