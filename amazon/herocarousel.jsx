import { useState } from "react";

const slides = [
  {
    title: "Biggest Deals of the Year",
    subtitle: "Up to 80% Off"
  },
  {
    title: "Fashion Forward",
    subtitle: "Trending Styles"
  },
  {
    title: "Home & Kitchen Sale",
    subtitle: "Best Brands"
  }
];

function HeroCarousel() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((index + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((index - 1 + slides.length) % slides.length);
  };

  return (
    <section className="hero">
      <button onClick={prevSlide}>❮</button>

      <div>
        <h1>{slides[index].title}</h1>
        <p>{slides[index].subtitle}</p>
      </div>

      <button onClick={nextSlide}>❯</button>
    </section>
  );
}

export default HeroCarousel;