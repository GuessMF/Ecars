import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonMegaImage = (props: any) => (
  <ContentLoader
    speed={2}
    width={1200}
    height={606}
    viewBox="0 0 1200 606"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="13" ry="13" width="1200" height="606" />
  </ContentLoader>
);

export default SkeletonMegaImage;
