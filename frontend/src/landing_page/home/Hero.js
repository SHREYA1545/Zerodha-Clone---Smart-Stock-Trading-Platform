import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
    return ( 
        <div className='container p-5 text-center'>
            <div className='row mb-5'>

                <img style={{height:"25rem"}} src='media/images/homeHero.png' alt='hero img' className='mb-5'/>
                <h1>Invest in everything</h1>
                <p>
          Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
        </p>
        <Link to="/signup" className='p-2 btn btn-primary fs-5 text-decoration-none text-white' style={{ width:'30%', margin:'0 auto'}}>Signup Now </Link>
            </div>
            </div>
     );
}

export default Hero;
<h1>Hero</h1>