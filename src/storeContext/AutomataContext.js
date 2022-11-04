import React,{useState} from 'react';

const NFAContext= React.createContext({
    
        initialStates:'q1',
        finalStates:['q3'],
        states:['q1','q2','q3'],
        alphabet:['0','1'],
        transitions:[
            {currentState:'q1',
        nextStates:['q1'],
        symbol:'1'
    }
        ]}


);

//create a component that uses the context provider and get all props of children
export const NFAContextProvider=(props)=>{
    const[data,setData]=useState({})

    const getDataHandler=()=>{
        setData(data)
    };

    return (
        <NFAContextProvider
            value={{
                onInput:getDataHandler
            }}>{props.children}
        </NFAContextProvider>
    )
}


export default NFAContext