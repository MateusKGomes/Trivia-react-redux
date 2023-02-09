export const createToken = async () => {
  const returnFetch = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await returnFetch.json();
  const returnToken = await data.token;
  await localStorage.setItem('token', returnToken);
};
