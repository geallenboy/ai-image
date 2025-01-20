import React from "react";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { faqsList } from "@/context/home";
import { useI18n } from "@/context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

const Question = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  return (
    <AccordionItem value={question}>
      <AccordionTrigger className="text-left">{question}</AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

const Faqs = () => {
  const faqsData = useI18n(faqsList);
  const faqsT = useTranslations("home.faqs");
  return (
    <section
      id="faqs"
      className="w-full py-32 px-6 sm:px-8 sm:mx-8 lg:max-auto flex flex-col items-center justify-center overflow-hidden"
    >
      <AnimatedGradientText className="bg-background backdrop-blur-0">
        🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
          )}
        >
          {faqsT("name")}
        </span>
      </AnimatedGradientText>
      <h2 className="subHeading mt-4"> {faqsT("title")}</h2>
      <p className="subText mt-4 text-center">{faqsT("text")}</p>
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-4xl mx-auto mt-16"
      >
        {faqsData.map((faq: any) => {
          return <Question key={faq.question} {...faq} />;
        })}
      </Accordion>
    </section>
  );
};

export default Faqs;
