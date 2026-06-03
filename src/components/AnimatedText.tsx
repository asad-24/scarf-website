"use client";

import { motion } from "framer-motion";
import type { JSX } from "react";

type AnimatedTextProps = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  wordClassName?: string;
};

export default function AnimatedText({
  text,
  as: Tag = "span",
  className = "",
  wordClassName = "",
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={`flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className={`mr-[0.22em] inline-block will-change-transform ${wordClassName}`}
          initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: 0.08 * index,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
