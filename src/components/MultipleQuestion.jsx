import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Shuffled from './Shuffled';
import '../App.css';
import { actionScore } from '../redux/actions';
// import Shuffled from './Shuffled';
// import { fetchQuestionsAnswer } from '../services/API';

class MultipleQuestion extends Component {
  state = {
    correct: '',
    incorrect: [],
    shuffledAnswers: [],
    count: 0,
    resultApi: [],
    correctClass: 'correct-answer',
    wrongClass: 'wrong-answer',
    seconds: 30,
    disable: false,
    difficulty: '',
    hidden: true,
  };

  componentDidMount() {
    this.fetchQuestionsAnswer();
    const ONE_SECOND = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, ONE_SECOND);
  }

  componentDidUpdate(_prevProps, prevState) {
    const TIME_LIMIT_IN_SECONDS = 1;

    if (prevState.seconds === TIME_LIMIT_IN_SECONDS) {
      this.setState({
        disable: true,
      }, () => {
        clearInterval(this.intervalID);
      });
    }
  }

  fetchQuestionsAnswer = async () => {
    const { history } = this.props;
    const getToken = localStorage.getItem('token');
    const fechApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const json = await fechApi.json();
    const result = json.results;
    const three = 3;
    if (json.response_code === three) {
      console.log(history);
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ resultApi: result }, () => this.responseApi());
    }
  };

  responseApi = () => {
    const { count, resultApi } = this.state;
    const correct = resultApi[count].correct_answer;
    const incorrect = resultApi[count].incorrect_answers;
    const all = [...incorrect, correct];
    const shuffledAnswers = Shuffled(all);
    if (!correct) {
      return;
    }
    this.setState({
      correct,
      incorrect,
      shuffledAnswers,
      category: resultApi[count].category,
      question: resultApi[count].question,
      difficulty: resultApi[count].difficulty,
    });
  };

  onClick = (target) => {
    const { count, difficulty, seconds } = this.state;
    const correct = document.querySelector('.correct-answer');
    const wrong = document.querySelectorAll('.wrong-answer');
    wrong.forEach((data) => data.classList.add('wrong'));
    correct.classList.add('correct');
    this.setState((prevState) => ({
      count: count + 1,
      seconds: prevState.seconds,
      disable: true,
      hidden: false,
    }), () => {
      clearInterval(this.intervalID);
    });
    const { dispatch, score } = this.props;
    let difficultyValue = 0;
    const three = 3;
    const ten = 10;
    if (target.className === 'correct-answer correct') {
      if (difficulty === 'hard') {
        difficultyValue = three;
      } else if (difficulty === 'medium') {
        difficultyValue = 2;
      } else {
        difficultyValue = 1;
      }
      const totalScore = score + (ten + (seconds * difficultyValue));
      dispatch(actionScore(totalScore));
    } else {
      dispatch(actionScore(score));
    }
  };

  nextQuestion = () => {
    const correct = document.querySelector('.correct-answer');
    const wrong = document.querySelectorAll('.wrong-answer');
    wrong.forEach((data) => data.classList.remove('wrong'));
    correct.classList.remove('correct');
    const max = 5;
    const { count } = this.state;
    if (count === max) {
      const { history } = this.props;
      history.push('/feedback');
    } else {
      this.fetchQuestionsAnswer();
      this.setState({
        disable: false,
        hidden: true,
      });
    }
  };

  render() {
    const {
      correct,
      incorrect,
      shuffledAnswers,
      question,
      category,
      correctClass,
      wrongClass,
      seconds,
      disable,
      hidden,
    } = this.state;
    return (
      <div>
        <h1 data-testid="question-category">{category}</h1>
        <h2 data-testid="question-text">{question}</h2>
        <p>{seconds}</p>
        <div data-testid="answer-options">
          {
            shuffledAnswers.map((answer, i) => {
              if (answer === correct) {
                return (
                  <button
                    type="button"
                    className={ correctClass }
                    id=""
                    disabled={ disable }
                    name="correct-answer"
                    data-testid="correct-answer"
                    key={ i }
                    onClick={ ({ target }) => this.onClick(target) }
                  >
                    {answer}
                  </button>
                );
              }
              const index = incorrect.indexOf(answer);
              return (
                <button
                  type="button"
                  className={ wrongClass }
                  id=""
                  disabled={ disable }
                  name={ `wrong-answer-${index}` }
                  data-testid={ `wrong-answer-${index}` }
                  key={ i }
                  onClick={ ({ target }) => this.onClick(target) }
                >
                  {answer}
                </button>
              );
            })
          }
          {
            hidden ? null : (
              <button
                data-testid="btn-next"
                type="button"
                name="next"
                onClick={ () => this.nextQuestion() }
              >
                Next
              </button>
            )
          }
        </div>
      </div>
    );
  }
}

MultipleQuestion.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  question: PropTypes.shape({
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    category: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(MultipleQuestion);
