import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonLittleImage = (props: any) => (
  <ContentLoader
    speed={2}
    width={94}
    height={72}
    viewBox="0 0 94 72"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="13" ry="13" width="94" height="72" />
  </ContentLoader>
);

export default SkeletonLittleImage;
