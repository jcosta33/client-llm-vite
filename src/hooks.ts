import { useContext as useContextReact } from "react";
import { Context } from "./context";

export const useContext = () => {
  const context = useContextReact(Context);
  if (!context) {
    throw new Error("useContext must be used within a ChatProvider");
  }
  return context;
};
