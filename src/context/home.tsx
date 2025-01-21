import { ImageIcon, Package2, Palette } from "lucide-react";
import img1 from "@/public/hero-images/Charismatic Young Man with a Warm Smile and Stylish Tousled Hair.jpeg";
import img2 from "@/public/hero-images/Confident Businesswoman on Turquoise Backdrop.jpeg";
import img3 from "@/public/hero-images/Confident Woman in Red Outfit.jpeg";
import img4 from "@/public/hero-images/Confident Woman in Urban Setting.jpeg";
import img5 from "@/public/hero-images/Futuristic Helmet Portrait.jpeg";
import img6 from "@/public/hero-images/Futuristic Woman in Armor.jpeg";
import img7 from "@/public/hero-images/Man in Brown Suit.jpeg";
import img8 from "@/public/hero-images/Poised Elegance of a Young Professional.jpeg";
import img9 from "@/public/hero-images/Professional Business Portrait.jpeg";
import img10 from "@/public/hero-images/Sophisticated Businessman Portrait.jpeg";
import img11 from "@/public/hero-images/Professional Woman in Navy Blue Suit.jpeg";
import avatar1 from "@/public/avatars/AutumnTechFocus.jpeg";
import avatar2 from "@/public/avatars/Casual Creative Professional.jpeg";
import avatar3 from "@/public/avatars/Golden Hour Contemplation.jpeg";
import avatar4 from "@/public/avatars/Portrait of a Woman in Rust-Colored Top.jpeg";
import avatar5 from "@/public/avatars/Radiant Comfort.jpeg";
import avatar6 from "@/public/avatars/Relaxed Bearded Man with Tattoo at Cozy Cafe.jpeg";

export const faqsList: any = {
  en: [
    {
      question: "How does AI Image work?",
      answer:
        "AI Image uses advanced machine learning algorithms to analyze and understand your photos. It then generates new images based on your features and the scenarios you choose, creating realistic and personalized results.",
    },
    {
      question: "Is my data safe with AI Image?",
      answer:
        "Yes, we take data privacy very seriously. All uploaded photos and generated images are encrypted and stored securely. We never share your personal data or images with third parties without your explicit consent.",
    },
    {
      question: "How many photos do I need to upload for best results?",
      answer:
        "For optimal results, we recommend uploading at least 10-20 diverse photos of yourself. This helps our AI model better understand your features and expressions, leading to more accurate and realistic generated images.",
    },
    {
      question: "Can I use AI Image for commercial purposes?",
      answer:
        "Yes, our Pro and Enterprise plans include commercial usage rights for the images you generate. However, please note that you should always respect copyright and privacy laws when using AI-generated images.",
    },
    {
      question: "How often do you update the AI model?",
      answer:
        "We continuously work on improving our AI model. Major updates are typically released quarterly, with minor improvements and optimizations happening more frequently. All users benefit from these updates automatically.",
    },
    {
      question: "What are the differences between the free and paid plans?",
      answer:
        "The free plan allows you to generate up to 5 images per day. The Pro plan includes unlimited image generation, higher resolution output, and access to additional features. The Enterprise plan is tailored for businesses and offers custom integrations and dedicated support.",
    },
  ],
  zh: [
    {
      question: "AI Image 是如何工作的？",
      answer:
        "AI Image 使用先进的机器学习算法来分析和理解您的照片。然后，它根据您的特征和您选择的场景生成新的图像，创造出逼真且个性化的结果。",
    },
    {
      question: "我的数据在 AI Image 中安全吗？",
      answer:
        "是的，我们非常重视数据隐私。所有上传的照片和生成的图像都会加密并安全存储。未经您的明确同意，我们绝不会与第三方共享您的个人数据或图像。",
    },
    {
      question: "为了获得最佳效果，我需要上传多少张照片？",
      answer:
        "为了获得最佳效果，我们建议至少上传 10-20 张您的多样化照片。这有助于我们的 AI 模型更好地理解您的特征和表情，从而生成更准确和逼真的图像。",
    },
    {
      question: "我可以将 AI Image 用于商业用途吗？",
      answer:
        "可以，我们的 Pro 和 Enterprise 计划包含您生成的图像的商业使用权。但请注意，在使用 AI 生成的图像时，您应始终遵守版权和隐私法律。",
    },
    {
      question: "你们多久更新一次 AI 模型？",
      answer:
        "我们不断改进我们的 AI 模型。重大更新通常每季度发布一次，而较小的改进和优化会更频繁地进行。所有用户都会自动受益于这些更新。",
    },
    {
      question: "免费计划和付费计划有什么区别？",
      answer:
        "免费计划允许您每天生成最多 5 张图像。Pro 计划包括无限图像生成、更高分辨率的输出以及访问额外功能。Enterprise 计划专为企业设计，提供定制集成和专属支持。",
    },
  ],
};

export const featureList = {
  en: [
    {
      title: "AI-Powered Photos",
      description:
        " Instantly transform your photos into high-quality, lifelike images with the power of AI. Whether you need fresh content for social media, professional shots for LinkedIn, or a fun set of images for personal project.",
      icon: <ImageIcon className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      title: "Diverse Photo Packs at Your Fingertips",
      description:
        "Instantly transform your photos into high-quality, lifelike images with the power of AI. Whether you need fresh content for social media, professional shots for LinkedIn, or a fun set of images for personal project. ",
      icon: <Package2 className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      title: "Customizable Photo Generation",
      description:
        "Instantly transform your photos into high-quality, lifelike images with the power of AI. Whether you need fresh content for social media, professional shots for LinkedIn, or a fun set of images for personal project.",
      icon: <Palette className="w-6 h-6" strokeWidth={1.5} />,
    },
  ],
  zh: [
    {
      title: "AI 驱动的照片",
      description:
        "利用 AI 的力量，立即将您的照片转换为高质量、逼真的图像。无论您是需要社交媒体上的新鲜内容、LinkedIn 上的专业照片，还是个人项目中的一组有趣图像。",
      icon: <ImageIcon className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      title: "触手可及的多样化照片包",
      description:
        "利用 AI 的力量，立即将您的照片转换为高质量、逼真的图像。无论您是需要社交媒体上的新鲜内容、LinkedIn 上的专业照片，还是个人项目中的一组有趣图像。",
      icon: <Package2 className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      title: "可定制的照片生成",
      description:
        "利用 AI 的力量，立即将您的照片转换为高质量、逼真的图像。无论您是需要社交媒体上的新鲜内容、LinkedIn 上的专业照片，还是个人项目中的一组有趣图像。",
      icon: <Palette className="w-6 h-6" strokeWidth={1.5} />,
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

export const Images = [
  {
    src: img1,
    alt: "AI generated image",
  },
  {
    src: img2,
    alt: "AI generated image",
  },
  {
    src: img3,
    alt: "AI generated image",
  },
  {
    src: img4,
    alt: "AI generated image",
  },
  {
    src: img5,
    alt: "AI generated image",
  },
  {
    src: img6,
    alt: "AI generated image",
  },
  {
    src: img7,
    alt: "AI generated image",
  },
  {
    src: img8,
    alt: "AI generated image",
  },
  {
    src: img9,
    alt: "AI generated image",
  },
  {
    src: img10,
    alt: "AI generated image",
  },
  {
    src: img11,
    alt: "AI generated image",
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
