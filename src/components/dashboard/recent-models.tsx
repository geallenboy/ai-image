import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Database } from "@datatypes.types";
import { Badge } from "@/components/ui/badge";

interface RecentmodelsProps {
  models: Database["public"]["Tables"]["models"]["Row"][];
}

const RecentModels = ({ models }: RecentmodelsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm text-muted-foreground">
          Recent Models
        </CardTitle>
        <CardDescription>Get started with common actions</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-4">
          {models.length === 0 ? (
            <p>No models trained yet</p>
          ) : (
            models.map((model) => {
              return (
                <div
                  key={model.id}
                  className="flex items-center justify-between space-x-4"
                >
                  <div>
                    <p className="text-sm font-medium">{model.model_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {model.gender}
                    </p>
                  </div>
                  <Badge
                    variant={getStatusVariant(model.training_status || "")}
                  >
                    {model.training_status}
                  </Badge>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentModels;

function getStatusVariant(status: string) {
  switch (status) {
    case "succeeded":
      return "default";
    case "processing":
    case "failed":
    case "canceled":
      return "destructive";
    default:
      return "secondary";
      break;
  }
}
