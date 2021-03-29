import { createContext } from "react";
import RootStore from "./RootStore";

const RootStoreContext = createContext<RootStore | null>(null);

export default RootStoreContext;