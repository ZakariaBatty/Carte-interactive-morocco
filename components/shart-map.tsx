"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";


const dataSet: Record<string, { superficieTotal: number; superficieLibre: number; nombreParcelsTotal: number; nombreParcelsLibre: number; nombreProjetsTotal: number; nombreProjetsInstalles: number }> = {
  //MA_01 Tanger-Tétouan-Al Hoceïma
  MA_01: { superficieTotal: 487, superficieLibre: 270, nombreParcelsTotal: 24, nombreParcelsLibre: 12, nombreProjetsTotal: 16, nombreProjetsInstalles: 7 },
  //MA_02 L'Oriental
  MA_02: { superficieTotal: 2242, superficieLibre: 1330, nombreParcelsTotal: 124, nombreParcelsLibre: 74, nombreProjetsTotal: 18, nombreProjetsInstalles: 6 },
  //MA_03 Souss-Massa
  MA_03: { superficieTotal: 5748, superficieLibre: 2070, nombreParcelsTotal: 255, nombreParcelsLibre: 138, nombreProjetsTotal: 47, nombreProjetsInstalles: 15 },
  //MA_04 Guelmim-Oued Noun
  MA_04: { superficieTotal: 1800, superficieLibre: 795, nombreParcelsTotal: 104, nombreParcelsLibre: 53, nombreProjetsTotal: 12, nombreProjetsInstalles: 2 },
  // MA_05 Casablanca-Settat
  MA_05: { superficieTotal: 611, superficieLibre: 580, nombreParcelsTotal: 65, nombreParcelsLibre: 32, nombreProjetsTotal: 11, nombreProjetsInstalles: 9 },
  //MA_06 Marrakech-Safi
  MA_06: { superficieTotal: 6060, superficieLibre: 5270, nombreParcelsTotal: 300, nombreParcelsLibre: 260, nombreProjetsTotal: 5, nombreProjetsInstalles: 1 },
  //MA_07 Laâyoune-Sakia El Hamra
  MA_07: { superficieTotal: 735, superficieLibre: 570, nombreParcelsTotal: 49, nombreParcelsLibre: 38, nombreProjetsTotal: 2, nombreProjetsInstalles: 1 },
  //MA_08 Dakhla-Oued Ed-Dahab
  MA_08: { superficieTotal: 6424, superficieLibre: 1640, nombreParcelsTotal: 655, nombreParcelsLibre: 73, nombreProjetsTotal: 388, nombreProjetsInstalles: 136 },
};

interface ProjectStatisticCardProps {
  vd: string;
}

const ProjectStatisticCard: React.FC<ProjectStatisticCardProps> = ({ vd }) => {


  const [isOpen, setIsOpen] = useState(false);

  const stats = dataSet[vd] || { superficieTotal: 0, superficieLibre: 0, nombreParcelsTotal: 0, nombreParcelsLibre: 0, nombreProjetsTotal: 0, nombreProjetsInstalles: 0 };

  return (
    <>
      <div className="absolute bottom-10 left-[55%] shadow-xl rounded-lg overflow-hidden">
        <div className="relative w-96 h-56">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="absolute inset-0 flex items-center justify-center bg-black/40">
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

      <div className="absolute top-4 left-4 rounded-lg overflow-hidden">
        <div className="w-full max-w-2xl mx-auto text-white space-y-8 p-4">
          {/* First Chart */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Graphique Animé des données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Nombre de Parcels */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Superficie (Ha)</span>
                </div>
                <div className="flex w-full  h-6 text-white text-center rounded-full overflow-hidden">
                  <div className="bg-[#46bfdd] h-full" style={{ width: `${(stats.superficieTotal - stats.superficieLibre) / stats.superficieTotal * 100}%` }} >{stats.superficieTotal - stats.superficieLibre}</div>
                  <div className="bg-[#8a9a9e] h-full" style={{ width: `${(stats.superficieLibre / stats.superficieTotal) * 100}%` }} >{stats.superficieLibre}</div>
                </div>
              </div>

              {/* Superficie */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Nombre de parcels</span>
                </div>
                <div className="flex w-full  h-6 text-white text-center rounded-full overflow-hidden">
                  <div className="bg-[#46bfdd] h-full" style={{ width: `${(stats.nombreParcelsTotal - stats.nombreParcelsLibre) / stats.nombreParcelsTotal * 100}%` }} >{stats.nombreParcelsTotal - stats.nombreParcelsLibre}</div>
                  <div className="bg-[#8a9a9e] h-full" style={{ width: `${(stats.nombreParcelsLibre / stats.nombreParcelsTotal) * 100}%` }} >{stats.nombreParcelsLibre}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Projets</span>
                </div>
                <div className="flex w-full  h-6 text-white text-center rounded-full overflow-hidden">
                  <div className="bg-[#b7886a] h-full" style={{ width: `${(stats.nombreProjetsInstalles / stats.nombreProjetsTotal) * 100}%` }} >{stats.nombreProjetsInstalles}</div>
                  <div className="bg-[#ff9500] h-full" style={{ width: `${(stats.nombreProjetsTotal - stats.nombreProjetsInstalles) / stats.nombreProjetsTotal * 100}%` }} >{stats.nombreProjetsTotal - stats.nombreProjetsInstalles}</div>
                </div>
              </div>

            </CardContent>
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#8a9a9e] rounded" />
                <span className="text-sm text-muted-foreground">Libre</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#46bfdd] rounded" />
                <span className="text-sm text-muted-foreground">Potentiel</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#b7886a] rounded" />
                <span className="text-sm text-muted-foreground">Projets installés </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#ff9500]  rounded" />
                <span className="text-sm text-muted-foreground">Projets autorisés</span>
              </div>
            </div>
          </Card>

          {/* Legend */}


        </div>
      </div>
    </>
  );
};

export default ProjectStatisticCard;
