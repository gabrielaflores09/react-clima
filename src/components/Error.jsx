import React from 'react';

const Error = ({mensaje}) => {
    return ( 
        <div className="alert alert-danger">
            {mensaje}
        </div>
     );
}
 
export default Error;