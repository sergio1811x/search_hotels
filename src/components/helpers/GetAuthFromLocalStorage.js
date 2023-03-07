export const getAuthFromLS = () => {
  const local = localStorage.getItem('Auth');
  const auth = JSON.parse(local);
  return {
    auth,
  };
};
