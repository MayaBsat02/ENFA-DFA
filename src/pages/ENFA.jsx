import React from 'react';
import {TextField} from '@mui/material';
import { Typography } from '@mui/material';
import { FormControlLabel,InputLabel,Select,MenuItem,FormControl} from '@mui/material';

import styles from '../style/main.module.css';

export default function ENFA() {
  return (
    <div className={styles.leftAlign}>
      <Typography variant="h6">Design your Epsilon NFA</Typography>
      
      <TextField id="standard-basic" label="Alphabet" variant="standard" className={styles.textInput} />
      <TextField id="standard-basic" label="# of States" variant="standard" className={styles.textInput} />
      <FormControl fullWidth className={styles.textInput} variant="standard">
      <InputLabel id="demo-simple-select-label">Select Initial State</InputLabel>
      <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      // value={age}
      label="Initial State"
      // onChange={handleChange}
      >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      </FormControl>
      <FormControl fullWidth className={styles.textInput} variant="standard">
      <InputLabel id="demo-simple-select-label">Select Final State</InputLabel>
      <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      // value={age}
      label="Initial State"
      // onChange={handleChange}
      >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      </FormControl>
    </div>
  );
}

