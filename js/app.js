// Aos
AOS.init({
  duration: 2000,
});

// typing
const typed = new Typed(".typed", {
  strings: ["¡Bienvenido!"],
  // stringsElement: "#cadena-texto",
  typeSpeed: 100,
  backSpeed: 50,
  smartBackspace: true,
  backDelay: 3500,
  loop: true,
  loopCount: false,
  showCursor: false,
});

// hero-styles
// const likes = [
//   "aprender cosas nuevas",
//   "resolver problemas",
//   "trabajar en equipo",
// ];
// let i = 0;

// const like = () => {
//   if (i === likes.length - 1) {
//     i = 0;
//   } else {
//     i++;
//   }
//   document.getElementById("likes").innerHTML = likes[i];
// };
// like();

// setInterval(() => {
//   like();
// }, 1500);

// Year
const span = document.getElementById("year");
const year = new Date();
span.innerHTML = `${year.getFullYear()}`;

// Menu Mobile
const barra = document.getElementById("btnMenu");
const menuSide = document.querySelector(".menu-side");
const menuMobile = document.querySelector(".menu-mobile");

barra.addEventListener("click", function () {
  menuSide.classList.toggle("active");
  // menuMobile.classList.toggle("line");
});

// const startMenu = document.getElementById("start-menu");
// const aboutMeMenu = document.getElementById("about-me-menu");
// const proyectsMenu = document.getElementById("proyects-menu");
// const habilityMenu = document.getElementById("hability-menu");
const latexMenu = document.getElementById("latex-menu");
const fisicaMenu = document.getElementById("fisica-menu");
const algebraMenu = document.getElementById("algebra-menu");
const geometriaMenu = document.getElementById("geometria-menu");
const trigonometriaMenu = document.getElementById("trigonometria-menu");
const contactMenu = document.getElementById("contact-menu");


function scrollDistance(e, element) {
  e.preventDefault();
  let hash = element.getAttribute("href");
  let target = document.querySelector(hash);
  let headerOffset = 100;
  let elementPosition = target.offsetTop;
  let offsetPosition = elementPosition - headerOffset;
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

function scrollToReference(e, element) {
  scrollDistance(e, element);
  menuSide.classList.toggle("active");
  // menuMobile.classList.toggle("line");
}

// startMenu.addEventListener("click", (e) => {
//   scrollToReference(e, startMenu);
// });
// aboutMeMenu.addEventListener("click", (e) => {
//   scrollToReference(e, aboutMeMenu);
// });
// proyectsMenu.addEventListener("click", (e) => {
//   scrollToReference(e, proyectsMenu);
// });
// habilityMenu.addEventListener("click", (e) => {
//   scrollToReference(e, habilityMenu);
// });
latexMenu.addEventListener("click", (e) => {
  scrollToReference(e, latexMenu);
});
fisicaMenu.addEventListener("click", (e) => {
  scrollToReference(e, fisicaMenu);
});
algebraMenu.addEventListener("click", (e) => {
  scrollToReference(e, algebraMenu);
});
geometriaMenu.addEventListener("click", (e) => {
  scrollToReference(e, geometriaMenu);
});
trigonometriaMenu.addEventListener("click", (e) => {
  scrollToReference(e, trigonometriaMenu);
});
contactMenu.addEventListener("click", (e) => {
  scrollToReference(e, contactMenu);
});

//Scroll
// const start = document.querySelectorAll(".start");
// const aboutMe = document.querySelectorAll(".aboutMe");
// const proyects = document.querySelectorAll(".proyects");
// const hability = document.querySelectorAll(".hability");
const latex = document.querySelectorAll(".latex");
const fisica = document.querySelectorAll(".fisica");
const algebra = document.querySelectorAll(".algebra");
const geometria = document.querySelectorAll(".geometria");
const trigonometria = document.querySelectorAll(".trigonometria");
const contact = document.querySelectorAll(".contact");

// start.forEach((st) => {
//   st.addEventListener("click", (e) => {
//     scrollDistance(e, st);
//   });
// });

// aboutMe.forEach((st) => {
//   st.addEventListener("click", (e) => {
//     scrollDistance(e, st);
//   });
// });

// proyects.forEach((st) => {
//   st.addEventListener("click", (e) => {
//     scrollDistance(e, st);
//   });
// });

// hability.forEach((st) => {
//   st.addEventListener("click", (e) => {
//     scrollDistance(e, st);
//   });
// });

latex.forEach((st) => {
  st.addEventListener("click", (e) => {
    scrollDistance(e, st);
  });
});

fisica.forEach((st) => {
  st.addEventListener("click", (e) => {
    scrollDistance(e, st);
  });
});

algebra.forEach((st) => {
  st.addEventListener("click", (e) => {
    scrollDistance(e, st);
  });
});

geometria.forEach((st) => {
  st.addEventListener("click", (e) => {
    scrollDistance(e, st);
  });
});

trigonometria.forEach((st) => {
  st.addEventListener("click", (e) => {
    scrollDistance(e, st);
  });
});

contact.forEach((st) => {
  st.addEventListener("click", (e) => {
    scrollDistance(e, st);
  });
});



// Fixed Header

const fixedHeader = document.getElementById("fixed-header");

window.addEventListener("scroll", () => {
  let offsetHeader = 0;
  if (window.scrollY >= offsetHeader) {
    fixedHeader.style.marginTop = "0.5rem";
  } else if (window.scrollY <= offsetHeader) {
    fixedHeader.style.marginTop = "0.5rem";
  }
});

// Particles
particlesJS({
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 900,
      },
    },
    color: {
      value: "#F7FCFF",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#F7FCFF",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value:0.1,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 160,
      color: "#fff",
      opacity: 0.6,
      width: 1,
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  retina_detect: true,
});


// bootom para redireccionar a un enlace externo
// document.addEventListener('DOMContentLoaded', function() {
//     var buttonLikeDivs = document.querySelectorAll('.content-background-art');
//     buttonLikeDivs.forEach(function(div) {
//         div.addEventListener('click', function() {
//             var url = div.getAttribute('data-url');
//             if (url) {
//                 window.open(url, '_blank');
//             }
//         });
//     });
// });
// bottom para redireccionar a un archivo html y url en el mismo proyecto
document.addEventListener('DOMContentLoaded', function() {
    var buttonLikeDivs = document.querySelectorAll('.content-background-art');
    buttonLikeDivs.forEach(function(div) {
        div.addEventListener('click', function() {
            var url = div.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        });
    });
});

