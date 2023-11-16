import Timeout from "../TimeOut";

export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  index: number;
  slideActive: Element;
  timeout: Timeout | null;
  paused: boolean;
  pausedTimeout: Timeout | null;
  thumbItems: HTMLElement[] | null;
  thumb: HTMLElement | null;
  constructor(
    container: Element,
    slides: Element[],
    controls: Element,
    time: number = 5000
  ) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.time = time;
    this.index = 0;
    this.slideActive = this.slides[this.index];
    this.timeout = null;
    this.pausedTimeout = null;
    this.paused = false;
    this.thumbItems = null;
    this.thumb = null;
    this.init();
  }

  // function hiden element
  hide(el: Element) {
    el.classList.remove("active");
  }

  show(index: number) {
    if(this.thumbItems) {
      this.thumb = this.thumbItems[this.index];
      this.thumbItems.forEach((thumb) => thumb.classList.remove("active"));
      this.thumb.classList.add("active");
    }
    //remove class active in slides
    this.slides.forEach((slide) => this.hide(slide));
    // add class active in slide
    this.slides[index].classList.add("active");
    this.auto(this.time);
  }

  auto(time: number) {
    this.timeout?.clearTimeout();
    this.timeout = new Timeout(() => this.next(), time);
    if(this.thumb) {
      this.thumb.style.animationDuration = `${time}ms`;
    }
  }

  next() {

    // verifica se o slide esta pausado e faz um "break".
    if (this.paused) {
      return;
    }
    this.index++;
    if (this.index >= this.slides.length) {
      this.index = 0;
    }
    this.show(this.index);
  }

  prev() {
    // verifica se o slide esta pausado e faz um "break".
    if (this.paused) {
      return;
    }
    this.index--;
    if (this.index < 0) {
      this.index = this.slides.length - 1;
    }
    this.show(this.index);
  }

  pause() {
    console.log("pause");
    this.pausedTimeout = new Timeout(() => {
      this.timeout?.pause();
      this.paused = true;
      this.thumb?.classList.add("paused");
    }, 100);
  }

  continue() {
    console.log("continue");
    this.thumb?.classList.remove("paused");
    this.pausedTimeout?.clearTimeout();
    if(this.paused) {
      this.paused = false;
      this.timeout?.continue();
    }
  }

  private createTumbs() {
    const thumbsContainer = document.createElement("div");
    thumbsContainer.id = "slide-thumbs";
    for (let i = 0; i < this.slides.length; i++) {
      thumbsContainer.innerHTML += `<span><span class="thumb-item"></span></span>`;
    }
    this.controls.append(thumbsContainer);
    this.thumbItems = Array.from(document.querySelectorAll(".thumb-item"));
  }

  private initControls() {
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");
    prevButton.textContent = "Anterior";
    nextButton.textContent = "Proximo";

    //add element in html
    this.controls.append(prevButton, nextButton);

    // adicionar o pause() quando segurar o botão
    this.controls.addEventListener("pointerdown", () => this.pause());
    this.controls.addEventListener("pointerup", () => this.continue());

    prevButton.addEventListener("pointerup", () => this.prev());
    nextButton.addEventListener("pointerup", () => this.next());
  }

  private init() {
    this.initControls();
    this.createTumbs();
    this.show(this.index);
  }
}
