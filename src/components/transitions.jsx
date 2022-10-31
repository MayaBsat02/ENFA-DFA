import React from 'react';
import styles from "../style/main.module.css";
import { TextField } from '@mui/material';
 const Transitions=()=>{
    return(
           
            <div className={styles.transitionRow}>
              &delta;(&nbsp;
                <TextField id="outlined-size-small"
          size="small"
                className="currentStateInput" 
                />
              &nbsp;,&nbsp;
              <TextField id="outlined-basic" size="small" label='&epsilon;'variant="outlined" />
              &nbsp;)&nbsp;=&nbsp;
              <TextField id="outlined-basic" size="small" variant="outlined"  className="nextStates"/>
              <span
                className="glyphicon glyphicon-remove-circle remove-button"
                title="Remove this transition"
              ></span>
              
            </div>
        
    )
}

export default Transitions