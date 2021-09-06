import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'large' | 'medium' | 'small';
  variant?: 'primary' | 'secondary';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({
  children,
  onClick,
  disabled,
  fullWidth,
  size = 'medium',
  variant = 'primary'
}: ButtonProps) => {
  return (
    <button
      className={`${styles[size]} ${styles[`${variant}`]} ${
        fullWidth ? styles['full-width'] : ''
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
