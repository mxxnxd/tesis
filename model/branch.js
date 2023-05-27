const facts = {
    symptoms: {
        fever: true
    },
    diseases: {

    }
};


class Disease {
    constructor(name, symptoms) {
        this.name = name;
        this.symptoms = symptoms;
    };
};

class Solution {
    constructor(questions, diagnosis) {
        this.possible_questions = questions;
        this.possible_diagnosis = diagnosis;
    };
};

const COPD = new Disease('COPD', ['fever', 'cough', 'dyspnea', 'wheeze']);
const ASTHMA = new Disease('ASTHMA', ['headaches', 'cough', 'dyspnea', 'wheeze']);
const PNEUMONIA = new Disease('PNEUMONIA', ['cough', 'dyspnea', 'fever']);

const possibleQuestions = ['fever', 'cough', 'dyspnea', 'headaches', 'wheeze'];

/* 
    Get list of possible diseases based on current symptoms
*/
function possibleDiseases(facts) {
    const diseases = [COPD, ASTHMA, PNEUMONIA];
    diseases.forEach(disease => {
        disease.symptoms.forEach(symptom => {
            if (facts.symptoms[symptom] || facts.symptoms[symptom] === undefined) {
                facts.diseases[disease.name] = true;
            } else {
                delete facts.diseases[disease.name];
            }
        });
    });
    return Object.keys(facts.diseases);
};

function branch(initialQuestions, initialFacts) {
    var next_action = null;
    var queue = [];
    queue.push(new Solution(initialQuestions, possibleDiagnosis(initialFacts)));

    while (queue.length == 0) {
        var current_solution = queue.pop();

        if (0 < current_solution.possible_diagnosis.length) { // Not Empty
            if (next_action == null)


            



         } else {

         }
    };
};




console.log(possibleDiseases(facts));








// # function branch_and_bound(initial_questions):
// #     best_solution = null
// #     queue = [(initial_questions, all_possible_diagnoses())]

// #     while queue is not empty:
// #         current_questions, current_diagnoses = queue.pop(0)
// #         if current_diagnoses is empty:
// #             # Found a complete solution
// #             if best_solution is null or current_questions < best_solution:
// #                 best_solution = current_questions
// #         else:
// #             # Divide the solution space
// #             left_questions, left_diagnoses, right_questions, right_diagnoses = divide(current_questions, current_diagnoses)
// #             # Evaluate left subset
// #             if left_diagnoses is not empty and is_potentially_better(left_questions, left_diagnoses, best_solution):
// #                 queue.append((left_questions, left_diagnoses))
// #             # Evaluate right subset
// #             if right_diagnoses is not empty and is_potentially_better(right_questions, right_diagnoses, best_solution):
// #                 queue.append((right_questions, right_diagnoses))

// #     return best_solution
