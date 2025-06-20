import React from "react";

export default function FoodSkeleton() {
  return (
    <div className="relative w-full h-fit">
      {/* Image Skeleton */}
      <div className="bg-gray-300 rounded-lg h-[250px] lg:h-[300px] w-full md:w-[90%] mx-auto animate-pulse"></div>
      
      {/* Button Skeleton */}
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-12 bg-gray-200 rounded-full animate-pulse"></div>
      
      {/* Details Skeleton */}
      <div className="mt-8 flex flex-col gap-2 lg:pl-4">
        {/* Category */}
        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        {/* Name */}
        <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
        {/* Price */}
        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
      </div>
    </div>
  );
}