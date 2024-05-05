export const getTokenExpiration = () => {
  return process.env.TOKEN_EXPIRATION ?? "21600s";
};
