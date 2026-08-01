let started = false;

exports.startQuiz = () => {
    started = true;
};

exports.stopQuiz = () => {
    started = false;
};

exports.hasStarted = () => {
    return started;
};