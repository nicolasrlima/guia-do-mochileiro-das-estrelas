interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="container">
      <div className="bg-white rounded-sm overflow-hidden shadow-lg">
        <div className="bg-gray-900 flex items-center justify-between p-1">
          <p className="mr-0 text-white text-lg pl-5">{title}</p>
        </div>
        <div className="py-4 ml-5">{children}</div>
      </div>
    </div>
  );
};
export default Card;
