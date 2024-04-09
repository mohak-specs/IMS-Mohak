import useLoadingStore from "../store/useLoadingStore";
import { useEffect } from "react";

const useSetLoading = (isLoading: boolean) => {
  const { setIsLoading } = useLoadingStore();
  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);
};

export default useSetLoading;
