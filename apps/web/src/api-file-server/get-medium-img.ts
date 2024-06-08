const baseURL = process.env.REACT_APP_FILE_SERVER_URL;

export const getMediumImg = (imgSrc?: string) => {
  if (!imgSrc) {
    return undefined;
  }
  return `${baseURL}/images/${imgSrc}/medium`;
};
