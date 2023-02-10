import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shuffle from './Suffled';
import '../App.css';
// import { fetchQuestionsAnswer } from '../services/API';

class MultipleQuestion extends Component {
  state = {
    correct: '',
    incorrect: [],
    shuffleAnswers: [],
    count: 0,
    resultApi: [],
    correctClass: 'correct-answer',
    wrongClass: 'wrong-answer',
    seconds: 30,
    disable: false,
  };

  componentDidMount() {
    this.fetchQuestionsAnswer();
    const ONE_SECOND = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, ONE_SECOND);

    console.log(this.intervalID);
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

  componentWillUnmount() {
    console.log('Vou desmontar');
    clearInterval(this.intervalID);
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
      return this.setState({ resultApi: result }, () => this.responseApi());
    }
  };

  responseApi = () => {
    const { count, resultApi } = this.state;

    const correct = resultApi[count].correct_answer;
    const incorrect = resultApi[count].incorrect_answers;
    const all = [...incorrect, correct];
    const shuffleAnswers = shuffle(all);
    this.setState({
      correct,
      incorrect,
      shuffleAnswers,
      category: resultApi[count].category,
      question: resultApi[count].question,
    });
  };

  onClick = () => {
    const { count } = this.state;
    const correct = document.querySelector('.correct-answer');
    const wrong = document.querySelectorAll('.wrong-answer');
    wrong.forEach((data) => data.classList.add('wrong'));
    /* wrong.classList.add('wrong'); */
    correct.classList.add('correct');
    this.setState({
      count: count + 1,
      /* correctClass: 'correct-answer correct',
      wrongClass: 'wrong-answer wrong', */
    });
  };

  render() {
    const {
      correct,
      incorrect,
      shuffleAnswers,
      question,
      category,
      correctClass,
      wrongClass,
      seconds,
      disable,
    } = this.state;
    return (
      <div>
        <h1 data-testid="question-category">{category}</h1>
        <h2 data-testid="question-text">{question}</h2>
        {/* <h3 data-testid="question-difficulty">{difficulty}</h3> */}
        <p>{seconds}</p>
        <div data-testid="answer-options">
          {
            shuffleAnswers.map((answer, i) => {
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
                    onClick={ () => this.onClick() }
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
                  onClick={ () => this.onClick() }
                >
                  {answer}
                </button>
              );
            })
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
    // difficulty: PropTypes.string,
  }),
}.isRequired;
export default connect()(MultipleQuestion);
