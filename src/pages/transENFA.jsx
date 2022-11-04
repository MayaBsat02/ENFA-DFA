import React, { useContext, useState } from "react";
import Transitions from "../components/transitions";
import styles from "../style/main.module.css";
import { Graphviz } from "graphviz-react";
import { generateDFA, toDotString } from "../helpers/E-NFA-Converter";
import NFAContext from "../storeContext/AutomataContext";
import { Button, Typography, Box, TextField } from "@mui/material";

// const [data,setData]=useState({})
const TransEnfa = (props) => {
  const [currentState, setCurrentState] = useState("");
  const [symbol, setSymbol] = useState("");
  const [nextStates, setNextStates] = useState([]);
  const [transitionsInput, setTransitionsInput] = useState([]);
  const [transition, setTransition] = useState([]);

  const addTransition = () => {
    setTransitionsInput(() => [...transitionsInput, transitionsInput]);
    setTransition([...transition, { currentState, symbol, nextStates }]);
    console.log(transition);
  };

  props.setTransitions(transition);
  const ctx = useContext(NFAContext);
  console.log(props.nfa)
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
                    if (e.target.value === "")
                      setSymbol(() => setSymbol("\u03B5"));
                  }}
                />
                &nbsp;)&nbsp;=&nbsp;
                <TextField
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  className="nextStates"
                  onChange={(e) => {
                    setNextStates(e.target.value);
                    //props.setNextStates(e.target.value)
                  }}
                />
              </div>
            );
          })}

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
                //props.setSymbol(e.target.value)
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
                setNextStates(e.target.value);
                //props.setNextStates(e.target.value)
              }}
            />
          </div>
        </div>
        <Box sx={{ flex: "1 1 auto" }}>
          <Button onClick={addTransition} sx={{ mr: 1 }}>
            Add Transition
          </Button>
        </Box>
        {/* <Graphviz dot={graph} /> */}
      </div>
    </div>
  );
};

export default TransEnfa;
