import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import {
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import styles from "../style/main.module.css";

export default function ENFA(props) {
  const getStates = (stateCount) => {
    let statecontent = [];
    for (let i = 1; i <= stateCount; i++) {
      statecontent.push(`q${i}`);
    }

    return statecontent;
  };

  const [statesData, setStatesData] = React.useState([]);
  const [initialState, setInitial] = React.useState([]);
  const [finalStates, setFinal] = React.useState([]);

  return (
    <div className={styles.leftAlign}>
      <Typography variant="h6">Design your Epsilon NFA</Typography>

      <TextField
        id="standard-basic"
        label="Alphabet"
        variant="standard"
        className={styles.textInput}
        onChange={(e) => {
          props.getAlphabet(e.target.value);
        }}
      />
      <TextField
        id="states"
        label="Number of States"
        variant="standard"
        className={styles.textInput}
        onChange={(e) => {
          props.setStates(getStates(e.target.value));
          setStatesData(e.target.value);
        }}
      />
      <FormControl fullWidth className={styles.textInput} variant="standard">
        <InputLabel id="demo-simple-select-label">
          Select Initial State
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={initialState}
          label="Initial State"
          onChange={(e) => {
            setInitial(e.target.value);
            props.setInitial(e.target.value);
          }}
        >
          {getStates(statesData).map((element) => {
            return <MenuItem value={element}>{element}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth className={styles.textInput} variant="standard">
        <InputLabel id="demo-simple-select-label">
          Select Final State
        </InputLabel>
        <Select
          multiple
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={finalStates}
          label="Initial State"
          onChange={(e) => {
            setFinal(e.target.value);
            props.setFinal(e.target.value);
          }}
        >
          {getStates(statesData).map((element) => {
            return <MenuItem value={element}>{element}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
