const fixedMenuItems = document.querySelectorAll('.fixed-menu__item');
const windowHeight = +getComputedStyle(sections[0]).height.split('px')[0];
let windowPositionX;
  let addClass = (arr, classToAdd) => {
    for (let n = 0; n < arr.length; n++) {
      arr[n].classList.add(classToAdd);
    }
  };

  let removeClass = (arr, classToRemove) => {
    for (let n = 0; n < arr.length; n++) {
      arr[n].classList.remove(classToRemove);
    }
  }; 

  const sections = $("section");
  const display = $(".maincontent");
  
  let inScroll = false;
  sections.first().addClass("active");
  
  const performTransition = sectionEq => {
      if (inScroll == false) {
          inScroll = true;
      const position = sectionEq * -100;
  
     let ars =  display.css({
          transform: 'translateY(${position}%)'
      });
  
      console.log(ars);
  
      sections.eq(sectionEq).addClass("active").siblings().removeClass("active");
  
      setTimeout(() => {
          inScroll = false;
      }, 1300);
  }
  };
  
  
  
  const scrollViewport = (direction) => {
      const activeSection = sections.filter(".active");
      const  nextSection = activeSection.next();
      const prevSection = activeSection.prev();
  
      if (direction == "next" && nextSection.length) {
          performTransition(nextSection.index());
      }
      
      if (direction == "prev" && prevSection.length) {
          performTransition(prevSection.index());
      }
  };
  
  $(window).on("wheel", (e) => {
      const deltaY = e.originalEvent.deltaY;
      console.log(deltaY);
      if (deltaY > 0) {
          //next
          performTransition(2);
      } 
      
      if (deltaY < 0 ) {
          //prev
          scrollViewport("prev");
      }
  });
  
  $(window).on("keydown", (e) => {
  
      const tagName = e.target.tagName.toLowerCase();
  
      if (tagName != "input" && tagName != "textarea"){
         switch (e.keyCode) {
          case 38: //prev
              scrollViewport("prev");
              break;
      
          case 40: //next
              scrollViewport("next");
              break;
      } 
      }
      
  });
  
  $("[data-scroll-to]").click((e) => {
      e.preventDefault();
  
      const $this = $(e.currentTarget);
      const target = $this.attr("data-scroll-to");
      const reqSection = $("[data-section-id=${target}]");
  });

//nav menu 


let addMenuClickEvent = function(linksArr, menuLinkIndex, fixedMenuLinkIndex) {
    linksArr[menuLinkIndex].addEventListener('click', function(e) {    
      windowPositionX = windowHeight * fixedMenuLinkIndex;

      removeClass(fixedMenuItems, 'fixed-menu__item--active');
      removeClass(fixedMenuItems, 'fixed-menu__item--bg--black--active');

      if (windowPositionX >= windowHeight * 4 && windowPositionX < windowHeight * 5) {
        addClass(fixedMenuItems, 'fixed-menu__item--bg--black');
        fixedMenuLinks[fixedMenuLinkIndex].classList.add('fixed-menu__item--bg--black--active');
      } else {
        removeClass(fixedMenuItems, 'fixed-menu__item--bg--black');
        fixedMenuItems[fixedMenuLinkIndex].classList.add('fixed-menu__item--active');
      }

      if (windowPositionX >= windowHeight * 7 && windowPositionX < windowHeight * 8) {
        addClass(fixedMenuItems, 'fixed-item__item');
      } else {
        removeClass(fixedMenuItems, 'fixed-item__item');
      }

      
    });  
  };
  
  for (let i = 0; i < fixedMenuItems.length; i++) {  
    addMenuClickEvent(fixedMenuItems, i, i);
    
    for (let n = 0; n < headerMeenuItems.length; n++) {
      if (fixedMenuItems[i].attributes['href'].value == modalMenuItems[n].attributes['href'].value) {
        addMenuClickEvent(headerMeenuItems, n, i);
        addMenuClickEvent(modalMenuItems, n, i);
      }
    }
  }
