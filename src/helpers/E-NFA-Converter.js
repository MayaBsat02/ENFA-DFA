let LAST_COMPLETED_STEP_COUNT = 0;
export const toDotString=(nfa)=> {
  let dotStr = "digraph fsm {\n";
  dotStr += "rankdir=LR;\n";
  dotStr += 'size="8,5";\n';
  dotStr += "node [shape = point]; INITIAL_STATE\n";
  dotStr += "node [shape = doublecircle]; " + nfa.finalStates.join(",") + ";\n";
  dotStr += "node [shape = circle];\n";
  dotStr += "INITIAL_STATE -> " + formatDotState(nfa.initialState) + ";\n";

  for (let i = 0; i < nfa.transitions.length; i++) {
    let t = nfa.transitions[i];

    dotStr +=
      "" +
      formatDotState(t.currentState) +
      " -> " +
      formatDotState(t.nextStates) +
      " [label=" +
      t.symbol +
      "];\n";
  }

  dotStr += "}";

  return dotStr;
}

function formatDotState(state_str) {
  state_str = state_str.toString();
  if (isMultiState(state_str)) {
    state_str = state_str.substring(1, state_str.length - 1);
    state_str = state_str.replace(/,/g, "");
    return state_str;
  } else {
    return state_str;
  }
}



export const getEpsilonClosureNFA = (nfa) => {
  let hasEpsilon = false;
  for (let t of nfa.transitions) {
    if (t.symbol === "" || t.symbol === "\u03B5") {
      hasEpsilon = true;
      break;
    }
  }

  // If we don't have lambda transitions, don't do anything to it
  if (!hasEpsilon) return nfa;

  let nfa_closed_transitions = [];
  let nfa_closed_final_states = [];
  for (let i = 0; i < nfa.states.length; i++) {
    let state = nfa.states[i]; //state=q1
    // 1) Find the lambda-closure (epsilon-closure) of the state
    let state_closure = fetch_E_Closure(state, nfa.transitions);
    console.debug("--");
    console.debug(state_closure);
    console.debug("-");
    console.debug("Lambda-closure of " + state + ": " + state_closure);

    // 2) Find the next state for each state in the state_closure for each symbol in the alphabet
    for (let j = 0; j < nfa.alphabet.length; j++) {
      let symbol = nfa.alphabet[j]; //symbole=0
      let symbol_next_states = [];
      // for (let t of nfa.transitions) {
      console.log("STATE CLOSURE IS", state_closure);
      for (let k = 0; k < state_closure.length; k++) {
          
        
        console.log("NFA.SYMBOL IS",symbol)
        let stateclosureK = state_closure[k];
        let next_states = findNextStates(
          stateclosureK,
          symbol,
          nfa.transitions
        );
        
        console.log("NEXT STATESSSS", next_states);
        if (next_states.length !== 0) {
          for (let n = 0; n < next_states.length; n++) {
            console.log("next states of n", next_states[n]);
            let closure = fetch_E_Closure(next_states[n], nfa.transitions);

            console.log("ARRAY? " + Array.isArray(closure));
            console.log(closure);

            for (let m = 0; m < closure.length; m++) {
              let to_add = closure[m];

              console.log("TO ADD? " + to_add);

              if (!symbol_next_states.includes(to_add))
                symbol_next_states.push(to_add);
              console.log("symbol next states are:", symbol_next_states);
            }
          }
        // }
      }
    }

      symbol_next_states.sort();

      console.log(
        "NFA Closure: " +
          state +
          " -> " +
          symbol +
          " = " +
          symbol_next_states +
          " (Length " +
          symbol_next_states.length +
          ")"
      );
      nfa_closed_transitions.push({
        currentState: state,
        nextStates: symbol_next_states,
        symbol: symbol,
      });
    }
  }

  nfa_closed_final_states.sort();
  console.log("Closed NFA Final States: " + nfa_closed_final_states);

  // Special case for lambda from initial state to a final state
  let initial_state_closure = fetch_E_Closure(
    nfa.initialState,
    nfa.transitions
  );
  let init_closure_has_final_state = false;

  for (let final_state of nfa.finalStates) {
    if (initial_state_closure.includes(final_state)) {
      init_closure_has_final_state = true;
      break;
    }
  }

  if (init_closure_has_final_state) {
    // Make the initial state final
    nfa.finalStates.push(nfa.initialState);
  }
  console.log(nfa_closed_transitions);
  nfa = {
    initialState: nfa.initialState,
    finalStates: nfa.finalStates,
    states: nfa.states,
    alphabet: nfa.alphabet,
    transitions: nfa_closed_transitions,
  };

  console.log("--- Lambda NFA ---");
  console.log(nfa);
  console.log(toDotString(nfa));
  console.log("--___--");
  console.log("nfa is", nfa);
  return nfa;
};

