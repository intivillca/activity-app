const baseURL = process.env.REACT_APP_FILE_SERVER_URL;

export const getAvatar = (imgSrc?: string) => {
  if (!imgSrc) {
    return undefined;
  }
  return `${baseURL}/${imgSrc}/small`;
};
