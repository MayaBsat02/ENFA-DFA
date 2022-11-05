import React, { useState } from "react";
import styles from "../style/main.module.css";
import { Graphviz } from "graphviz-react";
import { generateDFA, toDotString } from "../helpers/E-NFA-Converter";
import { Box, Grid, Chip, TextField,Typography } from "@mui/material";
import { checkString } from "../helpers/StringCheck";
const DFAReview = (props) => {
  const [result, setResult] = React.useState([]);
  let DFA = generateDFA(props.nfa, -1);
  let dfanew={
    "initialState": "q1",
    "finalStates": [
        "q1",
        "q2q3",
        "q1q2q3"
    ],
    "states": [
        "q1",
        "{q2,q3}",
        "{q1,q2,q3}",
        "DEADSTATE"
    ],
    "alphabet": [
        "0",
        "1"
    ],
    "transitions": [
        {
            "currentState": "q1",
            "nextStates": "{q2,q3}",
            "symbol": "0"
        },
        {
            "currentState": "q1",
            "nextStates": "{q1,q2,q3}",
            "symbol": "1"
        },
        {
            "currentState": "{q1,q2,q3}",
            "nextStates": "{q2,q3}",
            "symbol": "0"
        },
        {
            "currentState": "{q1,q2,q3}",
            "nextStates": "{q1,q2,q3}",
            "symbol": "1"
        },
        {
            "currentState": "{q2,q3}",
            "nextStates": "{q2,q3}",
            "symbol": "0"
        },
        {
            "currentState": "DEADSTATE",
            "nextStates": [
                "DEADSTATE"
            ],
            "symbol": "0"
        },
        {
            "currentState": "DEADSTATE",
            "nextStates": [
                "DEADSTATE"
            ],
            "symbol": "1"
        },
        {
            "currentState": "{q2,q3}",
            "nextStates": [
                "DEADSTATE"
            ],
            "symbol": "1"
        }
    ]
}
  let drawer = toDotString(DFA);
  return (
    <div style={{ alignContent: "center" }}>
      <Typography variant="h6">DFA Review</Typography>
      <div className={styles.formInline} id="nfaTransitions">
        <Grid item xs={12} sm={12}>
          <Graphviz dot={drawer} />
        </Grid>
      </div>
      <Grid container className={styles.check}>
        <Grid item xs={8} sm={8}>
          <Box>
            <TextField
              fullWidth
              label="Outlined"
              variant="standard"
              onKeyUp={(e) => {
                // setDrawer(updateGraph(data))
                setResult(checkString(e.target.value, props.transitions, props.initial));
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={4} sm={4}>
          {/* {checkFinalState(result, data) ? ( */}
          <Chip label="Accepted" color="success" variant="standard" />
          {/* ) : ( */}
          <Chip label="Rejected" color="error" variant="standard" />
          {/* )} */}
        </Grid>
      </Grid>
    </div>
  );
};

export default DFAReview;