function fetch_E_Closure(state, transitions) {
  if (!(typeof state === "string" || state instanceof String))
    throw new Error("Expected a single state input as a string");

  if (!Array.isArray(transitions))
    throw new Error("Expected transitions parameter to be an array");

  let e_closure = []; // eclosure=[q3]
  e_closure.push(state);
  console.log("--- Add to e_closure 1 ---");
  console.log(state);

  for (let i = 0; i < transitions.length; i++) {
    let t = transitions[i];

    // Lambda transition

    if (t.symbol.trim() === "" || t.symbol.trim() === "\u03B5") {
      // The transition is going from our state / if state input is in the transitions currentstate
      if (state === t.currentState) {
        if (!Array.isArray(t.nextStates))
          throw new Error("Expected nextStates in NFA to be an array");
        //check each next state
        console.log(t.nextStates);
        for (let j = 0; j < t.nextStates.length; j++) {
          // See if the state is part of the closure
          console.log("next state is for", t.nextStates[j]);
          if (!e_closure.includes(t.nextStates[j])) {
            // If not, add it to the closure
            e_closure.push(t.nextStates[j]);
            console.log("--- Add to e_closure 2 ---");
            console.log(t.nextStates[j]);

            // Then check the closure for the newly added state (recursive)
            console.log("RECURSIVE");
            console.log("t next state is", t.nextStates[j]);
            let sub_e_closure = fetch_E_Closure(t.nextStates[j], transitions);
            console.log("subclosure is", sub_e_closure);
            for (let j = 0; j < sub_e_closure.length; j++) {
              if (!e_closure.includes(sub_e_closure[j])) {
                e_closure.push(sub_e_closure[j]);
                console.log("--- Add to e_closure 3 ---");
                console.log(sub_e_closure[j]);
              }
            }
            console.log("subclosure is", sub_e_closure);
          }
        }
      }
    }
  }
  //after loop
  console.log("e_closure is", e_closure);
  return e_closure;
}

