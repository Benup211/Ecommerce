import { Link } from 'react-router-dom';
export const Ladder = () => {
  return (
    <div>
      <div className="p-6">
        <div className='w-11/12 md:w-4/5 mx-auto'>
          <Link to="/">Home </Link><span>/ </span><Link to="/">Product </Link><span>/ </span><Link to="/products/laptops/laptop1">MacBook Pro 13.3″ 16GB/512GB Silver </Link>
        </div>
      </div>
    </div>
  );
}