import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ENFA from "./ENFA";
import TransEnfa from "./transENFA";
import styles from "../style/main.module.css";
import "../helpers/E-NFA-Converter";
import DFAReview from "./DFAView";
import NFAContext from "../storeContext/AutomataContext";
const steps = [
  "Epsilon NFA Description",
  "Epsilon NFA Transition Table",
  "Epsilon NFA to DFA",
];

const Index = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [states, setStatesCount] = React.useState(0);
  const [alphabet, setAlphabet] = React.useState([]);
  const [initialState, setInitial] = React.useState();
  const [finalStates, setFinal] = React.useState();
  const [transitions, setTransitions] = React.useState();
  const [nfa, setNFA] = React.useState();

  const getTransitions = (data) => {
    setTransitions(data);
    console.log(data);
  };
  const getAlphabet = (data) => {
    setAlphabet(data.split(","));
    console.log("parent data alphabet", data);
  };

  const setStates = (data) => {
    setStatesCount(data);
    console.log(data);
  };

  const getInit = (data) => {
    setInitial(data);
    console.log("initialState is", data);
  };

  const getFinal = (data) => {
    setFinal(data);
    console.log("finalStates is", data);
  };

  const getNFA = (nfa) => {
    setNFA({ initialState, finalStates, states, alphabet, transitions });
    console.log(
      "NFA ISSS",
      setNFA({ initialState, finalStates, states, alphabet, transitions })
    );
    return nfa;
  };

  console.log("NFA", nfa);
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  //  let graph=toDotString(nfa)

  return (
    <div>
      <Typography
        variant="h3"
        component="h2"
        sx={{ marginTop: "1.5rem", fontStyle: "italic" }}
      >
        Finite Automata
      </Typography>
      <div sx={{ width: "50%" }}>
        <div className={styles.card}>
          <Box sx={{ width: "90%", marginX: "auto" }}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>

            <div style={{ marginTop: "2%" }}>
              <NFAContext.Provider
                value={{
                  initialState,
                  finalStates,
                  states,
                  alphabet,
                  transitions,
                }}
              >
                {activeStep == 0 && (
                  <ENFA
                    getAlphabet={getAlphabet}
                    setStates={setStates}
                    setInitial={getInit}
                    setFinal={getFinal}
                  />
                )}
                {activeStep == 1 && (
                  <TransEnfa
                    setTransitions={getTransitions}
                    states={states}
                    alphabet={alphabet}
                    initialState={initialState}
                    finalStates={finalStates}
                    nfa={nfa}
                  />
                )}
                {activeStep == 2 && (
                  <DFAReview
                    states={states}
                    alphabet={alphabet}
                    initialState={initialState}
                    finalStates={finalStates}
                    transitions={transitions}
                    nfa={nfa}
                  />
                )}
              </NFAContext.Provider>

              <div style={{ marginTop: "2%" }}>
                {allStepsCompleted() ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleNext} sx={{ mr: 1 }}>
                        Next
                      </Button>
                      <Button onClick={getNFA} sx={{ mr: 1 }}>
                        Submit
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Index;
