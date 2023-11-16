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

  const [time, setTime] = useState<number>(timeRun);
  const [index, setIndex] = useState<number>(0);
  const [slide, setSlide] = useState<Element | null>(null);
  const [slides, setSlides] = useState<Element[]>([]);

  useEffect(() => {
    setSlides(Array.from(slideElementsRef.current?.children ?? []));
  }, []);

  useEffect(() => {
    showSlide(index);
    autoPlay();
  }, [index]);

  const showSlide = (index: number) => {
    const controls = Array.from(slideControlsRef.current?.children ?? []);
    setIndex(index);
    setSlide(slides[index]);

    slides.forEach((el: Element) => {
      el.classList.remove("active");
    });
    controls.forEach((el: Element) => el.classList.remove("active"));

    slideElementsRef.current?.children[index].classList.add("active");
    controls[index].classList.add("active");

  };

  const nextSlide = () => {
    if (slides) {
      if (index < slides.length - 1) {
        showSlide(index + 1);
      } else {
        showSlide(0);
      }
    }
  };

  //autoPlay next slide
  function autoPlay(){
    setTimeout(() => nextSlide(), time);
  }
  
  return (
    <CarrosselContainer ref={slideRef}>
      <CarrosselContainerCard ref={slideElementsRef}>
        {children}
      </CarrosselContainerCard>
      <Controls ref={slideControlsRef}>
        {slides?.map((_: Element, index: number) => (
          <ButtonSelected key={index} onClick={() => showSlide(index)} />
        ))}

        <button onClick={nextSlide}>next</button>
      </Controls>
    </CarrosselContainer>
  );
}
