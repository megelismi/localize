export const getServer = (url, successAction, errorAction) => dispatch => {
  return fetch(url)
  .then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  }).then(res => {
    dispatch(successAction(res));
  }).catch(err => {
    dispatch(errorAction(err));
  });
};
