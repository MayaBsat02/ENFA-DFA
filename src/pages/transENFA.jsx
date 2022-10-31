import React from 'react';
import Transitions from '../components/transitions';
import styles from "../style/main.module.css"
 const TransEnfa=()=>{
    return(
        <div>
            <div className={styles.formInline} id="nfaTransitions">
          <Transitions/>
          <Transitions/>
          </div>
        </div>
    )
}

export default TransEnfa