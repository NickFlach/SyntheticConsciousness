const SPACE_CHILD_AUTH_URL = import.meta.env.VITE_SPACE_CHILD_AUTH_URL || 'https://spacechild.love';
const APP_SUBDOMAIN = 'synthetic-consciousness';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  emailVerified: boolean;
}

interface AuthResult {
  success: boolean;
  user?: User;
  tokens?: AuthTokens;
  error?: string;
}

class SpaceChildAuthClient {
  private tokens: AuthTokens | null = null;
  private user: User | null = null;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('space-child-auth');
      if (stored) {
        const data = JSON.parse(stored);
        this.tokens = data.tokens;
        this.user = data.user;
      }
    } catch (e) {
      console.error('Failed to load auth from storage:', e);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('space-child-auth', JSON.stringify({
        tokens: this.tokens,
        user: this.user
      }));
    } catch (e) {
      console.error('Failed to save auth to storage:', e);
    }
  }

  private clearStorage() {
    localStorage.removeItem('space-child-auth');
    this.tokens = null;
    this.user = null;
  }

  async register(email: string, password: string, name?: string): Promise<AuthResult> {
    try {
      const response = await fetch(`${SPACE_CHILD_AUTH_URL}/api/space-child-auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, app: APP_SUBDOMAIN })
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.error || 'Registration failed' };
      }

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  }

  async login(email: string, password: string): Promise<AuthResult> {
    try {
      const response = await fetch(`${SPACE_CHILD_AUTH_URL}/api/space-child-auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, app: APP_SUBDOMAIN })
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }

      this.tokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresAt: Date.now() + (data.expiresIn * 1000)
      };
      this.user = data.user;
      this.saveToStorage();

      return { success: true, user: data.user, tokens: this.tokens };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  }

  async logout(): Promise<void> {
    if (this.tokens) {
      try {
        await fetch(`${SPACE_CHILD_AUTH_URL}/api/space-child-auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.tokens.accessToken}`
          }
        });
      } catch (e) {
        console.error('Logout request failed:', e);
      }
    }
    this.clearStorage();
  }

  async refreshToken(): Promise<boolean> {
    if (!this.tokens?.refreshToken) return false;

    try {
      const response = await fetch(`${SPACE_CHILD_AUTH_URL}/api/space-child-auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: this.tokens.refreshToken })
      });

      if (!response.ok) {
        this.clearStorage();
        return false;
      }

      const data = await response.json();
      this.tokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresAt: Date.now() + (data.expiresIn * 1000)
      };
      this.saveToStorage();
      return true;
    } catch (error) {
      this.clearStorage();
      return false;
    }
  }

  async getUser(): Promise<User | null> {
    if (!this.tokens) return null;

    if (Date.now() >= this.tokens.expiresAt - 60000) {
      const refreshed = await this.refreshToken();
      if (!refreshed) return null;
    }

    try {
      const response = await fetch(`${SPACE_CHILD_AUTH_URL}/api/space-child-auth/user`, {
        headers: {
          'Authorization': `Bearer ${this.tokens.accessToken}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.clearStorage();
        }
        return null;
      }

      const data = await response.json();
      this.user = data.user;
      this.saveToStorage();
      return this.user;
    } catch (error) {
      return null;
    }
  }

  getAccessToken(): string | null {
    return this.tokens?.accessToken || null;
  }

  isAuthenticated(): boolean {
    return !!this.tokens && Date.now() < this.tokens.expiresAt;
  }

  getCachedUser(): User | null {
    return this.user;
  }

  initiateSSO(): void {
    const callbackUrl = `${window.location.origin}/sso/callback`;
    window.location.href = `${SPACE_CHILD_AUTH_URL}/api/space-child-auth/sso/authorize?app=${APP_SUBDOMAIN}&callback=${encodeURIComponent(callbackUrl)}`;
  }

  async handleSSOCallback(code: string): Promise<AuthResult> {
    try {
      const response = await fetch(`${SPACE_CHILD_AUTH_URL}/api/space-child-auth/sso/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, app: APP_SUBDOMAIN })
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.error || 'SSO verification failed' };
      }

      this.tokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresAt: Date.now() + (data.expiresIn * 1000)
      };
      this.user = data.user;
      this.saveToStorage();

      return { success: true, user: data.user, tokens: this.tokens };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  }
}

export const spaceChildAuth = new SpaceChildAuthClient();
export type { User, AuthTokens, AuthResult };
