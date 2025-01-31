"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const dataSet: Record<string, { nombreParcels: number; superficie: number; projets: number }> = {
  //MA_01 Tanger-Tétouan-Al Hoceïma
  MA_01: { nombreParcels: 35, superficie: 40, projets: 45 },
  //MA_02 L'Oriental
  MA_02: { nombreParcels: 50, superficie: 55, projets: 60 },
  //MA_03 Souss-Massa
  MA_03: { nombreParcels: 25, superficie: 30, projets: 35 },
  //MA_04 Guelmim-Oued Noun
  MA_04: { nombreParcels: 70, superficie: 80, projets: 75 },
  // MA_05 Casablanca-Settat
  MA_05: { nombreParcels: 40, superficie: 45, projets: 50 },
  //MA_06 Marrakech-Safi
  MA_06: { nombreParcels: 60, superficie: 65, projets: 70 },
  //MA_07 Laâyoune-Sakia El Hamra
  MA_07: { nombreParcels: 30, superficie: 35, projets: 40 },
  //MA_08 Dakhla-Oued Ed-Dahab
  MA_08: { nombreParcels: 80, superficie: 85, projets: 90 },
};
interface ProjectStatisticCardProps {
  vd: string;
}

const ProjectStatisticCard: React.FC<ProjectStatisticCardProps> = ({ vd }) => {


  const [isOpen, setIsOpen] = useState(false);

  const stats = dataSet[vd] || { nombreParcels: 0, superficie: 0, projets: 0 };

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
                  <span className="text-sm text-muted-foreground">Nombre de parcels</span>
                </div>
                <div className="flex w-full  h-6 text-white text-center rounded-full overflow-hidden">
                  <div className="bg-[#46bfdd] h-full" style={{ width: `${stats.nombreParcels}%` }} >{stats.nombreParcels}</div>
                  <div className="bg-[#8a9a9e] h-full" style={{ width: `${100 - stats.nombreParcels}%` }} >{100 - stats.nombreParcels}</div>
                </div>
              </div>

              {/* Superficie */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Superficie</span>
                </div>
                <div className="flex w-full  h-6 text-white text-center rounded-full overflow-hidden">
                  <div className="bg-[#46bfdd] h-full" style={{ width: `${stats.superficie}%` }} >{stats.superficie}</div>
                  <div className="bg-[#8a9a9e] h-full" style={{ width: `${100 - stats.superficie}%` }} >{100 - stats.superficie}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Projets</span>
                </div>
                <div className="flex w-full  h-6 text-white text-center rounded-full overflow-hidden">
                  <div className="bg-[#ff9500] h-full" style={{ width: `${stats.projets}%` }} >{stats.projets}</div>
                  <div className="bg-[#b7886a] h-full" style={{ width: `${100 - stats.projets}%` }} >{100 - stats.projets}</div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Legend */}
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#ff9500] rounded" />
              <span className="text-sm text-muted-foreground">Libre</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#b7886a] rounded" />
              <span className="text-sm text-muted-foreground">Potentiel</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#46bfdd] rounded" />
              <span className="text-sm text-muted-foreground">Projets installes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#8a9a9e] rounded" />
              <span className="text-sm text-muted-foreground">Projets autorisés</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProjectStatisticCard;
