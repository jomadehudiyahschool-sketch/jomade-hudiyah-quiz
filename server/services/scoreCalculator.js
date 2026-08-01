const Competition = require("../models/Competition");

async function calculateScore(timer, timeUsed, correct) {

    const settings = await Competition.findOne();

    const deductionPerTenth =
        settings?.deductionPerTenth || 1;

    const wrongMark =
        settings?.wrongMark || 15;

    if (!correct) {

        return wrongMark;

    }

    const deductions = Math.floor(
        timeUsed * 10
    ) * deductionPerTenth;

    let score = 100 - deductions;

    if (score < 0) {

        score = 0;

    }

    if (score > 100) {

        score = 100;

    }

    return score;

}

async function timeoutScore() {

    const settings = await Competition.findOne();

    return settings?.unansweredMark || 10;

}

module.exports = {

    calculateScore,

    timeoutScore

};