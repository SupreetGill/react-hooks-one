import React,{useEffect} from 'react';

function Alert({type, msg,removeAlert,list}) {

  useEffect(() => {
      const timeUp = setTimeout(() => {
          removeAlert();
      }, 2000);
      return ()=> clearTimeout(timeUp)
  }, [list])

    return (
      <p className= {`alert alert-${type}`} >
          {msg}
      </p>
    );
}

export default Alert;