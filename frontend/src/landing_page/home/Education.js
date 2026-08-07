import React from 'react'

function Education() {
    return ( 
        <div className='container mb-5'>
      {/* Added align-items-center to vertically center the left text with the right boxes */}
      <div className='row mt-5'>
        
        <div className='col-6 mt-5 pl-5'>
          <div className='row text-center'> {/* Added text-center here */}
            <img src='media\images\education.svg' style={{width:'70%'}}></img>
          
          </div>
        </div>


        <div className='col-4 mt-5'>
          <h2 className='mb-3 fs-3'>Free and open market education</h2>
          <p className='text-muted'>
            Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.
          </p>
         
          <a href='' style={{ textDecoration: 'none' }}>
           Varsity <i class="fa fa-long-arrow-right" aria-hidden='true'></i>
          </a>


           <p className='text-muted'>
TradingQ&A, the most active trading and investment community in India for all your market related queries.          </p>
         
          <a href='' style={{ textDecoration: 'none' }}>
           TradingQ&A  <i class="fa fa-long-arrow-right" aria-hidden='true'></i>
          </a>
        </div>


       
       
        
      </div>
    </div>
     );
}

export default Education;