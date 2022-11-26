import React, { useState } from "react";
import styles from "../style/main.module.css";
import { Graphviz } from "graphviz-react";
import {
  generateDFA,
  toDotString,
  minimizeDFA,
} from "../helpers/E-NFA-Converter";
import { Box, Grid, Chip, TextField, Typography } from "@mui/material";
import { checkString, checkFinalState } from "../helpers/StringCheck";

const DFAReview = (props) => {
  
  let [result, setResult] = React.useState([]);

  const [DFA, setDFA] = useState(generateDFA(props.nfa, -1));

  let [drawer, setDrawer] = React.useState(toDotString(DFA));

  console.log("drawe is", drawer);

  React.useEffect(() => {
    if (result.length > 0) {
      console.log("result is", result);
      setDrawer(
        drawer
          .substring(0, drawer.length - 1)
          .concat(`${result}[style=filled,color=green]; }`)
      );
    } else {
      setDrawer(toDotString(DFA));
      console.log(DFA);
    }
  }, [result]);

  return (
    <div style={{ alignContent: "center" }}>
      <Typography variant="h6">DFA Review</Typography>
      <div style={{ alignContent: "center" }}>
        <Grid item xs={12} sm={12}>
          <Graphviz dot={drawer} />
        </Grid>
      </div>
      <Grid container className={[styles.check, { alignContent: "center" }]}>
        <Grid item xs={7} sm={7}>
          <Box>
            <TextField
              fullWidth
              label="Outlined"
              variant="standard"
              onKeyUp={(e) => {
                setDrawer(toDotString(DFA));
                setResult(
                  checkString(e.target.value, DFA.transitions, DFA.initialState)
                );
                console.log("Array result on Key up", result);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={3} sm={3}>
          {checkFinalState(
            DFA.initialState,
            result,
            DFA.transitions,
            DFA.finalStates
          ) ||
          (result.length === 0 &&
            DFA.finalStates.includes(DFA.initialState)) ? (
            <Chip label="Accepted" color="success" variant="standard" />
          ) : (
            <Chip label="Rejected" color="error" variant="standard" />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default DFAReview;
