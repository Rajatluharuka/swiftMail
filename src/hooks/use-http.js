import { useCallback, useState } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, dataHandler) => {
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers
          ? requestConfig.headers
          : {
              "Content-Type": "application/JSON",
            },
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      dataHandler(data);
    } catch (err) {
      setError(err.message || "something went wrong");
    }
  }, []);

  return {
    error,
    sendRequest,
  };
};

export default useHttp;
