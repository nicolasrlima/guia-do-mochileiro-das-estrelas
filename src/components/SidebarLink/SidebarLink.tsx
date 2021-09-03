import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './SidebarLink.module.css';

interface SidebarLinkProps {
  children: React.ReactNode;
  href: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ children, href }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <span
        className={`${
          router.pathname === href ? 'bg-gray-200' : 'bg-transparent'
        } ${styles['sidebar-link']}`}
      >
        {children}
      </span>
    </Link>
  );
};

export default SidebarLink;
