import { useState, useCallback } from "react";

export const useNotification = () => {
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    image: "",
  });

  const showNotification = useCallback((message, image = "") => {
    setNotification({ visible: true, message, image });
    setTimeout(() => {
      setNotification({ visible: false, message: "", image: "" });
    }, 2000);
  }, []);

  const hideNotification = useCallback(() => {
    setNotification({ visible: false, message: "", image: "" });
  }, []);

  return {
    notification,
    showNotification,
    hideNotification,
  };
};
