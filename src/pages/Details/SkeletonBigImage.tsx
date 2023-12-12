// import React from "react";
// import ContentLoader from "react-content-loader";
// const SkeletonBigImage = () => (
//   <ContentLoader
//     speed={1}
//     width={704}
//     height={225}
//     viewBox="0 0 704 225"
//     backgroundColor="#e5e6e5"
//     foregroundColor="#f5f5f5"
//   >
//     <rect x="320" y="15" rx="3" ry="3" width="130" height="20" />
//     <rect x="320" y="184" rx="3" ry="3" width="55" height="14" />
//     <rect x="320" y="55" rx="3" ry="3" width="360" height="18" />
//     <rect x="620" y="186" rx="3" ry="3" width="60" height="16" />
//     <rect x="320" y="95" rx="3" ry="3" width="360" height="65" />
//     <rect x="0" y="0" rx="8" ry="8" width="300" height="225" />
//   </ContentLoader>
// );

// export default SkeletonBigImage;
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
