"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import React from "react";
import { BarLoader } from "react-spinners";

const Userloading = () => {
  const { isLoaded } = useOrganization();
  const { isLoaded: isuserLoaded } = useUser();

  if (!isLoaded && !isuserLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  } else <></>;
};

export default Userloading;
