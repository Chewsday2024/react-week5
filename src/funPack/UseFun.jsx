import { useContext } from "react";
import { Dbox } from "./FunPovider";

function useFun () {
  return useContext(Dbox);
}


export default useFun;