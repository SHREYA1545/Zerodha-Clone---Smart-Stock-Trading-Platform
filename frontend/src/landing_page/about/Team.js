import React from 'react';

function Team() {
    return (
        <div className="container mt-5 mb-5">
            {/* Main Header */}
            <div className="text-center mb-5">
                <h1 className="fs-2 fw-bold">People</h1>
            </div>

            {/* Team Member Section */}
            <div className="row align-items-center justify-content-center p-3 p-md-5">
                
                {/* Image Column */}
                <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
                    <img 
                        src="D:\Apna_College_Backend\Zerodha-Apna_College\frontend\src\landing_page\about\nithin-kamath.jpgD:\Apna_College_Backend\Zerodha-Apna_College\frontend\src\landing_page\about\Shreya Shirke ID_photo.jpg" 
                        alt="Nithin Kamath"
                        className="rounded-circle shadow-sm" 
                        style={{ 
                            width: "280px", 
                            height: "280px", 
                            objectFit: "cover" 
                        }} 
                    /> 
                    <p>Shreya Shirke</p>
                    <p>Founder, CEO</p>
                </div>

                {/* Text Column */}
                <div className="col-12 col-md-6 fs-6 text-center text-md-start">
                    <h2 className="pb-3 fw-semibold">Nithin Kamath</h2>
                    
                    <p className="mt-3 text-muted">
                        Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade-long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.
                    </p>
                    <p className="text-muted">
                        He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).
                    </p>
                    <p className="text-muted">
                        Playing basketball is his zen.
                    </p>
                    <p className="mt-4">
                        Connect on <a href="/" style={{ textDecoration: "none" }}>Homepage</a> /{' '}
                        <a href="/" style={{ textDecoration: "none" }}>TradingQnA</a> /{' '}
                        <a href="/" style={{ textDecoration: "none" }}>Twitter</a>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Team;