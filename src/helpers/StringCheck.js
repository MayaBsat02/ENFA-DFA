export const checkString = (string, transitions, INITIAL_STATE) => {
    // Initialize the current state to INITIAL_STATE 
    let currentState = INITIAL_STATE;
    console.log("current state is",currentState)
    //loop on each character of string
    let currentchar = string.split("").map((char)=>{
        //take variable of reachable state
        console.log("transitions are",transitions)
        let data=transitions.filter((t)=>t.currentState==currentState && t.symbol==char);
        
        console.log("Data",data)
        
        const currentObject = new Object(...data);
    console.log("current object is",currentObject)
        
        // //changes the current state to where a character reached

        currentState=currentObject.nextStates;
        console.log(currentState)
        //save the current state toarray called currentState
        
    })
    if(currentState!='DEADSTATE')
    return currentState.replaceAll(",", "").replace(/[{}]/g, "");
    return currentState;

  };

  export const checkFinalState = (state, transitions,FINALSTATE) => {
    
    if(state.length>0){
    console.log("REULT STATE IS",state)
    // let result=state.map((s)=>{ 
      let currentStateObject = new Object(...transitions.filter(t => t.currentState.replaceAll(",", "").replace(/[{}]/g, "") == state))
      console.log("current state object is",currentStateObject)
      let newcurrState=currentStateObject.currentState.replaceAll(",", "").replace(/[{}]/g, "")
      
      console.log("NEW CURRENT IS",newcurrState,"and FINAL STATES S",FINALSTATE)
    //map state array to check if it contains final state
    
      if(FINALSTATE.includes(newcurrState)){
        return true

      }
      else
        return false;
    

  };
}