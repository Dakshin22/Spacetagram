import React from 'react';

const NotFoundPage = (props) =>
{
    return(
        <>
    {{props.msg} === 500 ? <h1>The NASA API cannot return that many photos at this time. Please refresh and choose shorter date range</h1> : <h1>Error code {props.msg}. Something has gone wrong when fetching photos. Please refresh.</h1>}
    )
    </>
}

export default NotFoundPage