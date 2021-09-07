import Image from 'next/image';

import styles from './PagesController.module.css';

interface PagesControllerProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PagesController = ({
  currentPage,
  onPageChange,
  totalPages
}: PagesControllerProps) => (
  <>
    <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          className={`${styles['previous-next-button']} ${
            currentPage === 1 && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Anterior
        </button>
        <button
          className={`${styles['previous-next-button']} ${
            currentPage === totalPages && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Próximo
        </button>
      </div>
    </div>

    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
      <nav
        className="relative z-0 inline-flex rounded-md shadow-sm"
        aria-label="Paginação"
      >
        <button
          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 ${
            currentPage === 1 && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <Image src="/chevron-left.svg" height="16" width="16" />
        </button>

        {[...Array(totalPages)].map((e, i) => (
          <button
            className={`${styles['page-button']} ${
              currentPage === i + 1
                ? styles['page-button__active']
                : styles['page-button__inactive']
            }`}
            key={i}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white hover:bg-gray-50 ${
            currentPage === totalPages && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <Image src="/chevron-right.svg" height="16" width="16" />
        </button>
      </nav>
    </div>
  </>
);

export default PagesController;
