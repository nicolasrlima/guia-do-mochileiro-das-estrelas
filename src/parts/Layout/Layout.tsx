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
      <div className="mt-6">{children}</div>
    </Main>
  );
};

export default Layout;
