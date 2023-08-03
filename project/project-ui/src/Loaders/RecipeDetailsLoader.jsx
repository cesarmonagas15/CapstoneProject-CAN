import React from "react";
import ContentLoader from "react-content-loader";

const RecipeDetailsLoader = (props) => (
  <ContentLoader
    width={1500}
    height={800}
    viewBox="0 0 800 600"
    backgroundColor = {'#D3D3D3'}
    foregroundColor="#dedede"
    {...props}
  >
    <rect x="270" y="20" rx="5" ry="5" width="500" height="350" /> // Image
    <rect x="365" y="400" rx="4" ry="4" width="300" height="20" /> // Title
    <rect x="50" y="460" rx="4" ry="4" width="500" height="10" /> // Description
    line 1
    <rect x="50" y="480" rx="4" ry="4" width="500" height="10" /> // Description
    line 2
    <rect x="50" y="500" rx="4" ry="4" width="500" height="10" /> // Description
    line 3
    <rect x="50" y="520" rx="4" ry="4" width="500" height="10" /> // Description
    line 4
  </ContentLoader>
);

export default RecipeDetailsLoader;
