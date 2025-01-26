/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import { RegionStats } from "./region-stats"
import regionsData from "../data/regions-data.json"
import { type Region } from "@/types/region"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"

export function MoroccoMap() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [isOpen, setIsOpen] = useState(false)

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
        d3.json<any>("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"),
        d3.json<any>("https://cdn.jsdelivr.net/npm/morocco-map/data/regions.json"),
      ])

      if (!worldData || !moroccoData) return

      const world = topojson.feature(worldData, worldData.objects.countries)
      const morocco = topojson.feature(moroccoData, moroccoData.objects.regions)

      const projection = d3.geoMercator().fitSize([width, height], morocco)

      const pathGenerator = d3.geoPath().projection(projection)

      const mapGroup = svg.append("g")

      mapGroup.append("rect").attr("width", width).attr("height", height).attr("fill", "#0c4a6e")

      mapGroup
        .append("g")
        .selectAll("path")
        .data(world.features)
        .enter()
        .append("path")
        .attr("d", pathGenerator)
        .attr("fill", (d) => {
          if (d.properties.continent === "Africa") {
            return "#d4b483"
          }
          return "#a3a3a3"
        })
        .attr("stroke", "white")
        .attr("stroke-width", 0.5)

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
          d3.select(this).attr("fill", "#c19d6f")
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", "#d4b483")
        })
        .on("click", (event, d) => {
          setSelectedRegion(d as Region)
          setIsOpen(true)

          if ((d as Region).properties.id === "souss-massa") {
            const center = pathGenerator.centroid(d)
            const radius = 100

            svg.selectAll(".radial-viz").remove()

            const radialGroup = svg
              .append("g")
              .attr("class", "radial-viz")
              .attr("transform", `translate(${center[0]}, ${center[1]})`)

            const zones = [
              { radius: radius * 0.4, color: "#38bdf8" },
              { radius: radius * 0.6, color: "#7dd3fc" },
              { radius: radius * 0.8, color: "#bae6fd" },
              { radius: radius, color: "#e0f2fe" },
            ]

            zones.forEach((zone, i) => {
              radialGroup
                .append("circle")
                .attr("r", zone.radius)
                .attr("fill", "none")
                .attr("stroke", zone.color)
                .attr("stroke-width", 2)
                .attr("opacity", 0.7)
            })
          }
        })
    }

    loadMap()
  }, [])

  const regionData = selectedRegion
    ? regionsData.regions[selectedRegion.properties.id as keyof typeof regionsData.regions]
    : null
  console.log("ziko", regionData)
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <svg ref={svgRef} className="w-full"></svg>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-[600px] sm:w-[540px] overflow-y-auto bg-[#1A2421] text-white">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-white">{selectedRegion?.properties["name:fr"]}</SheetTitle>
          </SheetHeader>
          {regionData && (
            <div className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#4FD1C5]">{regionData.projects} Projets Aquacole</h2>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-[#2A3B37]">
                <img
                  src={regionData.videoUrl || "/placeholder.svg"}
                  alt={`Preview of ${selectedRegion?.properties["name:fr"]}`}
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-white/90 p-4">
                    <svg className="h-6 w-6 text-[#4FD1C5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <RegionStats stats={regionData.stats} />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

