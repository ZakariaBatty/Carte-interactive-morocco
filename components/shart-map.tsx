import Image from "next/image";
import { Play } from "lucide-react";

const ProjectStatisticCard = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Map Background (Replace with Your Map Component) */}
      <div className="relative w-full h-full">
        {/* Placeholder for your Map */}
        <div className="bg-[#D2AD7E] w-full h-full absolute"></div>
      </div>

      {/* Statistic Card */}
      <div className="absolute bottom-32 left-[20%] text-white  ">
        <p className="text-lg font-bold bg-black px-4 py-2 rounded-lg shadow-lg ">20 <span className="font-normal">Projets Aquacole</span></p>
        <div className="bg-[#3BAFDA] text-white px-4 py-2 rounded-lg shadow-lg mt-2 ">
          Souss-Massa
        </div>
      </div>

      {/* Circular Image Overlay */}
      {/* <div className="absolute top-40 left-32 w-20 h-20 rounded-full overflow-hidden border-4 border-yellow-400">
        <Image src="/your-location-image.jpg" alt="Souss-Massa" width={80} height={80} />
      </div> */}

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
