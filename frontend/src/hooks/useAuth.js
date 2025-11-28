import { useAuthContext } from "../../contexts/AuthContext";

export default function useAuth() {
  const { user, login, logout } = useAuthContext();
  return { user, login, logout };
}
