import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreditCardIcon, PlusIcon, Wand2Icon } from "lucide-react";
import { useTranslations } from "next-intl";

const QuickAction = () => {
  const quickActionT = useTranslations("dashboard.quickAction");
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm text-muted-foreground">
          {quickActionT("title")}
        </CardTitle>
        <CardDescription>{quickActionT("desc")}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button asChild className="w-full">
          <Link href={"/image-generation"}>
            <Wand2Icon className="w-4 h-4 mr-2" />
            {quickActionT("name1")}
          </Link>
        </Button>
        <Button asChild className="w-full" variant={"destructive"}>
          <Link href={"/model-training"}>
            <PlusIcon className="w-4 h-4 mr-2" />
            {quickActionT("name2")}
          </Link>
        </Button>
        <Button asChild className="w-full" variant={"secondary"}>
          <Link href={"/billing"}>
            <CreditCardIcon className="w-4 h-4 mr-2" />
            {quickActionT("name3")}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickAction;
