import { useEffect, useState } from 'react';

//inline way of adding props, used when not needed to make complex interfaces
const ProductList = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    console.log('fectching product in', category);
    setProducts(['Bills', 'Entertainment']);
  }, [category]); // this is the dependency array, no array = every render, empty array = once, array with something in it = renders based on dependencies

  return <div>productList</div>;
};

export default ProductList;
