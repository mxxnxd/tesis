
const POSITIVE =  1;
const NEUTRAL  =  0;
const NEGATIVE = -1;





const state = {
    user: {
        symptoms: {
            fever: 1,
            dyspnea: 0,
            cough: 1,
        },
        age: 22,
    },
    agent: {
        next_action: null,
    }
}




async function check_copd(state) {
    const symptoms = ['dyspnea', 'cough'];
    const length = symptoms.length;
    let remain = [];
    let hits = 0;

    for (i = 0; i < length; i++) {
        if (state.user.symptoms[symptoms[i]] == 1) {
            hits++;
        } else {
            remain.push(symptoms[i]);
        }
    }
    return [hits, remain];
};







async function main() {


    console.log(await check_copd(state));
}

main();

