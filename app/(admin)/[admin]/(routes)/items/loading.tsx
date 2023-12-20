"use client";

import { Loader } from "@/components/ui/loader";

const Loading = () => {
  return ( 
    <div className="flex items-center justify-center w-full h-full mt-6">
      <Loader />
    </div>
   );
}
 
export default Loading;