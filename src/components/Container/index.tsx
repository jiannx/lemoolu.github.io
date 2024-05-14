import React from "react";

export default function Container({ className, children }: {
  className?: string;
  children?: any
}) {
  return (
    <div className={className}>
      <div className={`max-w-7xl mx-auto px-4`}>
        {children}
      </div>
    </div>
  );
}
