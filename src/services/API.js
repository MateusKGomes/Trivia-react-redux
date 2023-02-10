const TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const createToken = async () => {
  const returnFetch = await fetch(TOKEN);
  const data = await returnFetch.json();
  const returnToken = await data.token;
  await localStorage.setItem('token', returnToken);
};

// export const

// const token = localStorage.getItem('token');
// if (!token) {
//   const { history } = this.props;
//   history.push('/');
// }
// const questions = await getQuestions(token);
// const questionsJson = await questions.json();
// if (questionsJson.response_code === 0)
