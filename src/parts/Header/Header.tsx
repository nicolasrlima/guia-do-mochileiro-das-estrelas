import Image from 'next/image';

interface HeaderProps {
  sidebarOpener: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpener }) => {
  return (
    <div className="bg-gray-900 container md:hidden absolute p-4 flex justify-between z-10">
      <a
        href="#"
        className="text-lg font-semibold tracking-widest text-white uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
      >
        Guia Estelar 🌌
      </a>
      <button onClick={sidebarOpener}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 17H21C21.5523 17 22 17.4477 22 18C22 18.5128 21.614 18.9355 21.1166 18.9933L21 19H3C2.44772 19 2 18.5523 2 18C2 17.4872 2.38604 17.0645 2.88338 17.0067L3 17H21H3ZM2.99988 11L20.9999 10.9978C21.5522 10.9978 22 11.4454 22 11.9977C22 12.5105 21.6141 12.9333 21.1167 12.9911L21.0001 12.9978L3.00012 13C2.44784 13.0001 2 12.5524 2 12.0001C2 11.4873 2.38594 11.0646 2.88326 11.0067L2.99988 11L20.9999 10.9978L2.99988 11ZM3 5H21C21.5523 5 22 5.44772 22 6C22 6.51284 21.614 6.93551 21.1166 6.99327L21 7H3C2.44772 7 2 6.55228 2 6C2 5.48716 2.38604 5.06449 2.88338 5.00673L3 5H21H3Z"
            fill="#ffffff"
          />
        </svg>
      </button>
    </div>
  );
};

export default Header;
