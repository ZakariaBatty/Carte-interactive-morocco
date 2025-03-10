"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";


const dataSet: Record<string, { superficieTotal: number; superficieLibre: number; nombreParcelsTotal: number; nombreParcelsLibre: number; nombreProjetsTotal: number; nombreProjetsInstalles: number }> = {
  // morocco
  MA_00: { superficieTotal: 24107, superficieLibre: 12345, nombreParcelsTotal: 1576, nombreParcelsLibre: 680, nombreProjetsTotal: 497, nombreProjetsInstalles: 175 },
  //MA_01 Tanger-Tétouan-Al Hoceïma
  MA_01: { superficieTotal: 487, superficieLibre: 270, nombreParcelsTotal: 24, nombreParcelsLibre: 12, nombreProjetsTotal: 16, nombreProjetsInstalles: 7 },
  //MA_02 L'Oriental
  MA_02: { superficieTotal: 2242, superficieLibre: 1330, nombreParcelsTotal: 124, nombreParcelsLibre: 74, nombreProjetsTotal: 18, nombreProjetsInstalles: 6 },
  //MA_03 Souss-Massa
  MA_03: { superficieTotal: 5748, superficieLibre: 3870, nombreParcelsTotal: 255, nombreParcelsLibre: 138, nombreProjetsTotal: 44, nombreProjetsInstalles: 12 },
  //MA_04 Guelmim-Oued Noun
  MA_04: { superficieTotal: 1800, superficieLibre: 795, nombreParcelsTotal: 104, nombreParcelsLibre: 53, nombreProjetsTotal: 12, nombreProjetsInstalles: 2 },
  // MA_05 Casablanca-Settat
  MA_05: { superficieTotal: 611, superficieLibre: 580, nombreParcelsTotal: 65, nombreParcelsLibre: 32, nombreProjetsTotal: 11, nombreProjetsInstalles: 9 },
  //MA_06 Marrakech-Safi
  MA_06: { superficieTotal: 6060, superficieLibre: 5270, nombreParcelsTotal: 300, nombreParcelsLibre: 260, nombreProjetsTotal: 5, nombreProjetsInstalles: 1 },
  //MA_07 Laâyoune-Sakia El Hamra
  MA_07: { superficieTotal: 735, superficieLibre: 570, nombreParcelsTotal: 49, nombreParcelsLibre: 38, nombreProjetsTotal: 2, nombreProjetsInstalles: 0 },
  //MA_08 Dakhla-Oued Ed-Dahab
  MA_08: { superficieTotal: 6424, superficieLibre: 1640, nombreParcelsTotal: 655, nombreParcelsLibre: 73, nombreProjetsTotal: 390, nombreProjetsInstalles: 138 },
};

const dataVd: Record<string, { vds: string }> = {
  //MA_01 Tanger-Tétouan-Al Hoceïma
  MA_01: { vds: "https://www.youtube.com/embed/2qOD7RgnAFc?si=7yZtj3Dn04QLe4Kn;start=3" },
  //MA_02 L'Oriental
  MA_02: { vds: "https://www.youtube.com/embed/PCuNSqFWiKI?si=LGHzYc7eoAxlgCth;start=3" },
  //MA_03 Souss-Massa
  MA_03: { vds: "https://www.youtube.com/embed/Pjd7L4hGJ48?si=aVvQV-hk71UrE3v8;start=3" },
  //MA_04 Guelmim-Oued Noun
  MA_04: { vds: "/morocco/guelmim.jpg" },
  // MA_05 Casablanca-Settat
  MA_05: { vds: "https://www.youtube.com/embed/qdawQWV7NVY?si=6wAEHIkto9oZPAi9;start=3" },
  //MA_06 Marrakech-Safi
  MA_06: { vds: "https://www.youtube.com/embed/gn33_WHLKvc?si=TOd9Vpc_uyWwc02x;start=3" },
  //MA_07 Laâyoune-Sakia El Hamra
  MA_07: { vds: "https://www.youtube.com/embed/2qOD7RgnAFc?si=7yZtj3Dn04QLe4Kn;start=3" },
  //MA_08 Dakhla-Oued Ed-Dahab
  MA_08: { vds: "https://www.youtube.com/embed/8XNgn5Ta9bA?si=wszpycjJg8EIFLKk;start=3" },
};


interface ProjectStatisticCardProps {
  vd: string;
}

