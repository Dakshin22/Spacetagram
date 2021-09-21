import React from "react";

const NotFoundPage = (props) => {
  return (
    <>
      {props.status >= 500 ? (
        <h1>
          The NASA API cannot return that many photos at this time. Please
          choose a shorter date range
        </h1>
      ) : (
        <h1>
          Error code {props.status}. Something has gone wrong when fetching
          photos. Please refresh.
        </h1>
      )}
    </>
  );
};

export default NotFoundPage;
