import React from "react";

function RightSection({ imageURL, productName, productDescription, learnMore }) {
  return (
    <div className="container pt-5 pb-5">
      {/* Reverses column order on mobile so image is always on top */}
      <div className="row align-items-center flex-column-reverse flex-md-row">
        
        {/* Text Section */}
        <div className="col-12 col-md-6 p-4 mt-4 mt-md-0">
          <h1>{productName}</h1>
          <p className="mt-3">{productDescription}</p>
          <div className="mt-4">
            <a href={learnMore} style={{ textDecoration: "none" }}>Learn More</a>
          </div>
        </div>

        {/* Image Section */}
        <div className="col-12 col-md-6 p-3 text-center">
          <img src={imageURL} alt={productName} className="img-fluid" />
        </div>

      </div>
    </div>
  );
}

export default RightSection;