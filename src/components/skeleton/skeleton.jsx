import React from 'react';
import ContentLoader from 'react-content-loader';

export default function Skeleton() {
  return (
    <ContentLoader
      speed={2}
      width={150}
      height={300}
      viewBox="0 0 150 300"
      backgroundColor="#f3f2f2"
      foregroundColor="#dbdbdb">
      <rect x="2" y="7" rx="0" ry="0" width="213" height="27" />
      <rect x="45" y="40" rx="4" ry="4" width="34" height="22" />
      <rect x="9" y="212" rx="0" ry="0" width="210" height="114" />
      <rect x="45" y="73" rx="0" ry="0" width="125" height="125" />
      <rect x="3" y="40" rx="4" ry="4" width="34" height="22" />
    </ContentLoader>
  );
}
