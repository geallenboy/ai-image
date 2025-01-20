import {
  BrainCircuit,
  ChartNetwork,
  CreditCard,
  Database,
  ImageIcon,
  LayoutTemplate,
  Network,
  Package2,
  Palette,
} from "lucide-react";

import avatar1 from "@/public/avatars/AutumnTechFocus.jpeg";
import avatar2 from "@/public/avatars/Casual Creative Professional.jpeg";
import avatar3 from "@/public/avatars/Golden Hour Contemplation.jpeg";
import avatar4 from "@/public/avatars/Portrait of a Woman in Rust-Colored Top.jpeg";
import avatar5 from "@/public/avatars/Radiant Comfort.jpeg";
import avatar6 from "@/public/avatars/Relaxed Bearded Man with Tattoo at Cozy Cafe.jpeg";

export const faqsList: any = {
  en: [
    {
      question: "1. What is an AI SaaS Template?",
      answer:
        "An AI SaaS Template is a pre-built software framework designed for developing AI-driven SaaS (Software as a Service) applications. It integrates AI functionalities (such as text generation, image processing), user authentication, payment processing, data management, and deployment tools, helping developers quickly build and launch AI-driven applications.",
    },
    {
      question: "2. What are the core features of an AI SaaS Template?",
      answer:
        "The core features of an AI SaaS Template include pre-configured AI integrations (such as text generation, image processing), user authentication (e.g., Google OAuth), payment processing (e.g., Stripe integration), data management (e.g., Supabase real-time database), one-click deployment (supporting Vercel/Cloudflare), and business analytics (e.g., Google Analytics integration), enabling developers to rapidly build and optimize AI-driven SaaS applications.",
    },
    {
      question:
        "3. Why choose an AI SaaS Template instead of building from scratch?",
      answer:
        "Choosing an AI SaaS Template saves time, reduces costs, provides high-quality and flexible solutions, and accelerates time-to-market with one-click deployment and pre-built features, avoiding the need to redevelop common functionalities.",
    },
    {
      question: "4. What are the suitable use cases for an AI SaaS Template?",
      answer:
        "AI SaaS Templates are suitable for scenarios such as AI content generation, intelligent customer service, data analysis, personalized recommendations, and offering paid API services, meeting diverse business needs.",
    },
    {
      question:
        "5. How to deploy an AI SaaS Template to a production environment?",
      answer:
        "By configuring environment variables, selecting Vercel or Cloudflare for one-click deployment, verifying that functionalities work correctly, and using monitoring tools to optimize performance, you can quickly deploy an AI SaaS Template to a production environment.",
    },
    {
      question:
        "6. How can an AI SaaS Template help businesses achieve profitability?",
      answer:
        "An AI SaaS Template helps businesses achieve profitability through subscription models, API sales, credit systems, and business analytics tools, while supporting rapid iteration and optimization to enhance user retention and revenue growth.",
    },
  ],
  zh: [
    {
      question: "1. 什么是 AI SaaS 模板？",
      answer:
        "AI SaaS 模板是一个预先构建的软件框架，专为开发 AI 驱动的 SaaS（软件即服务）应用而设计。它集成了 AI 功能（如文本生成、图像处理）、用户认证、支付处理、数据管理和部署工具，帮助开发者快速构建和发布 AI 驱动的应用。",
    },
    {
      question: "2. AI SaaS 模板的核心功能有哪些？",
      answer:
        "AI SaaS 模板的核心功能包括预配置的 AI 集成（如文本生成、图像处理）、用户认证（如 Google OAuth）、支付处理（如 Stripe 集成）、数据管理（如 Supabase 实时数据库）、一键部署（支持 Vercel/Cloudflare）以及业务分析（如 Google Analytics 集成），帮助开发者快速构建和优化 AI 驱动的 SaaS 应用。",
    },
    {
      question: "3. 为什么选择 AI SaaS 模板而不是从头开发？",
      answer:
        "选择 AI SaaS 模板可以节省时间、降低成本，提供高质量且灵活的解决方案，同时通过一键部署和预置功能加速产品上市，避免重复开发通用功能。",
    },
    {
      question: "4. AI SaaS 模板适合哪些应用场景？",
      answer:
        "AI SaaS 模板适用于 AI 内容生成、智能客服、数据分析、个性化推荐以及提供付费 API 服务等场景，满足多样化的业务需求。",
    },
    {
      question: "5. 如何将 AI SaaS 模板部署到生产环境？",
      answer:
        "通过配置环境变量、选择 Vercel 或 Cloudflare 进行一键部署，并验证功能正常运行，最后利用监控工具优化性能，即可快速将 AI SaaS 模板部署到生产环境。",
    },
    {
      question: "6. AI SaaS 模板如何帮助企业实现盈利？",
      answer:
        "AI SaaS 模板通过订阅模式、API 销售、积分系统和业务分析工具，帮助企业实现盈利，同时支持快速迭代和优化，提升用户留存和收入增长。",
    },
  ],
};

