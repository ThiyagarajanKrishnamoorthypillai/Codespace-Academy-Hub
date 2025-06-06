let loaderCallback = null;

export const registerLoaderHandler = (callback) => {
  loaderCallback = callback;
};

export const showGlobalLoader = () => {
  if (loaderCallback) loaderCallback(true);
};

export const hideGlobalLoader = () => {
  if (loaderCallback) loaderCallback(false);
};
