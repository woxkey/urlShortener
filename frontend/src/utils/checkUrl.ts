export const checkHttpUrl = (url: string) => {
  let givenURL;
  try {
    givenURL = new URL(url);
  } catch (error) {
    console.log('error is', error);
    return false;
  }
  return givenURL.protocol === 'http:' || givenURL.protocol === 'https:';
};