export const featureList = {
  en: [
    {
      title: "Next.js Template",
      description:
        "Provides an SEO-friendly, multi-language, internationalized, and multi-module Next.js template to help developers quickly kickstart their projects. The template supports flexible configuration and extension, ensuring adaptability to various business needs while simplifying the development process and improving efficiency.",
      icon: <LayoutTemplate className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      title: "Authentication and Payments",
      description:
        "Google OAuth Integration: Offers one-click login functionality, allowing users to quickly register and log in using their Google accounts, simplifying the user authentication process. Stripe Payment Processing: Integrates Stripe to support global payment functionalities, including subscription services and one-time payments, meeting diverse business needs.",
      icon: <CreditCard className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      title: "Data Infrastructure",
      description:
        "Built-in Supabase Integration: Supabase provides instant data storage, authentication, and real-time database functionalities, helping developers manage data quickly and simplify backend development. Scalability: Supports dynamic scaling of data structures to adapt to applications of different sizes, ensuring the project can grow alongside business needs.",
      icon: <Database className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      title: "One-Click Deployment",
      description:
        "Vercel/Cloudflare Deployment Support: Simplifies the deployment process by enabling one-click deployment to quickly push projects to production environments, automating setup and optimizing deployment workflows. Automated Configuration: Pre-configured environment variables and services reduce human errors during deployment, ensuring stability and reliability.",
      icon: <Network className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      title: "Business Analytics",
      description:
        "Google Analytics and Search Console Integration: Tracks website traffic, user behavior, and growth data in real-time, helping developers and businesses make data-driven decisions. Growth Tracking: Built-in tracking tools monitor user growth and interactions for continuous optimization, enhancing user experience and business performance.",
      icon: <ChartNetwork className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      title: "AI Infrastructure",
      description:
        "Pre-configured AI Integrations: The template offers various pre-configured AI functionalities, such as text generation and image processing, helping developers quickly integrate AI capabilities into their projects. Credit System and API Sales: Includes a built-in credit system where users can access AI services or purchase API interfaces, supporting paid API calls to help developers and businesses monetize their offerings.",
      icon: <BrainCircuit className="w-6 h-6" strokeWidth={1.5} />,
    },
  ],
  zh: [
    {
      title: "Next.js 模板",
      description:
        "提供一个支持SEO友好、多语言、国际化的、多模块的Next.js模板，帮助开发者快速启动项目。模板支持灵活配置和扩展，确保适应不同的业务需求，同时简化开发流程，提升效率。",
      icon: <LayoutTemplate className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      title: "身份验证和支付",
      description:
        "Google OAuth 集成：提供一键登录功能，用户可以通过 Google 账户快速注册和登录，简化用户认证流程。Stripe 支付处理：集成 Stripe，支持全球范围内的支付功能，包括订阅服务、一次性支付等，满足多样化的商业需求。",
      icon: <CreditCard className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      title: "数据基础设施",
      description:
        "内置 Supabase 集成：Supabase 提供即时数据存储、认证和实时数据库功能，帮助开发者快速管理数据，简化后端开发。可扩展性：支持动态扩展数据结构，适应不同规模的应用需求，确保项目能够随着业务增长而扩展。",
      icon: <Database className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      title: "一键部署",
      description:
        "Vercel/Cloudflare 部署支持：简化部署过程，通过一键部署将项目快速推向生产环境，自动化设置并优化部署流程。自动化配置：预配置环境变量和服务，减少部署过程中的人为错误，确保部署的稳定性和可靠性。",
      icon: <Network className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      title: "业务分析",
      description:
        "Google Analytics 和 Search Console 集成：实时追踪网站流量、用户行为和增长数据，帮助开发者和企业做出数据驱动的决策。增长追踪：内置追踪工具，监控用户增长和互动，以便进行持续优化，提升用户体验和业务表现。",
      icon: <ChartNetwork className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      title: "AI基础设施",
      description:
        "预配置 AI 集成：模板提供多种预配置的 AI 集成功能，如文本生成、图像处理等，帮助开发者快速在项目中集成 AI 能力。积分系统与 API 销售：内置积分系统，用户可通过积分获得 AI 服务或购买 API 接口，支持 API 的付费调用，帮助开发者和企业实现盈利。",
      icon: <BrainCircuit className="w-6 h-6" strokeWidth={1.5} />,
    },
  ],
};

