const places = [
  {
    src: "../images/Rostov-on-Don, Admiral.png",
    city: "Rostov-on-Don<br>LCD admiral",
    area: "81 m<sup>2</sup>",
    time: "3.5 months",
    cost: "Upon request"
  },
  {
    src: "../images/Sochi Thieves.png",
    city: "Sochi<br>Thieves",
    area: "105 m<sup>2</sup>",
    time: "4 months",
    cost: "Upon request"
  },
  {
    src: "../images/Rostov-on-Don Patriotic.png",
    city: "Rostov-on-Don<br>Patriotic",
    area: "93 m<sup>2</sup>",
    time: "3 months",
    cost: "Upon request"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const imageElement = document.querySelector('.image');
  let currentIndex = 0;
  let autoChangeInterval;

  const updateContent = (index) => {
    const place = places[index];
    if (!place) return;
    imageElement.src = place.src;
    document.querySelector('.info__city').innerHTML = place.city;
    document.querySelector('.info__area').innerHTML = place.area;
    document.querySelector('.info__time').innerHTML = place.time;
    document.querySelector('.info__cost').innerHTML = place.cost;
    updateStyles(index);
  };

  const autoChangeContent = () => {
    currentIndex = (currentIndex + 1) % places.length;
    updateContent(currentIndex);
  };

  const resetAutoChange = () => {
    clearInterval(autoChangeInterval);
    autoChangeInterval = setInterval(autoChangeContent, 3000);
  };


  const updateStyles = (activeIndex) => {
    document.querySelectorAll('.list a').forEach((link, index) => {
      link.style.color = index === activeIndex ? '#E3B873' : 'rgba(255, 255, 255, 0.3)';
      link.style.boxShadow = index === activeIndex ? 'inset 0 -1px 0 0 #E3B873' : 'none';
      link.style.paddingBottom = index === activeIndex ? '5px' : '0';
    });
    document.querySelectorAll('.slider__circles a').forEach((circle, index) => {
      circle.style.backgroundColor = index === activeIndex ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)';
    });
  };

  const handleChange = (e, selector) => {
    e.preventDefault();
    const elements = Array.from(document.querySelectorAll(selector));
    const target = e.target.closest(selector);
    if (target) {
      currentIndex = elements.indexOf(target);
      if (currentIndex !== -1) {
        updateContent(currentIndex);
        resetAutoChange();
      }
    }
  };

  document.querySelector('.list').addEventListener('click', (e) => handleChange(e, '.list a'));
  document.querySelector('.slider__circles').addEventListener('click', (e) => handleChange(e, '.slider__circles a'));  

  document.querySelectorAll('.slider__arrow').forEach((arrow, direction) => {
    arrow.addEventListener('click', () => {
      currentIndex = (currentIndex + (direction === 0 ? -1 : 1) + places.length) % places.length;
      updateContent(currentIndex);
      resetAutoChange();
    });
  });

  resetAutoChange();
  updateContent(currentIndex);
});