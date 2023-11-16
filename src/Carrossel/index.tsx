/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import {
  ButtonSelected,
  CarrosselContainer,
  CarrosselContainerCard,
  Controls,
} from "./styles";

interface CarrosselProps {
  children: ReactNode;
  timeRun?: number;
}

export function Carrossel({ children, timeRun = 1000 }: CarrosselProps) {
  const slideRef = useRef<HTMLDivElement>(null);
  const slideElementsRef = useRef<HTMLDivElement>(null);
  const slideControlsRef = useRef<HTMLDivElement>(null);

  const [slides, setSlides] = useState<Element[]>(null);
  const [index, setIndex] = useState(0);
  const [timeout, setTimout] = useState<Timeout | null>(null);

  useEffect(() => {
    setSlides(Array.from(slideElementsRef?.current?.children ?? []));
  }, []);

  useEffect(() => {
    show(index);
  }, [slides, index]);

  useEffect(() => {
    // autoPlay();
    const set = setTimeout(() => {
      autoPlay();
    }, timeRun)

    return () => {
      clearTimeout(set);
    }
  }, [slides, index]);

  function autoPlay() {
    if (slides) {
      if (index < slides.length - 1) {
        handleClick(index + 1);
      } else {
        handleClick(0);
      }
    }
  }

  function show(index: number) {
    slideElementsRef.current?.children.item(index)?.classList.add("active");
    slideControlsRef.current?.children.item(index)?.classList.add("active");
  }

  const handleClick = useCallback((index: number) => {
    setIndex(index);
    const slideElements = slideElementsRef.current?.children;
    const slideElementsControls = slideControlsRef.current?.children;

    //remove class active in slides
    if (slideElements) {
      Array.from(slideElements).forEach((slide: Element) => {
        slide.classList.remove("active");
      });
    }

    if (slideElementsControls) {
      Array.from(slideElementsControls).forEach((slide: Element) => {
        slide.classList.remove("active");
      });
    }

    show(index);
  }, []);

  return (
    <CarrosselContainer ref={slideRef}>
      <CarrosselContainerCard ref={slideElementsRef}>
        {children}
      </CarrosselContainerCard>
      <Controls ref={slideControlsRef}>
        {slides?.map((_: Element, index: number) => (
          <ButtonSelected key={index} onClick={() => handleClick(index)} />
        ))}
      </Controls>
    </CarrosselContainer>
  );
}
