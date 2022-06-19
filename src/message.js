 import React from 'react'
 import heroku from './heroku_logo.jpg';
 import flag from './indianflag.png';
 import github from './github.png';

 function message() 
{
  return (
    <div className="msg">
        <div>Made in India <img className="flag" src={flag} alt="flag" width="25" heigth="40" />. Deployed using <img className="img" src={heroku} alt="Heroku" width="25" heigth="34" /></div>
        <div className="second">Source code can be found at <a href="https://github.com/mrityu98/react-calculator/tree/master" target="_blank"><img className="github" src={github} alt="github" width="25" heigth="35" /></a></div>
    </div>
  )
}
export default React.memo(message);
