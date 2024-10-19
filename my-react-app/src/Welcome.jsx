import React from 'react';

function Welcome(props) {
    return (
        <h1>
            hello, {props.name}
            <span>
                  {props.score > 60 ? "good work" : "you can do better"}
            </span>
        </h1>);
  }
  

  export default Welcome;