import React, { useState } from "react";
import styles from "../style/main.module.css";
import { Graphviz } from "graphviz-react";
import { generateDFA, toDotString } from "../helpers/E-NFA-Converter";
import { Box, Grid, Chip, TextField,Typography } from "@mui/material";
import { checkString } from "../helpers/StringCheck";
const DFAReview = (props) => {
  const [result, setResult] = React.useState([]);
  let DFA = generateDFA(props.nfa, -1);
  
  let drawer = toDotString(DFA);
  { console.log("PROPS ARE",DFA.transitions)}
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
                setResult(checkString(e.target.value, DFA.transitions, DFA.initial));
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
