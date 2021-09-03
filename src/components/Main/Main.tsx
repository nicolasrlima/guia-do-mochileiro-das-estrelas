interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return <main className="bg-gray-100 flex h-screen">{children}</main>;
};

export default Main;
