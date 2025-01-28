import Image from "next/image";
import { Play } from "lucide-react";

const ProjectStatisticCard = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Video Card */}
      <div className="absolute bottom-32 left-[50%] bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="relative w-64 h-40">
          <Image
            src="/your-video-thumbnail.jpg"
            alt="Aquaculture Video"
            layout="fill"
            objectFit="cover"
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Play size={48} className="text-white opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatisticCard;
