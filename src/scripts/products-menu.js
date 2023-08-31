const colorSlideControls= document.querySelectorAll('.products-menu__item');
  const colorSlideTxts= document.querySelectorAll('.products-menu__content');

  for (let i = 0; i < colorSlideControls.length; i++) {
    colorSlideControls[i].addEventListener('click', (e) => {
      e.preventDefault();
      if (colorSlideTxts[i].classList.contains('products-menu__content--active')) {
        colorSlideTxts[i].classList.remove('products-menu__content--active');
      } else {
        
        for (let n = 0; n < colorSlideControls.length; n++) {
          colorSlideTxts[n].classList.remove('products-menu__content--active');
        }
        
        colorSlideTxts[i].classList.add('products-menu__content--active');
      }
      
    });
  }