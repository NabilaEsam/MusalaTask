import { createContext } from "react";

interface IAppContext {
  themeMode: string;
  setThemeMode: any;
}
const AppContext = createContext<Partial<IAppContext>>({});

export default AppContext;
