import { MoroccoMap } from "@/components/morocco-map"
// import { RegionSidebar } from "@/components/region-sidebar"

export default function Home() {
  return (
    <div className="flex">
      {/* <RegionSidebar /> */}
      {/* <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto space-y-8"> */}
      <MoroccoMap />
      {/* </div>
      </main> */}
    </div>
  )
}

