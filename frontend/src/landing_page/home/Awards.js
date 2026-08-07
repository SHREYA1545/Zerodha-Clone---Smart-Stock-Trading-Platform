import React from 'react';

function Awards() {
    return ( 
       <div className='container mt-5' >
        <div className='row mt-5 '>
            <div className='col-6 p-5'>
           < img src='media/images/largestBroker.svg'/>
            </div>
            <div className='col-6 p-5'>
                <h1>Largest stock broker in India</h1>
                <p className='mb-5'>2+ millon Zerodha clients contribute over 15% of all retail order volumes in India daily by training and investing in:</p>
                <div className='row'>
                    <div className='col-6'>
                        <ul>
                    <li><p>
                        Features and options
                        </p></li>
                    <li><p>
                            Commodity derivatives
                        </p></li>
                    <li><p>
                        Currency derivatives
                        </p></li>
                   
                </ul>
                    </div>
                    <div className='col-6'>
                        <ul>
                    <li><p>
                        Stockes & IPOs
                        </p></li>
                    <li><p>
                        Direct Mutual Funds
                        </p></li>
                    <li><p>
                        Bonds and Govt. Securities
                        </p></li>
                   
                </ul>
                    </div>
                  
                </div>
                <img style={{width:"90%"}} src='media\images\pressLogos.png'/>
            </div>
        </div>
       </div>
     );
}

export default Awards;