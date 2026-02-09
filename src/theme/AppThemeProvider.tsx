import { ThemeProvider } from "@shopify/restyle";
import { theme } from "./theme";

type AppThemeProviderProps = {
  children: React.ReactNode;
};

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({
  children,
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