const ProjectStatisticCard: React.FC<ProjectStatisticCardProps> = ({ vd }) => {


  const [isOpen, setIsOpen] = useState(false);

  const stats = dataSet[vd] || { superficieTotal: 0, superficieLibre: 0, nombreParcelsTotal: 0, nombreParcelsLibre: 0, nombreProjetsTotal: 0, nombreProjetsInstalles: 0 };

  // get vds by id
  const vds = dataVd[vd]?.vds;
  const isYouTube = vds?.includes("youtube.com");

  const getYouTubeId = (url: string): string | null => {
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/)([^&?#]+))/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };


  // <div className={cn("absolute left-[55%] shadow-xl rounded-lg overflow-hidden",
  //   vd === "MA_01" ? "bottom-72" :
  //     vd === "MA_02" ? "bottom-52" :
  //       vd === "MA_03" ? "bottom-32" :
  //         vd === "MA_04" ? "bottom-11" :
  //           vd === "MA_05" ? "bottom-72" :
  //             vd === "MA_06" ? "bottom-72" :
  //               vd === "MA_07" ? "bottom-72" : "bottom-11"
  // )}>

  return (
    <>
      {
        vd !== "MA_00" && (
          <div className={cn("absolute left-[51%] shadow-xl rounded-lg overflow-hidden bottom-11")}>
            <div className="relative w-[33rem] h-[19rem]">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Play size={48} className="text-white opacity-80 cursor-pointer" />
                </DialogTrigger>

                {isYouTube ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`https://img.youtube.com/vi/${getYouTubeId(vds)}/hqdefault.jpg`}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover" />
                ) : (
                  <Image
                    src={vds}
                    alt="test"
                    width={4000}
                    height={3000}
                    className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
                  />
                )}

                <DialogContent className="max-w-4xl p-0 bg-black">
                  {isYouTube ? (
                    <iframe
                      width="100%"
                      height="500"
                      src={vds}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                  ) : (
                    <Image
                      src={vds}
                      alt="test"
                      width={4000}
                      height={3000}
                      className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
                    />
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )
      }

      <div className="absolute top-4 left-4 rounded-lg overflow-hidden">
        <div className="w-full  max-w-2xl mx-auto text-white space-y-8 p-4">
          {/* First Chart */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Indicateurs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Nombre de Parcels */}
              <div className="space-y-2 pb-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Superficie ({stats.superficieTotal} Ha)</span>
                </div>
                <div className="flex w-full  h-6 text-white text-center rounded-full overflow-hidden">
                  <div className="bg-[#46bfdd] h-full" style={{ width: `${(stats.superficieTotal - stats.superficieLibre) / stats.superficieTotal * 100}%` }} >{stats.superficieTotal - stats.superficieLibre}</div>
                  <div className="bg-[#8a9a9e] h-full" style={{ width: `${(stats.superficieLibre / stats.superficieTotal) * 100}%` }} >{stats.superficieLibre}</div>
                </div>
              </div>

              {/* Superficie */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Nombre de parcelles ({stats.nombreParcelsTotal})</span>
                </div>
                <div className="flex w-full  h-6 text-white text-center rounded-full overflow-hidden">
                  <div className="bg-[#46bfdd] h-full" style={{ width: `${(stats.nombreParcelsTotal - stats.nombreParcelsLibre) / stats.nombreParcelsTotal * 100}%` }} >{stats.nombreParcelsTotal - stats.nombreParcelsLibre}</div>
                  <div className="bg-[#8a9a9e] h-full" style={{ width: `${(stats.nombreParcelsLibre / stats.nombreParcelsTotal) * 100}%` }} >{stats.nombreParcelsLibre}</div>
                </div>
              </div>

              <div className="flex justify-center gap-20">
                <div className="flex items-center gap-2" />
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#46bfdd] rounded" />
                  <span className="text-sm text-muted-foreground">Attribuée</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#8a9a9e] rounded" />
                  <span className="text-sm text-muted-foreground">Libre</span>
                </div>
                <div className="flex items-center gap-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Projets ({stats.nombreProjetsTotal - stats.nombreProjetsInstalles})</span>
                </div>
                <div className="flex w-full  h-6 text-white text-center rounded-full overflow-hidden">
                  <div className="bg-[#b7886a] h-full" style={{ width: `${(stats.nombreProjetsInstalles / stats.nombreProjetsTotal) * 100}%` }} >{stats.nombreProjetsInstalles}</div>
                  <div className="bg-[#ff9500] h-full" style={{ width: `${(stats.nombreProjetsTotal - stats.nombreProjetsInstalles) / stats.nombreProjetsTotal * 100}%` }} >{stats.nombreProjetsTotal - stats.nombreProjetsInstalles}</div>
                </div>
              </div>

              <div className="flex justify-center gap-10">
                <div className="flex items-center gap-2" />
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#b7886a] rounded" />
                  <span className="text-sm text-muted-foreground">Projets installés </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#ff9500]  rounded" />
                  <span className="text-sm text-muted-foreground">Projets autorisés</span>
                </div>
                <div className="flex items-center gap-2" />
              </div>
            </CardContent>
          </Card>

          {/* Legend */}


        </div>
      </div>
    </>
  );
};

export default ProjectStatisticCard;
