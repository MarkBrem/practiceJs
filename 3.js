const config = {
    questions: [
      {
        id: "q1",
        text: "Який ваш сімейний стан?",
        answers: [
          { text: "Неодружений/Неодружена", next: "q2" },
          { text: "Одружений/Заміжня", next: "q3" }
        ]
      },
      {
        id: "q2",
        text: "Чи плануєте одружитися наступного року?",
        answers: [
          { text: "Так", next: null },
          { text: "Ні", next: null }
        ]
      },
      {
        id: "q3",
        text: "Як довго ви перебуваєте у шлюбі?",
        answers: [
          { text: "Менше року", next: null },
          { text: "Більше року", next: "q4" }
        ]
      },
      {
        id: "q4",
        text: "Чи святкували ви річницю першого року шлюбу?",
        answers: [
          { text: "Так", next: null },
          { text: "Ні", next: null }
        ]
      }
    ]
  };
  
  class Questionnaire {
    constructor(config) {
      this.questions = config.questions.reduce((map, q) => {
        map[q.id] = q;
        return map;
      }, {});
      this.currentQuestionId = Object.keys(this.questions)[0];
      this.answers = [];
    }
  
    getCurrentQuestion() {
      return this.questions[this.currentQuestionId];
    }
  
    answerQuestion(answerText) {
      const currentQuestion = this.getCurrentQuestion();
      this.answers.push({ [currentQuestion.text]: answerText });
      const nextQuestionId = currentQuestion.answers.find(a => a.text === answerText).next;
      this.currentQuestionId = nextQuestionId;
  
      if (!nextQuestionId) {
        this.showResult();
      } else {
        this.render();
      }
    }
  
    render() {
      const currentQuestion = this.getCurrentQuestion();
      const questionContainer = document.getElementById('question-container');
      questionContainer.innerHTML = `
        <div class="question">${currentQuestion.text}</div>
        <div class="answers">
          ${currentQuestion.answers.map(a => `
            <button onclick="window.questionnaire.answerQuestion('${a.text}')">${a.text}</button>
          `).join('')}
        </div>
      `;
    }
  
    showResult() {
      const questionContainer = document.getElementById('question-container');
      const resultContainer = document.getElementById('result');
      questionContainer.innerHTML = '';
      resultContainer.innerHTML = `
        <div>Ваші відповіді:</div>
        <ul>
          ${this.answers.map(a => `<li>${Object.keys(a)[0]}: ${Object.values(a)[0]}</li>`).join('')}
        </ul>
      `;
    }
  }
  window.questionnaire = new Questionnaire(config);
  window.questionnaire.render();
  