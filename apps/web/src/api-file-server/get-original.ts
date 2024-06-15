const baseURL = process.env.REACT_APP_FILE_SERVER_URL;

export const getOriginal = (src?: string) => {
  if (!src) {
    return undefined;
  }
  return `${baseURL}/${src}`;
};
