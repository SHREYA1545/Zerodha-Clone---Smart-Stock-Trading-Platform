import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container border-top pt-5 pb-5">
      <div className="row align-items-center">
        
        {/* Image: Full width on mobile, half width on desktop */}
        <div className="col-12 col-md-6 p-3 text-center">
          <img src={imageURL} alt={productName} className="img-fluid" />
        </div>
        
        {/* Text: Full width on mobile, half width on desktop */}
        <div className="col-12 col-md-6 p-4">
          <h1>{productName}</h1>
          <p className="mt-3">{productDescription}</p>
          
          <div className="mt-4">
            <a style={{ textDecoration: "none" }} href={tryDemo}>Try Demo</a> 
            <span className="mx-4"></span> {/* Horizontal spacing */}
            <a style={{ textDecoration: "none" }} href={learnMore}>Learn More</a>
          </div>
          
          <div className="mt-4">
            <a href={googlePlay}>
              <img src="media/images/googlePlayBadge.svg" alt="Google Play Badge" />
            </a>
            <span className="mx-3"></span> {/* Horizontal spacing */}
            <a href={appStore}>
              <img src="media/images/appstoreBadge.svg" alt="App Store Badge" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LeftSection;