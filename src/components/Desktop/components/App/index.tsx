export interface AppProps {
    children: React.ReactNode;
    title: string;
    icon: string;
  }

  const App: React.FC<AppProps> = ({ children}) => {
    return (
        <div> {children}</div>
       );
  }

  export default App;