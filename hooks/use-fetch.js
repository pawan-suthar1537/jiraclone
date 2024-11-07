import { toast } from "sonner";

const { useState } = require("react");

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await cb(...args);
      setData(res);
      setError(null);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    fn,
    setData,
  };
};

export default useFetch;