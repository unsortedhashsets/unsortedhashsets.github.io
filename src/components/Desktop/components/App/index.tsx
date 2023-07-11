import { FC, ReactNode } from 'react';

export interface AppProps {
  children: ReactNode;
  title: string;
  icon: string;
}

const App: FC<AppProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default App;
