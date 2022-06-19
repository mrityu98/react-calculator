 import React from 'react'
 import heroku from './heroku_logo.jpg';
 import flag from './indianflag.png';
 function message() 
{
  return (
    <div className="msg">
        <div>Made in India <img className="flag" src={flag} alt="flag" width="25" heigth="40" />. Deployed using <img className="img" src={heroku} alt="Heroku" width="25" heigth="34" /></div>
    </div>
  )
}
export default React.memo(message);
