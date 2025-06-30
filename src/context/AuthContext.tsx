import type { User } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";
import supabase from "../utils/supabase";

export interface AuthContextType {
	user: User | null;
	signInWithGithub: () => void;
	signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const signInWithGithub = () => {
		supabase.auth.signInWithOAuth({ provider: "github" });
	};
	const signOut = () => {};
	return <AuthContext.Provider value={{ user, signInWithGithub, signOut }}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within the AuthProvider");
	}
	return context;
};
