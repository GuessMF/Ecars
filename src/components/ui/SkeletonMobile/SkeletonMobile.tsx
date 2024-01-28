import React from "react";
import ContentLoader from "react-content-loader";
const SkeletonMobile = () => (
  <ContentLoader
    speed={1}
    width="100%"
    height={450}
    viewBox="0 0 400 450"
    backgroundColor="#e5e6e5"
    foregroundColor="#f5f5f5"
  >
    <rect x="0" y="0" rx="11" ry="11" width="100%" height="250" />
    <rect x="5%" y="272" rx="5" ry="5" width="90%" height="17" />
    <rect x="5%" y="302" rx="5" ry="5" width="67" height="15" />
    <rect x="25%" y="302" rx="5" ry="5" width="84" height="15" />
    <rect x="50%" y="302" rx="5" ry="5" width="41" height="15" />
    <rect x="65%" y="302" rx="5" ry="5" width="114" height="15" />

    <rect x="5%" y="333" rx="10" ry="10" width="90%" height="65" />
    <rect x="77%" y="410" rx="5" ry="5" width="72" height="20" />
    <rect x="5%" y="410" rx="5" ry="5" width="136" height="20" />
  </ContentLoader>
);

export default SkeletonMobile;
