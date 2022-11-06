export const checkString = (string, transitions, INITIAL_STATE) => {
    // Initialize the current state to INITIAL_STATE 
    let currentState = INITIAL_STATE;
    //loop on each character of string
    let currentchar = string.split("").map((char)=>{
        //take variable of reachable state
        let data=transitions.filter((t)=>t.currentState==currentState);
        console.log("Data",data)
        
        
        // const currOjbect= new Object(...data);
        
        // //changes the current state to where a character reached

        // currentState=currOjbect[char];
        // console.log(currentState)
        // //save the current state toarray called current
        // return currentState.replaceAll(",", "");
    })
    return currentchar
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