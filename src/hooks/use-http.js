import { useCallback, useState } from "react";
import axios from "axios";

const useHttp = () => {
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, dataHandler) => {
    setError(null);
    try {
      const response = await axios({
        method: requestConfig.method || "GET",
        url: requestConfig.url,
        headers: requestConfig.headers || {
          "Content-Type": "application/json",
        },
        data: requestConfig.body || null,
      });

      dataHandler(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Something went wrong"
      );
    }
  }, []);

  return {
    error,
    sendRequest,
  };
};

export default useHttp;
