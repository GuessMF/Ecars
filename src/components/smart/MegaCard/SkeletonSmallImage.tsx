import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonSmallImage = (props: any) => (
  <ContentLoader
    speed={2}
    width={140}
    height={90}
    viewBox="0 0 140 90"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="13" ry="13" width="140" height="90" />
  </ContentLoader>
);

export default SkeletonSmallImage;
