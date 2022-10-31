import React from 'react';
import MultiStep from '../components/MultiStep';
import ENFA from '../pages/ENFA';
import { Typography } from '@mui/material';
import '../helpers/E-NFA-Converter';


let nfa={
    initialState:'q1',
    finalStates:['q3'],
    states:['q1,q2,q3'],
    alphabet:['0','1','&epsilon;'],
    transitions:[
        {currentState:'q1',nextStates:['q2'],symbol:'&epsilon;'},
        {currentState:'q1',nextStates:['q1'],symbol:'1'},
        {currentState:'q2',nextStates:['q3'],symbol:'&epsilon;'},
        {currentState:'q2',nextStates:['q2'],symbol:'0'},
    ]
}


const Hello=()=>{
    return (
        <div>
            <Typography variant="h3" component="h2" sx={{marginTop:'1.5rem',fontStyle:'italic'}}>
                Finite Automata
            </Typography>;
            <div sx={{width:'50%'}} >
            <MultiStep/>
           
            </div>
        </div>
    )
}

export default Hello