import React from 'react'

 function OperationButton({item,dispatch}) {
  return (
    <button onClick={()=>dispatch({type:'operation',payload:`${item}`})}>{item}</button>
  )
}
export default React.memo(OperationButton); 