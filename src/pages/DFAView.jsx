import React,{useState} from 'react';
import Transitions from '../components/transitions';
import styles from "../style/main.module.css";
import { Graphviz } from "graphviz-react";
import NFAContext from '../storeContext/AutomataContext';
import { generateDFA,toDotString } from '../helpers/E-NFA-Converter';
// const [data,setData]=useState({})
 const DFAReview=(props)=>{

// let drawer=toDotString(props.DFA)
{console.log(props.nfa)}
let DFA=generateDFA(props.nfa,-1)
let drawer=toDotString(DFA)
    return(
          
        
            <div>
              <div className={styles.formInline} id="nfaTransitions">
                <Graphviz dot={drawer}   />
                
              </div>
            </div>
          
        
    )
}

export default DFAReview