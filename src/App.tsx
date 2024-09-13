import { useEffect, useRef, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/productList';

//3
const connect = () => console.log('connecting...');
const disconnect = () => console.log('disconnecting...');

function App() {
  //1
  // const inputField = useRef<HTMLInputElement>(null);
  //effect hook could be called after render
  // useEffect(() => {
  //   //side effect
  //   if (inputField.current) inputField.current.focus();
  // });

  //2
  // const [category, setCategory] = useState('');

  //3
  useEffect(() => {
    connect();
    // clean up should undo whatever the effect was doing
    return () => disconnect();
  });

  return (
    <>
      <div>
        {/* 1 */}
        {/* <input ref={inputField} type='text' className='form-control' /> */}
        {/* 2 */}
        {/* <select
          className='form-select'
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value=''>select category</option>
          <option value='Bills'>Bills</option>
          <option value='Entertainment'>Entertainment</option>
        </select>
        <ProductList category={category} /> */}
      </div>
    </>
  );
}

export default App;
