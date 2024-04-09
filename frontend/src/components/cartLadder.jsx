import { Link } from 'react-router-dom';
export const CartLadder = () => {
  return (
    <div>
      <div className="p-6">
        <div className='w-11/12 md:w-4/5 mx-auto'>
          <Link to="/">Home </Link><span>/ </span><Link>Shopping Cart </Link>
        </div>
      </div>
    </div>
  );
}