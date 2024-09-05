import axiosInstance from '../../axiosInstance';

interface AuthProvider {
  isAuthenticated: boolean;
  username: null | string;
  signin(username: string, password: string): Promise<void>;
  signout(): Promise<void>;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

/**
 * This auth provider will handle real authentication and store the token.
 */
export const authProvider: AuthProvider = {
  isAuthenticated: !!localStorage.getItem('access_token'), // Initialize from storage
  username: localStorage.getItem('username') || null,

  async signin(username: string, password: string) {
    // Call your login API and get the token
    const data = new URLSearchParams({
      grant_type: 'password',
      username,
      password,
    });

    const response = await axiosInstance.post<AuthResponse>(
      '/oauth/token',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: import.meta.env.VITE_CLIENT_ID ?? 'myClient',
          password: import.meta.env.VITE_CLIENT_SECRET ?? 'password',
        },
      }
    );

    const { access_token } = response.data;

    // Store the token and user details
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('username', username);

    // Set default headers for axios to include the bearer token
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${access_token}`;

    this.isAuthenticated = true;
    this.username = username;
  },

  async signout() {
    // Remove the token and clear the user state
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    delete axiosInstance.defaults.headers.common['Authorization'];

    this.isAuthenticated = false;
    this.username = null;
  },
};
