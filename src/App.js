import logo from './logo.svg';
import './App.css';
import './calculator.css';
import { useReducer } from 'react';
import Button from './button';
import OperationButton from './OperationButton';
import Message from './message';

//Initial state value
const initialState = {
  currentoperand:'',
  previousoperand:'',
  operation:'',
  evaluated:false
}

const evaluate = (state)=> {         //Arithmetic opeartions.
  let prev = parseFloat(state.previousoperand);
  let curr = parseFloat(state.currentoperand);
  if(isNaN(prev)||isNaN(curr)) 
  return "";
  switch(state.operation){
    case '+': prev=prev+curr;
    break;
    case '-':prev=prev-curr;
    break;
    case '*':prev=prev*curr;
    break;
    case '/':prev=prev/curr;
    break;
  }
return prev.toString();
}

const formatInt=new Intl.NumberFormat("en-IN",{
  maximumfractionDigits:0
})

const formatOperand = (operand)=>{
  if(operand==null) return;
  const [int , decimal] = operand.split('.');
  if(decimal == null) return formatInt.format(int);
  return `${formatInt.format(int)}.${decimal}`;
}

const reducer =(state,action)=>{    //Possible Operations
switch(action.type)
{
  //On pressing clear button
  case 'clear':return { 
  currentoperand:'',
  previousoperand:'',
  operation:''
  }
  
  case 'delete_digit':  //On pressing DEL button
    if(state.evaluated){
    return {
  ...state,
  evaluated:false,
  currentoperand:''
  }}

  if(state.currentoperand === '')
  return state;

  if(state.currentoperand.length === 1) 
  return {
    ...state,
    currentoperand:''
  }

  return {
    ...state,
    currentoperand:state.currentoperand.slice(0,-1)
  }

  case 'operation':  //On pressing any operator
    if((state.currentoperand ==='' && state.previousoperand === '')||(state.currentoperand ==='')) return state;
    if(state.previousoperand === ''){
      return {
        ...state,
        operation:action.payload,
        previousoperand:`${state.currentoperand}`,
        currentoperand:''
      }
    }
    return {
      ...state,
      previousoperand:evaluate(state),
      operation:(state.previousoperand === "")?'':action.payload,
      currentoperand:''
    }

  case 'add_item':  //On pressing any digit or decimal point
    if(action.payload ==="0" && state.currentoperand==="0") return state;
    if(action.payload ==="." && state.currentoperand.includes(".")) return state;
    return {
  ...state,
  currentoperand:state.evaluated?`${action.payload}`:`${state.currentoperand}${action.payload}`,
  evaluated:false
  }

  case 'evaluate':   //On pressing equal to button
    return{
      ...state,
      evaluated:true,
      previousoperand:'',
      operation:'',
      currentoperand:evaluate(state)
    }
  default : return state;
}

}
//App Component
function App() {
  const [{currentoperand='',previousoperand='',operation=''},dispatch]=useReducer(reducer,initialState);
  return (
    <div>
    <div className="Calculator">
      <div className="output">
        <div className="previous-operand">{formatOperand(previousoperand)}{operation}</div>
        <div className="current-operand">{formatOperand(currentoperand)}</div>
      </div>
      <button className='span-two' onClick={()=>dispatch({type:'clear'})}>AC</button>
      <button onClick={()=>dispatch({type:'delete_digit'})}>DEL</button>
      <OperationButton item={"/"} dispatch={dispatch} />
      <Button item={"1"} dispatch={dispatch} />
      <Button item={"2"} dispatch={dispatch} />
      <Button item={"3"} dispatch={dispatch} />
      <OperationButton item={"*"} dispatch={dispatch} />
      <Button item={"4"} dispatch={dispatch} />
      <Button item={"5"} dispatch={dispatch} />
      <Button item={"6"} dispatch={dispatch} />
      <OperationButton item={"+"} dispatch={dispatch} />
      <Button item={"7"} dispatch={dispatch} />
      <Button item={"8"} dispatch={dispatch} />
      <Button item={"9"} dispatch={dispatch} />
      <OperationButton item={"-"} dispatch={dispatch} />
      <Button item={"."} dispatch={dispatch} />
      <Button item={"0"} dispatch={dispatch} />
      <button className="span-two" onClick={()=>dispatch({type:'evaluate'})}>=</button>
      </div>
      <Message/>
    </div>
  );
}

export default App;
