import { AuthActionResponse, AuthProvider } from "@refinedev/core";
import { useUser, useClerk } from "@clerk/clerk-react";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      // Clerk manages the login process internally, typically using its own UI.
      // You can redirect users to the Clerk sign-in page.
      window.location.href = "/sign-in";
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message || "Login failed",
          name: "Login Error",
        },
      };
    }
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return { logout: true };
    }
    return { error };
  },
  check: async () => {
    const { isSignedIn } = useUser();

    if (isSignedIn) {
      return { authenticated: true };
    } else {
      return {
        authenticated: false,
        error: {
          message: "Authentication failed",
          name: "Not authenticated",
        },
        logout: true,
        redirectTo: "/sign-in",
      };
    }
  },
  getIdentity: async () => {
    const { user, isSignedIn } = useUser();

    if (isSignedIn && user) {
      const { id, username } = user;
      return { id, username };
    }

    return null;
  },
  logout: async () => {
    const { signOut } = useClerk();
    await signOut();
    return {
      success: true,
      redirectTo: "/sign-in",
    };
  },
};
