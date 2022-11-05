import React, { useContext, useState } from "react";
import Transitions from "../components/transitions";
import styles from "../style/main.module.css";
import { Graphviz } from "graphviz-react";
import { formatDotState } from "../helpers/E-NFA-Converter";
import NFAContext from "../storeContext/AutomataContext";
import { Button, Typography, Box, TextField } from "@mui/material";

const TransEnfa = (props) => {
  const [currentState, setCurrentState] = useState("");
  const [symbol, setSymbol] = useState("");
  const [nextStates, setNextStates] = useState([]);
  const [transitionsInput, setTransitionsInput] = useState([]);
  const [transition, setTransition] = useState([]);

  const drawGraph = (nfa) => {
    let dotStr = "digraph fsm {\n";
    dotStr += "rankdir=LR;\n";
    dotStr += 'size="8,5";\n';
    dotStr += "node [shape = point]; INITIAL_STATE\n";
    dotStr +=
      "node [shape = doublecircle]; " + props.finalStates.join(",") + ";\n";
    dotStr += "node [shape = circle];\n";
    dotStr += "INITIAL_STATE -> " + formatDotState(props.initialState) + ";\n";
    for (let i = 0; i < transition.length; i++) {
      let t = transition[i];
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
  };
  let [drawer, setDrawer] = React.useState(drawGraph());

  const addTransition = () => {
    setTransitionsInput(() => [...transitionsInput, transitionsInput]);
    if(currentState!='')
    setTransition([...transition, { currentState, symbol, nextStates }]);
    console.log(transition);
  };
  {
    if (symbol === "") setSymbol("\u03B5");
  }
  props.setTransitions(transition);

  console.log(props.nfa);
  // let graph = toDotString(props.nfa);

  return (
    <div>
      <div id="nfaTransitions">
        <Typography
          variant="h5"
          component="h2"
          sx={{ marginY: "1.5rem", textAlign: "left" }}
        >
          Transition Function
        </Typography>
        <div className={styles.formInline}>
          {/* <div className={styles.transitionRow}>
            &delta;(&nbsp;
            <TextField
              id="outlined-size-small"
              size="small"
              className="currentStateInput"
              onChange={(e) => {
                setCurrentState(e.target.value);
                //props.setCurrentState(e.target.value)
              }}
            />
            &nbsp;,&nbsp;
            <TextField
              id="outlined-basic"
              size="small"
              placeholder="&epsilon;"
              variant="outlined"
              onChange={(e) => {
                setSymbol(e.target.value);
                //props.setSymbol(e.target.value)
              }}
            />
            &nbsp;)&nbsp;=&nbsp;
            <TextField
              id="outlined-basic"
              size="small"
              variant="outlined"
              className="nextStates"
              onChange={(e) => {
                setNextStates(e.target.value.split(","));
                //props.setNextStates(e.target.value)
              }}
            />
          </div> */}
          {transitionsInput.map((item) => {
            return (
              <div className={styles.transitionRow}>
                &delta;(&nbsp;
                <TextField
                  id="outlined-size-small"
                  size="small"
                  className="currentStateInput"
                  onChange={(e) => {
                    setCurrentState(e.target.value);
                    //props.setCurrentState(e.target.value)
                  }}
                />
                &nbsp;,&nbsp;
                <TextField
                  id="outlined-basic"
                  size="small"
                  placeholder="&epsilon;"
                  variant="outlined"
                  onChange={(e) => {
                    setSymbol(e.target.value);
                    // props.setSymbol(e.target.value)
                  }}
                  onLoad={(e) => {
                    if (e.target.value === "") setSymbol("\u03B5");
                  }}
                />
                &nbsp;)&nbsp;=&nbsp;
                <TextField
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  className="nextStates"
                  onChange={(e) => {
                    setNextStates(e.target.value.split(","));
                    //props.setNextStates(e.target.value)
                  }}
                />
              </div>
            );
          })}
        </div>
        <Box sx={{ flex: "1 1 auto" }}>
          <Button onClick={addTransition} sx={{ mr: 1 }}>
            Add Transition
          </Button>
          <Button
            onClick={() => {
              setDrawer(drawGraph());
            }}
            sx={{ mr: 1 }}
          >
            Show Graph
          </Button>
        </Box>
        <Graphviz dot={drawer} />
      </div>
    </div>
  );
};

export default TransEnfa;