export const avatars = [
  {
    src: "/avatars/AutumnTechFocus.jpeg",
    fallback: "CN",
  },
  {
    src: "/avatars/Casual Creative Professional.jpeg",
    fallback: "AB",
  },
  {
    src: "/avatars/Golden Hour Contemplation.jpeg",
    fallback: "FG",
  },
  {
    src: "/avatars/Portrait of a Woman in Rust-Colored Top.jpeg",
    fallback: "PW",
  },
  {
    src: "/avatars/Radiant Comfort.jpeg",
    fallback: "RC",
  },
  {
    src: "/avatars/Relaxed Bearded Man with Tattoo at Cozy Cafe.jpeg",
    fallback: "RB",
  },
];

export const reviewsList = {
  en: [
    {
      name: "Jack Smith",
      username: "@jacksmith",
      body: "The dating profile photos I received transformed my online presence and boosted my matches significantly. Truly a game changer!",
      img: avatar1,
    },
    {
      name: "Jill Smith",
      username: "@jillsmith",
      body: "I was completely blown away by the results. This service exceeded all my expectations. Absolutely amazing!",
      img: avatar2,
    },
    {
      name: "John Doe",
      username: "@johndoe",
      body: "Using Photo AI for my LinkedIn profile was a fantastic decision. The quality was outstanding, and I got multiple job offers!",
      img: avatar3,
    },
    {
      name: "Jane Doe",
      username: "@janedoe",
      body: "Words can't express how thrilled I am with the results. This service is simply phenomenal. I love it!",
      img: avatar4,
    },
    {
      name: "Jenny Mandell",
      username: "@jennymandell",
      body: "I can't find the words to describe how impressed I am. This service is truly remarkable. I love it!",
      img: avatar5,
    },
    {
      name: "James Cameron",
      username: "@jamescameron",
      body: "I am genuinely amazed by the quality of the photos. This service is a game changer for anyone looking to enhance their profile!",
      img: avatar6,
    },
  ],
  zh: [
    {
      name: "杰克·史密斯",
      username: "@jacksmith",
      body: "我收到的约会资料照片彻底改变了我的在线形象，并显著增加了我的匹配率。这真是一个改变游戏规则的服务！",
      img: avatar1,
    },
    {
      name: "吉尔·史密斯",
      username: "@jillsmith",
      body: "我对结果感到非常震撼。这项服务超出了我的所有期望。简直太棒了！",
      img: avatar2,
    },
    {
      name: "约翰·多伊",
      username: "@johndoe",
      body: "使用 Photo AI 制作我的 LinkedIn 个人资料是一个极好的决定。照片质量非常出色，我还收到了多个工作机会！",
      img: avatar3,
    },
    {
      name: "简·多伊",
      username: "@janedoe",
      body: "我无法用语言表达我对结果的兴奋之情。这项服务简直太出色了。我非常喜欢！",
      img: avatar4,
    },
    {
      name: "珍妮·曼德尔",
      username: "@jennymandell",
      body: "我找不到合适的词来形容我的印象。这项服务真的很了不起。我非常喜欢！",
      img: avatar5,
    },
    {
      name: "詹姆斯·卡梅隆",
      username: "@jamescameron",
      body: "我对照片的质量感到非常惊讶。对于任何想要提升个人资料的人来说，这项服务都是一个改变游戏规则的存在！",
      img: avatar6,
    },
  ],
};
