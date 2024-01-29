import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonMegaImageMobile = (props: any) => (
  <ContentLoader
    speed={2}
    width="100%"
    height="350"
    viewBox="0 0 1200 1200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="13" ry="13" width="100%" height="100%" />
  </ContentLoader>
);

export default SkeletonMegaImageMobile;
