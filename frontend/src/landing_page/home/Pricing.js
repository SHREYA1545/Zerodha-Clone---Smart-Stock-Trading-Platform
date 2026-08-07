import React from 'react';

function Pricing() {
  return (
    <div className='container mb-5'>
      {/* Added align-items-center to vertically center the left text with the right boxes */}
      <div className='row align-items-center'>
        
        {/* Left Column: Removed m-5 to fix grid breakage */}
        <div className='col-4'>
          <h1 className='mb-3'>Unbeatable pricing</h1>
          <p className='text-muted'>
            We pioneered the concept of discount broking and price
            transparency in India. Flat fees and no hidden charges.
          </p>
          {/* Removed m-5, styling inline directly for clean look */}
          <a href='' style={{ textDecoration: 'none' }}>
            See pricing <i class="fa fa-long-arrow-right" aria-hidden='true'></i>
          </a>
        </div>

        {/* Spacer Column */}
        <div className='col-2'></div>

        {/* Right Column (Pricing Boxes) */}
        <div className='col-6'>
          <div className='row text-center'> {/* Added text-center here */}
            
            {/* Box 1 */}
            <div className='col p-3 border'>
              <h1 className='mb-3'>₹0</h1>
              <p>Free equity delivery and<br />direct mutual funds</p>
            </div>
            
            {/* Box 2 */}
            <div className='col p-3 border'>
              <h1 className='mb-3'>₹20</h1>
              <p>Intraday and F&O</p>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Pricing;