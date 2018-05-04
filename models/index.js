const Sequelize = require ('sequelize');
const sequelize = new Sequelize("sqlite:quizzes.sqlite", {logging : false});

sequelize.define('quiz', {
    question : {
        type: Sequelize.STRING,
        unique: {msg: "Ya existe esta pregunta"},
        validate: {notEmpty: {msg : "La pregunta no puede estar vacía"}}
    },
    answer: {
        type: Sequelize.STRING,
        validate: {notEmpty: {msg: "La pregunta no puede estar vacía"}}
    }
});

sequelize.sync()
    .then(() => sequelize.models.quiz.count())
    .then(count => {
        if (!count) {
            return sequelize.models.quiz.bulkCreate([
                { question: "Capital de Italia", answer: "Roma"},
                { question: "Capital de Francia", answer: "París"},
                { question: "Capital de España", answer: "Madrid"},
                { question: "Capital de Portugal", answer: "Lisboa"},
            ]);
        }
    })
    .catch(error => {
        console.log(error);
    });

module.exports = sequelize;

const fs = require("fs");

let quizzes = [];


const load = () => {
    fs.readFile(DBFILENAME, (err, data) => {
        if (err)
            throw  err;

        if (data) {
            let json = JSON.parse(data);
            if (json)
                quizzes = json;
        }
    })
};

const save = () => {
    fs.writeFile(DBFILENAME, JSON.stringify(quizzes), err => {
        if (err)
            throw err;
    })
};

const count = () => {
    return quizzes.length;
};

const findById = (id) => {
    if (id > quizzes.length - 1 || id < 0)
        throw new Error("caca");

    return JSON.parse(JSON.stringify(quizzes[id]));
};

const removeById = id => {
    if (id > quizzes.length - 1 || id < 0)
        throw new Error("caca");

    quizzes.splice(id, 1);

    save();
};

const add = (quiz) => {
    quizzes.push(
        {question: quiz.question.trim(),
            answer: quiz.answer.trim()}
    );

    save();

};

const update = (id, question, answer) => {
    const quiz = quizzes[id];

    if (typeof quiz === "undefined") {
        throw new Error("malo");
    }

    quiz.splice(id, 1, {
        question: question,
        answer: answer
    });

    save();


};
