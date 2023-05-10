import React, { useState, useEffect } from "react";

function ChangingProgressProvider({ values, interval = 1000, children }) {
  const [valuesIndex, setValuesIndex] = useState(0);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setValuesIndex((valuesIndex + 1) % values.length);
    }, interval);

    return () => clearTimeout(intervalId);
  }, [interval]);

  return children(values[valuesIndex]);
}

export default ChangingProgressProvider;
