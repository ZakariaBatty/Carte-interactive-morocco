"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ProjectStatisticCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-10 left-[50%] bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="relative w-80 h-48">
        {/* Dialog Trigger */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="absolute inset-0 flex items-center justify-center bg-black/40 ">
            <Play size={48} className="text-white opacity-80 cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0 bg-black">
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/d6NSAozTV3I?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProjectStatisticCard;
