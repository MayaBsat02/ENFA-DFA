import React, { useContext, useState } from "react";
import styles from "../style/main.module.css";
import { Graphviz } from "graphviz-react";
import { formatDotState } from "../helpers/E-NFA-Converter";
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

  const updateGraph = (from, to, symbol) => {
    let drawer = `digraph { 
      rankdir=LR; 
      init[label="",shape=point];
      node[shape=circle];
      ${props.finalStates.join(",")}[shape=doublecircle];
      ${props.initialState};
      init->${props.initialState};}`;
      

    if (from && to && symbol) {
      let newDrawer = drawer.slice(0,- 1);
      newDrawer = newDrawer.concat(`${from} -> ${to}[label=${symbol}];}`);
      console.log(newDrawer);
      return newDrawer;
    }
    return drawer;
  }

  let [drawer, setDrawer] = React.useState(updateGraph());

  const addTransition = () => {
    setTransitionsInput(() => [...transitionsInput, transitionsInput]);
    if(currentState!='')
    setTransition(()=>[...transition, { currentState, symbol, nextStates }]);
    // setDrawer(updateGraph(currentState,nextStates,symbol));
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
                  // onInput={(e) => {
                  //   setDrawer(drawGraph(props.nfa));
                  // }}
                />
                &nbsp;,&nbsp;
                <TextField
                  id="outlined-basic"
                  size="small"
                  placeholder="&epsilon;"
                  variant="outlined"
                  onChange={(e) => {
                    if(e.target.value=="" || e.target.value=="\u03B5") setSymbol("\u03B5")
                  else setSymbol(e.target.value)
                  }}
                  onBlur={(e) => {
                    if (e.target.value == "" || e.target.value=="\u03B5") setSymbol("\u03B5");
                  }}
                  // onInput={(e) => {
                  //   setDrawer(drawGraph(props.nfa));
                  // }}
                />
                &nbsp;)&nbsp;=&nbsp;
                <TextField
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  className="nextStates"
                  onChange={(e) => {
                    setNextStates(e.target.value.split(","));
                  }}
                  // onInput={(e) => {
                  //   setDrawer(()=>updateGraph(currentState,e.target.value,symbol));
                  //     // currentState, e.target.value, symbol));
                  //   console.log(drawer)
                  // }}
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
