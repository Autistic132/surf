

  const sections = $("section");
  const display = $(".maincontent");
  const sideMenu = $(".fixed-menu");

  const mobileDetect = new MobileDetect(window.navigator.userAgent);
  const isMobile = mobileDetect.mobile();
  
  let inScroll = false;
  sections.first().addClass("active");

  const countSectionPosition = sectionEq => {
    return sectionEq * -100;
  }
  
  const changeMenuThemeForSection = sectionEq => {

    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const activeClass = "fixed-menu--shadowed";
    

    if (menuTheme == "black") {
      sideMenu.addClass(activeClass);
    } else {
      sideMenu.removeClass(activeClass);
    }

  }

  const performTransition = sectionEq => {
      if (inScroll == false) {
          inScroll = true;
      const position = countSectionPosition(sectionEq);

      changeMenuThemeForSection(sectionEq);
  
     let ars =  display.css({
          transform: `translateY(${position}%)`
      });

      console.log(ars);
  
      sections.eq(sectionEq).addClass("active").siblings().removeClass("active");
  

      setTimeout(() => {
          inScroll = false;
          
          sideMenu
          .find(".fixed-menu__item")
          .eq(sectionEq)
          .addClass("fixed-menu__item--active")
          .siblings()
          .removeClass("fixed-menu__item--active");

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
          scrollViewport("next");
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

  $(".wrapper").on("touchmove", e => e.preventDefault());
  
  $("[data-scroll-to]").click((e) => {
      e.preventDefault();
  
      const $this = $(e.currentTarget);
      const target = $this.attr("data-scroll-to");
      const reqSection = $(`[data-section-id=${target}]`);

      performTransition(reqSection.index());
  });

  //touchSwipe
if (isMobile) {
  $("body").swipe({
    swipe: function (event, direction) {
      const scroller = viewportScroller();
      let scrollDirection = "";

      if (direction == "up") scrollDirection = "next";
      if (direction == "down") scrollDirection = "prev";

      scroller[scrollDirection]();
    },
  });
};


