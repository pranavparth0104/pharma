import React, { useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Product from '../components/Product';
import Slider from '../components/Slider/Slider';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Img from '../hp.jpg';

function HomeScreen () {
    //import useDispatch from react-redux
    const dispatch = useDispatch();
    // get all productList (products, loading,  error) from redux store using useSelector
    // useSelector accepts a function with state as parameter. 
    // state is what defined in store.js (combineReducers)
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;

    //When page first load, fetch product data from backend 
    useEffect(() => {
        // use dispatch to replace axios product fetch and set loading, error. Make sure to call listProducts function 
        dispatch(listProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <br />
        <div className="search">
        <Link to='/search'>
            Search
            <button className='sbut'>🔍</button>
            </Link>

        </div>
        <br />
        <div className="slider">
            <img className="simg" src={Img} alt="img" />

        </div>
        <br />
        <div>
            {
                loading ? <LoadingBox />
                    : error ? <MessageBox variant="danger"> {error} </MessageBox> 
                        : ( <div className='row center'>
			    	{ products.map(product => <Product key={product._id} product={product} />)}
			    </div> )
            }
			
        </div>
        </div>
    );
}

export default HomeScreen;
