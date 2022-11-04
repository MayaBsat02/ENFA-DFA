import React,{useState} from 'react';
import styles from "../style/main.module.css";
import { TextField } from '@mui/material';
 const Transitions=(props)=>{

  const [currentState,setCurrentState]=useState('');
  const [symbol,setSymbol]=useState('')
  const [nextStates,setNextStates]=useState([]);

    return(
           
            <div className={styles.transitionRow}>
              &delta;(&nbsp;
                <TextField 
                id="outlined-size-small"
                size="small"
                className="currentStateInput" 
                onChange={(e)=>{
                  setCurrentState(e.target.value)
                  props.setCurrentState(e.target.value)
                  
                }}
                />
              &nbsp;,&nbsp;
              <TextField 
              id="outlined-basic" 
              size="small" 
              placeholder='&epsilon;'
              
              variant="outlined"
              onChange={(e)=>{
                  setSymbol(e.target.value)
                  props.setSymbol(e.target.value)
                  if(e.target.value==="") setSymbol("\u03B5")
                  
              }} />
              &nbsp;)&nbsp;=&nbsp;
              <TextField 
              id="outlined-basic" 
              size="small" 
              variant="outlined"  
              className="nextStates"
              onChange={(e)=>{
                setNextStates(e.target.value)
                props.setNextStates(e.target.value)
                
            }}
              />
              
            </div>
        
    )
}

export default Transitions