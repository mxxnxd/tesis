class Disease {
    constructor(name, symptoms) {
        this.name = name;
        this.symptoms = symptoms;
    };
};

class Symptom {
    constructor(type, value) {
        this.type = type;
        if (value !== undefined) {
            this.value = value;
        }
    };
};

class Action {
    constructor(type, topic, subtopic, subsubtopic) {
        this.type = type;
        this.topic = topic;
        if (subtopic !== undefined) {
            this.subtopic = subtopic;
        }

        if (subsubtopic !== undefined) {
            this.subsubtopic = subsubtopic;
        }
    };
    string() {
        return `${this.type}-${this.topic}-${this.subtopic}-${this.subsubtopic}`;
    }
};

module.exports = {
    Disease,
    Symptom,
    Action
}