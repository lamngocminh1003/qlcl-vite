import React from "react";

function ExampleCarouselImage({ imageUrl, altText }) {
  return (
    <div style={{ textAlign: "center", height: "300px", overflow: "hidden" }}>
      <img
        src={imageUrl}
        alt={altText || "Carousel Slide"}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

export default ExampleCarouselImage;
