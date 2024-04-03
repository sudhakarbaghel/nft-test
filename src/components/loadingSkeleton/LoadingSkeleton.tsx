import React from "react";
import "./loadingSkeleton.css";
import { logoSrc } from "@/assets";
import { Skeleton, Stack } from "@chakra-ui/react";
type Props = {};

const LoadingSkeleton = (props: Props) => {
  return (
    <div>
      <div className="card skeleton">
        <Skeleton height="200px" />
        <div className="card-title">
          <Skeleton height="20px" />
        </div>
      </div>
    </div>
  );
};
export default LoadingSkeleton;
