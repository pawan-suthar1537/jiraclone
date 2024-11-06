import React from "react";

const Organization = ({ params }) => {
  const { orgid } = params;
  return <div>organization:{orgid}</div>;
};

export default Organization;
