interface PaperProps {
  children?: React.ReactNode;
  className?: string;
}

const Paper = ({ children, className }: PaperProps) => (
  <div className={`bg-white rounded-sm overflow-hidden shadow-lg ${className}`}>
    {children}
  </div>
);

export default Paper;