export const generateDFA = (nfa, step_counter_stop = -1) => {
  console.log(nfa);
  let step_counter = 0;
  let step_interrupt = false;

  nfa = getEpsilonClosureNFA(nfa);
  let dfa_states = [];
  let dfa_final_states = [];
  let dfa_transitions = [];

  let stack = [];

  dfa_states.push(nfa.initialState);
  stack.push(nfa.initialState); // States we need to check/convert

  while (stack.length > 0) {
    let state = stack.pop();
    console.log("Pop state: " + state);
    // if (++step_counter === step_counter_stop) {
    //   step_interrupt = true;
    //   break;
    // }

    let states;

    if (isMultiState(state)) {
      states = separateStates(state);
      console.log("MULTISTATES AREEEE", states);
    } else {
      states = [];
      states.push(state);
      console.log("seperate",states)
    }

    for (let i = 0; i < nfa.alphabet.length; i++) {
      let next_states_union = [];

      for (let j = 0; j < states.length; j++) {
        let ns = findNextStates(states[j], nfa.alphabet[i], nfa.transitions);
        console.log(
          "Next states for " + states[j] + ", " + nfa.alphabet[i] + " -> " + ns
        );
        for (let k = 0; k < ns.length; k++)
          if (!next_states_union.includes(ns[k])) next_states_union.push(ns[k]);
      }

      let combinedStatesUnion = combineStates(next_states_union);
      console.log("combined states", combinedStatesUnion);
      if (combinedStatesUnion != null) {
        console.log(
          "Combined union of " +
            next_states_union +
            " (" +
            next_states_union.length +
            "): " +
            combinedStatesUnion +
            " | " +
            Array.isArray(combinedStatesUnion)
        );
        console.log(
          state + ", " + nfa.alphabet[i] + " -> " + combinedStatesUnion
        );
        dfa_transitions.push({
          currentState: state,
          nextStates: combinedStatesUnion,
          symbol: nfa.alphabet[i],
        });

        if (!dfa_states.includes(combinedStatesUnion)) {
          dfa_states.push(combinedStatesUnion);
          stack.push(combinedStatesUnion);
        }
      } else {
        console.log("DEADSTATE state needed");

        if (!dfa_states.includes("DEADSTATE")) {
          for (let n = 0; n < nfa.alphabet.length; n++)
            dfa_transitions.push({
              currentState: "DEADSTATE",
              nextStates: ["DEADSTATE"],
              symbol: nfa.alphabet[n],
            });

          dfa_states.push("DEADSTATE");
        }

        dfa_transitions.push({
          currentState: state,
          nextStates: ["DEADSTATE"],
          symbol: nfa.alphabet[i],
        });
      }
    }
  }

  console.log("--- NFA Final States ---");
  console.log(nfa.finalStates);
  console.log("-----");

  for (let i = 0; i < dfa_states.length; i++) {
    let dfa_sep_states = separateStates(dfa_states[i]);

    for (let j = 0; j < nfa.finalStates.length; j++) {
      console.log(
        "Does " + dfa_sep_states + " include " + nfa.finalStates[j] + "?"
      );

      if (dfa_sep_states.includes(nfa.finalStates[j])) {
        dfa_final_states.push(formatDotState(dfa_states[i]));
        break;
      }
    }
  }

  if (!step_interrupt) {
    LAST_COMPLETED_STEP_COUNT = step_counter;
    console.log("LAST_COMPLETED_STEP_COUNT = " + step_counter);
  }
  let dfa={
    initialState: nfa.initialState,
    finalStates: dfa_final_states,
    states: dfa_states,
    alphabet: nfa.alphabet,
    transitions: dfa_transitions,
  }
  console.log(dfa)
  return (dfa);
};

function findNextStates(state, symbol, transitions) {
  let next_states = [];

  for (let i = 0; i < transitions.length; i++) {
    let t = transitions[i];
    // console.log("T NEXT STATES IS",t.nextStates)
    if (t.currentState === state && t.symbol === symbol) {
      for (let j = 0; j < t.nextStates.length; j++) {
        if (!next_states.includes(t.nextStates[j])) {
          next_states.push(t.nextStates[j]);
        }
      }
    }
    // console.log("next states for i =",i,t.next_states)
  }
console.log("next states are:",next_states)
  return next_states;
}

function isMultiState(state) {
  state = state.toString();
  return state.startsWith("{") && state.endsWith("}");
}

function separateStates(state) {
  if (isMultiState(state)) {
    return state.substring(1, state.length - 1).split(",");
  } else {
    return state;
  }
}

function combineStates(states) {
  if (!Array.isArray(states)) {
    throw new Error("Array expected for combineStates() function");
  }

  // Remove null entries from array
  states = states.filter(function (e) {
    return e != null;
  });

  if (states.length > 0 && Array.isArray(states[0])) {
    console.warn("Sub-arrays are not expected for combineStates() function");
    states = states[0];
  }

  if (states.length === 0) return null;

  states.sort();

  if (states.length === 1) return states[0].toString();

  console.log("-- Combining --");
  console.log(states);
  console.log("Combine length: " + states.length);

  let state = "{";
  for (let i = 0; i < states.length; i++) {
    state += states[i] + ",";
  }
  state = state.trim().replace(/,+$/, "");
  state += "}";

  console.log("Return " + state);
  console.log("----");

  return state;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;

  return true;
}
