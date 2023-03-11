export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type JwtPayload = {
  user: {
    userId: string;
    email: string;
    access: string;
    iat: number;
    exp: number;
    refreshToken?: string;
  };
};
