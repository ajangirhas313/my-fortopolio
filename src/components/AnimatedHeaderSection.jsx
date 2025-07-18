import React, { useRef, useLayoutEffect } from "react";
import { AnimatedTextLines } from "./AnimatedTextLines";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor,
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: withScrollTrigger
          ? {
              trigger: contextRef.current,
              start: "top 80%", // Optional: bisa kamu atur sesuai kebutuhan
            }
          : undefined,
      });

      tl.from(contextRef.current, {
        y: "50vh",
        duration: 1,
        ease: "circ.out",
      });

      tl.from(
        headerRef.current,
        {
          opacity: 0,
          y: "200",
          duration: 1,
          ease: "circ.out",
        },
        "<+0.2"
      );
    }, contextRef);

    return () => ctx.revert(); // Clean up animasi saat unmount
  }, []);

  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-12 pt-16 sm:gap-16"
        >
          <p
            className={`text-sm font-light tracking-[0.5rem] uppercase px-10 ${textColor}`}
          >
            {subTitle}
          </p>
          <div className="px-10">
            <h1
              className={`flex flex-row flex-wrap items-center gap-x-2 uppercase text-5xl sm:text-6xl md:text-7xl font-bold ${textColor}`}
            >
              {titleParts.map((part, index) => (
                <span key={index}>{part}</span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-10 ${textColor}`}>
        <div className="absolute inset-x-0 border-t-2" />
        <div className="py-12 sm:py-16 text-end">
          <AnimatedTextLines
            text={text}
            className={`font-light uppercase value-text-responsive ${textColor}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
