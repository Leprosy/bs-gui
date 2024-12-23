import { createContext, PropsWithChildren } from "react";
import getClasses from "../helpers/getClasses";

type MainState = {
  classNames: string[];
};

export const MainContext = createContext<MainState>({} as MainState);

export function MainProvider({ children }: PropsWithChildren) {
  const classNames = getClasses();
  return <MainContext.Provider value={{ classNames }}>{children}</MainContext.Provider>;
}
