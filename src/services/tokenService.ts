let accessToken: string | null = null;

export const setToken = (token: string) => {
  accessToken = token;
};

export const getToken = () => accessToken;

export const clearToken = () => {
  accessToken = null;
};
