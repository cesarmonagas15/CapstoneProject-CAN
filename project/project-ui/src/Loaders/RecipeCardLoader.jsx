import React from "react";
import ContentLoader from "react-content-loader";

const RecipeCardLoader = (props) => (
  <ContentLoader viewBox="0 0 280 340" height={340} width={280} {...props} backgroundColor = {'#D3D3D3'}>
    {/* Recipe Image */}
    <rect x="0" y="0" rx="5" ry="5" width="280" height="200" />

    {/* Recipe Title */}
    <rect x="15" y="210" rx="5" ry="5" width="200" height="20" />

    {/* Recipe Details */}
    <rect x="20" y="260" rx="5" ry="5" width="80" height="15" />
    <rect x="105" y="260" rx="5" ry="5" width="70" height="15" />
    <rect x="180" y="260" rx="5" ry="5" width="90" height="15" />

    {/* Lines below Recipe Details */}
    <rect x="20" y="280" rx="5" ry="5" width="40" height="5" />
    <rect x="105" y="280" rx="5" ry="5" width="35" height="5" />
    <rect x="180" y="280" rx="5" ry="5" width="45" height="5" />

    {/* Circle Icon */}
    <circle cx="250" cy="230" r="15" />
  </ContentLoader>
);

export default RecipeCardLoader;
