import { useState, useEffect, useCallback } from 'react';
import { spaceChildAuth, User, AuthResult } from '../lib/space-child-auth';

interface UseSpaceChildAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, password: string, name?: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  initiateSSO: () => void;
  handleSSOCallback: (code: string) => Promise<AuthResult>;
  refreshUser: () => Promise<void>;
}

export function useSpaceChildAuth(): UseSpaceChildAuthReturn {
  const [user, setUser] = useState<User | null>(spaceChildAuth.getCachedUser());
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(spaceChildAuth.isAuthenticated());

  useEffect(() => {
    const loadUser = async () => {
      if (spaceChildAuth.isAuthenticated()) {
        const fetchedUser = await spaceChildAuth.getUser();
        setUser(fetchedUser);
        setIsAuthenticated(!!fetchedUser);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    const result = await spaceChildAuth.login(email, password);
    if (result.success && result.user) {
      setUser(result.user);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
    return result;
  }, []);

  const register = useCallback(async (email: string, password: string, name?: string): Promise<AuthResult> => {
    setIsLoading(true);
    const result = await spaceChildAuth.register(email, password, name);
    setIsLoading(false);
    return result;
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    await spaceChildAuth.logout();
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);
  }, []);

  const initiateSSO = useCallback((): void => {
    spaceChildAuth.initiateSSO();
  }, []);

  const handleSSOCallback = useCallback(async (code: string): Promise<AuthResult> => {
    setIsLoading(true);
    const result = await spaceChildAuth.handleSSOCallback(code);
    if (result.success && result.user) {
      setUser(result.user);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
    return result;
  }, []);

  const refreshUser = useCallback(async (): Promise<void> => {
    const fetchedUser = await spaceChildAuth.getUser();
    setUser(fetchedUser);
    setIsAuthenticated(!!fetchedUser);
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    initiateSSO,
    handleSSOCallback,
    refreshUser
  };
}

export default useSpaceChildAuth;
