import { Paper } from 'components';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div className={`container ${className}`}>
      <Paper>
        <div className="bg-gray-700 flex items-center justify-between p-1">
          <p className="mr-0 text-white text-lg pl-5">{title}</p>
        </div>
        <div className="py-4 ml-5">{children}</div>
      </Paper>
    </div>
  );
};
export default Card;
