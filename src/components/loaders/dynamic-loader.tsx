"use client";

import SpinnerLoader from "@/components/loaders/spinner-loader";

const DynamicLoader = ({
  containerClasses,
}: {
  containerClasses?: string;
} = {}) => {
  return <SpinnerLoader containerClasses={containerClasses} loaderProps={{ size: 16 }} />;
};

export default DynamicLoader;
