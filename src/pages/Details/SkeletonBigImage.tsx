import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonBigImage = (props: any) => (
  <ContentLoader
    speed={2}
    width={900}
    height={606}
    viewBox="0 0 900 606"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="13" ry="13" width="808" height="606" />
  </ContentLoader>
);

export default SkeletonBigImage;
