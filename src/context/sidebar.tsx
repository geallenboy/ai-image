import {
  CreditCard,
  Frame,
  Images,
  Layers,
  Settings2,
  SquareTerminal,
} from "lucide-react";

export const navList = {
  en: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Generate Image",
      url: "/image-generation",
      icon: Images,
    },
    {
      title: "My Models",
      url: "/models",
      icon: Frame,
    },
    {
      title: "Train Model",
      url: "/model-training",
      icon: Layers,
    },
    {
      title: "My Images",
      url: "/gallery",
      icon: Images,
    },
    {
      title: "Billing",
      url: "/billing",
      icon: CreditCard,
    },
    {
      title: "Settings",
      url: "/account-settings",
      icon: Settings2,
    },
  ],
  zh: [
    {
      title: "仪表盘",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "生成图片",
      url: "/image-generation",
      icon: Images,
    },
    {
      title: "我的模型",
      url: "/models",
      icon: Frame,
    },
    {
      title: "训练模型",
      url: "/model-training",
      icon: Layers,
    },
    {
      title: "我的图片",
      url: "/gallery",
      icon: Images,
    },
    {
      title: "账单",
      url: "/billing",
      icon: CreditCard,
    },
    {
      title: "设置",
      url: "/account-settings",
      icon: Settings2,
    },
  ],
};
