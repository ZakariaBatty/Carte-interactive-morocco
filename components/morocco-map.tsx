"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import { GeometryCollection, GeometryObject } from "topojson-specification"
import type { Region } from "@/types/region"
import { AquacultureDashboard } from "./aquaculture-dashboard"
import { motion } from "framer-motion"
import moroccoMap from "../data/morocco-regions.json"
import worldMap from "../data/wolrd-regions.json"

import { Topology } from "@/types/morocco"
import ProjectStatisticCard from "./shart-map"

export type TopologyWolrd = {
  type: 'Topology';
  objects: {
    countries: GeometryCollection;
    land: GeometryCollection;
  };
  arcs: number[][][];
};

export type Geometry = GeometryObject & {
  type: 'Polygon' | 'MultiPolygon';
  arcs: number[][][];
  id?: string;
  properties?: {
    name: string;
  };
};

export function MoroccoMap() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 800
    const height = 800

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;")

    svg.selectAll("*").remove()

    const loadMap = async () => {
      const [worldData, moroccoData] = await Promise.all([
        Promise.resolve(worldMap),
        Promise.resolve(moroccoMap) as Promise<Topology>,
      ]);

      if (!worldData || !moroccoData) return;

      const world = topojson.feature(worldData as unknown as TopologyWolrd, worldData.objects.countries as GeometryCollection);
      const morocco = topojson.feature(moroccoData as Topology, moroccoData.objects.regions);

      const projection = d3.geoMercator()
        .center([-7.0926, 31.7917]) // Center on Morocco
        .scale(2500) // Adjust scale as needed
        .translate([width / 1.7, height / 3]);

      const pathGenerator = d3.geoPath().projection(projection);

      const mapGroup = svg.append("g");

      mapGroup.append("rect").attr("width", width).attr("height", height).attr("fill", "#0c4a6e");

      mapGroup
        .append("g")
        .selectAll("path")
        .data(world.features)
        .enter()
        .append("path")
        .attr("d", pathGenerator)
        .attr("fill", "#d4b483")
        .attr("stroke", "white")
        .attr("stroke-width", 0.5)
        .on("click", (event, d) => {
          console.log(d);
          setSelectedRegion({ id: "MA_00", properties: { "name:en": "Morocco", "name:ar": "المغرب", "name:fr": "Maroc", id: "MA_00" } });
          setOpen(false)
          svg.selectAll(".radial-viz").remove();
        });

      mapGroup
        .append("g")
        .selectAll("path")
        .data(morocco.features)
        .enter()
        .append("path")
        .attr("d", pathGenerator)
        .attr("fill", "#d4b483")
        .attr("stroke", "white")
        .attr("stroke-width", 0.5)
        .attr("class", "region transition-colors duration-200")
        .style("cursor", "pointer")
        .on("mouseover", function () {
          d3.select(this).attr("fill", "#c19d6f");
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", "#d4b483");
        })
        .on("click", (event, d) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const region = d as any;
          setSelectedRegion(region);
          setOpen(true)
          const center = pathGenerator.centroid(d);
          const radius = 100;
          svg.selectAll(".radial-viz").remove();

          const radialGroup = svg
            .append("g")
            .attr("class", "radial-viz")
            .attr("transform", `translate(${center[0]}, ${center[1]})`);

          const zones = [
            { radius: radius * 0.4, color: "#38bdf8" },
            { radius: radius * 0.6, color: "#7dd3fc" },
            { radius: radius * 0.8, color: "#bae6fd" },
            { radius: radius, color: "#e0f2fe" },
          ];

          zones.forEach((zone) => {
            radialGroup
              .append("circle")
              .attr("r", zone.radius)
              .attr("fill", "none")
              .attr("stroke", zone.color)
              .attr("stroke-width", 2)
              .attr("opacity", 0.7)
              .style("position", "absolute")
              .style("z-index", "100");
          });

          // Define a clipPath for the circle
          radialGroup
            .append("clipPath")
            .attr("id", "clip-circle")
            .append("circle")
            .attr("r", radius * 0.8); // Use the radius of the second circle

          // Add an image in the center and clip it to the circle
          radialGroup
            .append("image")
            .attr("xlink:href", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsmaVwuESg1GcpzDhkxmdBk1I_J-3nvVPOSw&s")
            .attr("x", -radius * 0.8)
            .attr("y", -radius * 0.8)
            .attr("width", radius * 1.6)
            .attr("height", radius * 1.6)
            .attr("clip-path", "url(#clip-circle)");

          // Add another border circle around the image
          radialGroup
            .append("circle")
            .attr("r", radius * 0.8)
            .attr("fill", "none")
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 2)
            .attr("opacity", 0.9);

          radialGroup
            .append("foreignObject")
            .attr("x", `${region.id === "MA_05" ? -400 : region.id === "MA_01" ? -420 : region.id === "MA_02" ? -110 : region.id === "MA_07" ? -500 : -380}`)
            .attr("y", `${region.id === "MA_01" ? 10 : region.id === "MA_05" ? -100 : region.id === "MA_02" ? 112 : region.id === "MA_07" ? 30 : -130}`)
            .attr("width", 300)
            .attr("height", 80)
            .html(`
            <div style="text-align: center; color: white;">
              <p style="font-size: 16px; font-weight: bold; background: black; padding: 6px 12px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                20 <span style="font-weight: normal;">Projets Aquacole</span>
              </p>
              <div style="background: #3BAFDA; padding: 6px 12px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: 6px;">
                ${region.properties['name']}
              </div>
            </div>
          `);
        });
    };

    loadMap()
  }, [])

  const regionStats = selectedRegion ? selectedRegion.properties['name:en'] : null
  const idStats = selectedRegion ? selectedRegion.id : "MA_00"

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[#0c4a6e]"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
        />
        <motion.div
          className="absolute inset-0 w-full"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <div className="h-full ">
            <svg ref={svgRef} className="w-full max-h-screen"></svg>
          </div>
          <div className="h-full">
            <AquacultureDashboard regionName={regionStats} stats={idStats} />
          </div>
        </motion.div>
      </div>
      {open && <ProjectStatisticCard vd={idStats} />}
    </>
  )
}
