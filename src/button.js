import React from 'react'

function Button({item,dispatch}) {
  return (
    <button onClick={()=>dispatch({type:'add_item',payload:`${item}`})}>{item}</button>
  )
}
export default React.memo(Button);
