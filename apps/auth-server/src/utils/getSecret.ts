export const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw Error("Secret is missing");
  }
  return secret;
};
