import { Main } from 'components';
import Header from 'parts/Header/Header';
import Sidebar from 'parts/Sidebar/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Main>
      <Sidebar />
      <div className="flex flex-col ml-4 mr-4 mt-20 md:mt-6 md:ml-72 gap-4">
        {children}
      </div>
    </Main>
  );
};

export default Layout;
