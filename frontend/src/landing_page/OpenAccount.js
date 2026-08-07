import React from 'react';

function Openccount() {
    return ( 
        <div className='container mt-5 mb-5' >
            <div className='row' style={{display:"flex",alignItems:"center", justifyContent:"center"}}>
                <h3 style={{display:"flex",alignItems:"center", justifyContent:"center"}}>
                    Open a Zerodha account
                </h3>
                <p className='mt-2' style={{display:"flex",alignItems:"center", justifyContent:"center"}}>
                    Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
                </p>
                        <button className='p-2 btn btn-primary fs-5 mt-2' style={{ width:'30%', margin:'0 auto', display:"flex",alignItems:"center", justifyContent:"center"}}>Signup Now </button>

            </div>
        </div>
     );
}

export default Openccount;