(function() {
    var elements;
    var windowHeight;
  
    function init() {
      elements = document.querySelectorAll('.hidden2');
      elements2 = document.querySelectorAll('.hidden3');
      windowHeight = window.innerHeight;
    }

    function getPositionAtCenter(element) {
        const {top, left, width, height} = element.getBoundingClientRect();
        return {
          x: left + width / 2,
          y: top + height / 2
        };
      }
      function getDistanceBetweenElements(a, b) {
        const aPosition = getPositionAtCenter(a);
        const bPosition = getPositionAtCenter(b);
      
        return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);  
      }
  
    function checkPosition() {
        const topElement = document.querySelector('#topEl');
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var positionFromTop = elements[i].getBoundingClientRect().top;
        
        if (getDistanceBetweenElements(topElement,element) - windowHeight <= 0) {
          //element.classList.remove('hidden2');
          element.classList.add('animate__animated','animate__fadeInUp');
          
        }
      }
      for (var i = 0; i < elements2.length; i++) {
        var element = elements2[i];
        var positionFromTop = elements2[i].getBoundingClientRect().top;
        
        if (getDistanceBetweenElements(topElement,element) - windowHeight <= 0) {
          element.classList.remove('hidden3');
          element.classList.add('animate__animated','animate__flipInY');
          
        }
      }
    }
    const viewport = document.querySelector('.drawer-content');
    viewport.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);
  
    init();
    checkPosition();
  })();