import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating';

function Product (props) {
    const { product } = props;
    

    return (
        <div className='card'>
            <Link to={`/product/${product._id}`}>
                <img className='medium' src={product.image} alt='product' />
            </Link>
            <div className='card-body'>
                <Link to={`/product/${product._id}`}>
                    <h2>{product.name}</h2>
                </Link>
                {/* Rating component */}
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <div className='price'>₹{product.price}</div>
                <div className="cardend">
                <Link to={`/product/${product._id}`}>
                    <button className='orderButton'>Order Now</button>
                    </Link>
                    {/* <Link to={`/product/${product._id}`}>
                    <button className='orderButton'>Add to Cart</button>
                    </Link> */}
                    </div>
            </div>
        </div>
    );
}

export default Product;
