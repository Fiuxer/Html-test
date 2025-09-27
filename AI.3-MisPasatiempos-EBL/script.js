const main = document.querySelector("main");                                        // Parte main
const scrollAmount = 320;                                                           // Para controlar cuanto se mueve con las flechas
const popupDiv = document.querySelector(".popupBox");                               // El contenedor de los contenedores
const original = main.innerHTML;
const img1 = document.querySelector('.popupImg1');
const img2 = document.querySelector('.popupImg2');
const img3 = document.querySelector('.popupImg3');
const pImages = document.querySelectorAll('.popupBox img');

let cards = Array.from(document.querySelectorAll("main .pastime-container"));       // Todas las tarjetas en la barra de scroll
let pc1, pc2, pc3, pc4;                                                             


window.onload = () => {
  pc1 = document.querySelector("#pc1");                                             // Agarrar cada tarjeta individual
  pc2 = document.querySelector("#pc2");
  pc3 = document.querySelector("#pc3");
  pc4 = document.querySelector("#pc4");
}

let Title = "";
let Description = "";


// === OPACIDAD SEGÚN DISTANCIA AL CENTRO ===
function updateOpacity() {
  const viewportCenter = window.innerWidth / 2; 

  cards.forEach(card => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const distance = Math.abs(viewportCenter - cardCenter);
    const maxDistance = window.innerWidth / 2;

    let opacity = 1 - Math.pow(distance / maxDistance, 2);
    if (opacity < 0.2) opacity = 0.2;

    let scale = 1 - Math.pow(distance / maxDistance, 2);
    if (scale < 0.5) scale = 0.5;

    card.style.opacity = opacity.toString();
    card.style.transform = `scale(${scale})`;
  });
}

let ticking = false;
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateOpacity();
      ticking = false;
    });
    ticking = true;
  }
}

main.addEventListener("scroll", onScroll);
window.addEventListener("resize", updateOpacity);
updateOpacity();

// === MOVER CON LA RUEDA DEL RATÓN ===
main.addEventListener("wheel", (e) => {
  if (e.deltaY !== 0) {
    e.preventDefault();
    main.scrollBy({
      left: e.deltaY * 0.5
    });
  }
}, { passive: false });

// === MOVER CON LOS BOTONES ===
document.getElementById("scroll-left").addEventListener("click", () => {
  main.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

document.getElementById("scroll-right").addEventListener("click", () => {
  main.scrollBy({ left: scrollAmount, behavior: "smooth" });
});


// === MOSTRAR CAJAS CON INFORMACIÓN ===

function openInfoBox(num) {
  let pc, index;

  switch (num) {
    case 1:
      pc = pc1;
      index = 0;
      img1.src = "sprites/Minecraft.jpeg";
      img2.src = "sprites/Interestellar.jpeg";
      img3.src = "sprites/Whiplash.jpeg";
      break;
    case 2:
      img1.src = "sprites/MUSTARD.jpeg";
      img2.src = "sprites/Tyler.jpeg";
      img3.src = "sprites/Imagine Dragons.jpeg";
      pc = pc2;
      index = 1;
    break;
    case 3:
      img1.src = "sprites/Piano.jpeg";
      img2.src = "sprites/Guitar.jpeg";
      img3.src = "sprites/Music.jpeg";
      pc = pc3;
      index = 2;
    break;
    case 4:
      img1.src = "sprites/Cpp.png";
      img2.src = "sprites/Python.jpeg";
      img3.src = "sprites/Cs.png";
      pc = pc4;
      index = 3;
    break;
    case 5:
      img1.src = "sprites/image.png";
      img3.src = "sprites/image2.png";
      img2.src = "sprites/Yo w.jpg";
      pc = pc5;
      break;
    default:
      console.log("Bro how tf u got default");
      return;
  }
  
  let closeBtn = pc.querySelector(`.btnOpenBox`);
  let btnTxt = closeBtn.innerText;

  if (btnTxt == "Cerrar") {
    console.log("No way brochacho");
    main.appendChild(pc);

    // === REINICIO ===
    main.innerHTML = "";
    main.innerHTML = original;
      
    Object.assign(popupDiv.style, {
      pointerEvents: "none",
      background: "none",
    })
    
    // AGREGAR PC AL ARRAY
    // Se agrega en la posición original
    cards.splice(index, 0, pc);
    console.log(`New array: ${cards}`)
    
    // REOBTENER LOS VALORES
    cards = Array.from(document.querySelectorAll("main .pastime-container"));
    pc1 = document.querySelector("#pc1");                                             
    pc2 = document.querySelector("#pc2");
    pc3 = document.querySelector("#pc3");
    pc4 = document.querySelector("#pc4");

    // REESTABLECER LAS FUNCIONES
    main.addEventListener("scroll", onScroll);
    window.addEventListener("resize", updateOpacity);
    updateOpacity();

    pImages.forEach(img => {
      img.style.opacity = 0;
    })
  }
  




  if (btnTxt !== "Cerrar") {
    if (closeBtn) closeBtn.innerText = "Cerrar";
    
    document.querySelector('.popupBox').appendChild(pc);
    Object.assign(pc.style, {
      width: "80%",
      height: "50%",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      margin: "0",
      position: "absolute",
      opacity: "1"
    });

    Object.assign(popupDiv.style, {
      pointerEvents: "all",
      background: "rgba(0, 0, 0, 0.2)",
    })

    console.log(cards, pc);

    console.log(`Cards before: ${cards.length}`); // Output: Cards before: 4
    cards = cards.filter(card => card !== pc);
    console.log("Hi");
    console.log(`Cards after: ${cards.length}`);

    pImages.forEach( img => {
      img.style.opacity = 1;
    })

    showBox = false;
  }
}


// === PARTE RESPONSIVA (MOVER MENÚ) ===

const mediaQuery = window.matchMedia("(max-width: 899px)");
const menu = document.querySelector('.menu');
const title = document.querySelector('header h1');

function handleScreenChange(e) {
    if (e.matches) {
        document.querySelector('footer').appendChild(menu);
        title.style.position = "absolute";
    } else {
        document.querySelector('header').appendChild(menu);
        title.style.position = "inherit";
    }
}

// Ejecutar desde que carga
handleScreenChange(mediaQuery);

// Recibir los cambios
mediaQuery.addEventListener("change", handleScreenChange);