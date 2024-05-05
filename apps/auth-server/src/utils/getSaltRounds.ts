export const getSaltRounds = () => {
  const saltRoundsFromEnv = Number(process.env.SALT_ROUNDS);
  if (saltRoundsFromEnv && !Number.isNaN(saltRoundsFromEnv)) {
    return saltRoundsFromEnv;
  }
  return 10;
};
