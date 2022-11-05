export const checkString = (string, transitions, INITIAL_STATE) => {
    // Initialize the current state to INITIAL_STATE 
    let currentState = INITIAL_STATE;
    //loop on each character of string
    let current = string.split("").map((char)=>{
        //take variable of reachable state
        let data=transitions.filter((t)=>t.currentState==currentState);
        
        const currOjbect= new Object(...data);
        
        //changes the current state to where a character reached

        currentState=currOjbect[char];
        console.log(currentState)
        //save the current state toarray called current
        return currentState.replaceAll(",", "");
    })
    return current
  };

  export const checkFinalState = (state, DFA) => {
    if (state){
      let currentState = new Object(...DFA.filter(e => e.variable.replaceAll(",","") == state[state.length - 1]))
      return currentState.final
    }
    // return FINAL_STATES.map((fState) => {
    //   console.log(fState)
    // });
  };