"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const ProjectStatisticCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="absolute bottom-10 left-[50%]  shadow-xl rounded-lg overflow-hidden">
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
      <div className="absolute top-4 left-4  shadow-xl rounded-lg overflow-hidden">
        <div className="w-full max-w-2xl mx-auto bg-white space-y-8 p-4">
          {/* First Chart */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Graphique Animé des données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Nombre de parcels</span>
                </div>
                <div className="flex w-full h-4 rounded-full overflow-hidden">
                  <div className="bg-teal-900 h-full" style={{ width: "35%" }} />
                  <div className="bg-cyan-400 h-full" style={{ width: "65%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Superficie</span>
                </div>
                <div className="flex w-full h-4 rounded-full overflow-hidden">
                  <div className="bg-teal-900 h-full" style={{ width: "40%" }} />
                  <div className="bg-cyan-400 h-full" style={{ width: "60%" }} />
                </div>
              </div>

              <div className="grid grid-cols-11 gap-0 text-xs text-muted-foreground mt-2">
                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value) => (
                  <div key={value} className="text-center">
                    {value}%
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Legend */}
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-teal-900 rounded" />
              <span className="text-sm text-muted-foreground">Litre</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-400 rounded" />
              <span className="text-sm text-muted-foreground">Potentiel</span>
            </div>
          </div>

          {/* Second Chart */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Graphique Animé des données</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Projets</span>
                  </div>
                  <div className="flex w-full h-4 rounded-full overflow-hidden">
                    <div className="bg-teal-900 h-full" style={{ width: "45%" }} />
                    <div className="bg-cyan-400 h-full" style={{ width: "55%" }} />
                  </div>
                </div>

                <div className="grid grid-cols-11 gap-0 text-xs text-muted-foreground mt-2">
                  {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value) => (
                    <div key={value} className="text-center">
                      {value}%
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-teal-900 rounded" />
              <span className="text-sm text-muted-foreground">Litre</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-400 rounded" />
              <span className="text-sm text-muted-foreground">Potentiel</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectStatisticCard;
