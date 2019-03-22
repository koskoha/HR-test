function Quiz(questions) {
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.questionIndex++;
        return true;
    }

    return false;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

Quiz.prototype.getAnswerIndex = function() {
    return this.getQuestionIndex().getAnswerIndex();
}
