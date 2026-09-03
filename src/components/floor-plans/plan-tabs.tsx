"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PlanViewer, type FloorPlan } from "@/components/floor-plans/plan-viewer"

interface PlanTabsProps {
  floors: FloorPlan[]
}

export function PlanTabs({ floors }: PlanTabsProps) {
  const firstId = floors[0]?.id

  return (
    <Tabs defaultValue={firstId} className="w-full">
      <TabsList className="mx-auto w-full max-w-md">
        {floors.map((floor) => (
          <TabsTrigger key={floor.id} value={floor.id}>
            {floor.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {floors.map((floor) => (
        <TabsContent key={floor.id} value={floor.id} className="mt-6">
          <PlanViewer floor={floor} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
