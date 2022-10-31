class NFA{
    constructor(initialState,finalStates,states,alphabet,transitions){

        if (!(typeof initialState === "string" || initialState instanceof String))
            throw new Error("Expected a single initial state (string)");

        if(!Array.isArray(finalStates)){
            console.warn("finalStates should be an array")
            //make final states in an array
            let arr = [];
            arr.push(finalStates.toString());
            finalStates = arr;
        }

        if (!Array.isArray(alphabet)) {
            console.warn("Expected alphabet in NFA to be an array");
            let arr = [];
            arr.push(alphabet.toString());
            alphabet = arr;
          }
      
        if (!Array.isArray(transitions)) {
            console.warn("Expected transitions in NFA to be an array");
            let arr = [];
            arr.push(transitions);
            transitions = arr;
        }

        this.initialState='q1';
        this.finalStates=['q3'];
        this.alphabet=['0','1'];
        this.states=['q1','q2','q3'];
        this.transitions=[
            {
                "state": "q1",
                "nextStates": [
                    "q1",
                    "q2",
                    "q3"
                ],
                "symbol": "1"
            },
            {
                "state": "q1",
                "nextStates": [
                    "q2",
                    "q3"
                ],
                "symbol": "0"
            },
            {
                "state": "q2",
                "nextStates": [
                    "q3"
                ],
                "symbol": "1"
            },
            {
                "state": "q2",
                "nextStates": [
                    "q2",
                    "q3"
                ],
                "symbol": "0"
            },
            {
                "state": "q3",
                "nextStates": [
                    "q3"
                ],
                "symbol": "1"
            },
            {
                "state": "q3",
                "nextStates": [
                    "q3"
                ],
                "symbol": "0"
            }
        ];
    }
}

class Transitions{
    constructor(state,nextStates,symbol){
        if (!(typeof state === "string" || state instanceof String))
            throw new Error("Expected a single state (string)");

        if (!Array.isArray(nextStates)) {
            console.warn("Expected nextStates in transition to be an array");
            let arr = [];
            arr.push(nextStates.toString());
            nextStates = arr;
        }

        if (!(typeof symbol === "string" || symbol instanceof String))
            throw new Error("Expected a string symbol");

    this.state = state;
    this.nextStates = nextStates;
    this.symbol = symbol;
     console.log(this)   
    }
}