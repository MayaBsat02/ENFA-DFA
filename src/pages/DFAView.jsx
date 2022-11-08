import React, { useState } from "react";
import styles from "../style/main.module.css";
import { Graphviz } from "graphviz-react";
import { generateDFA, toDotString } from "../helpers/E-NFA-Converter";
import { Box, Grid, Chip, TextField,Typography } from "@mui/material";
import { checkString,checkFinalState } from "../helpers/StringCheck";

const DFAReview = (props) => {
  let [result, setResult] = React.useState([]);
  let DFA = generateDFA(props.nfa, -1);
  let [drawer, setDrawer] = React.useState(toDotString(DFA));
  React.useEffect(() => {
    if (result.length > 0) {
      // if(result='DEADSTATE'){
      //   setDrawer(
      //     drawer
      //       .substring(0, drawer.length - 1)
      //       .concat(
      //         `${result.concat(DFA.initialState)}[style=filled,color=green]; }`
      //       )
      //   );
      // }else{
        if(result!='DEADSTATE')
        result=result.replaceAll(",", "").replace(/[{}]/g, "")
        
      setDrawer(
        drawer
          .substring(0, drawer.length - 1)
          .concat(
            `${result.concat(",").concat(DFA.initialState)}[style=filled,color=green]; }`
          )
      )
        
          
      console.log("drawer is",drawer)
          
    } else {
      setDrawer(toDotString(DFA));
      console.log(DFA)
    }
  }, [result]);
  // let drawer = toDotString(DFA);
  
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
                setDrawer(toDotString(DFA))
                setResult(checkString(e.target.value, DFA.transitions, DFA.initialState));
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={4} sm={4}>
          {checkFinalState(result, DFA.transitions,DFA.finalStates) ? (
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
