function id(v) {
    return document.getElementById(v);
  }
  
  function loadbar(images) {
    return new Promise(async (resolve, reject) => {
      var ovrl = document.querySelector("#preloader"),
        stat = document.querySelector("#percent"),
        bar = document.querySelector("#bar"),
        img = document.images,
        videos = document.querySelectorAll("video"),
        c = 0;
      tot = img.length + videos.length; // Total de imÃ¡genes y videos
  
      function mediaLoaded() {
        c += 1;
        var perc = ((100 / tot) * c) << 0; // Calcula el porcentaje de medios cargados
  
        if (!bar) return;
        bar.style.width = perc + "%"; // Actualiza el ancho de la barra de carga
  
        const percWaves = (40 * perc) / 100; // Calcula el porcentaje de las olas
  
        updateWaves(percWaves); // Actualiza la posiciÃ³n de las olas
  
        if (perc < 9) {
          stat.innerHTML = "0" + perc + "%"; // Muestra el porcentaje con un cero delante si es menor a 9
        } else {
          stat.innerHTML = perc + "%"; // Muestra el porcentaje normal
        }
  
        if (c === tot) return doneLoading(); // Si todos los medios estÃ¡n cargados, finaliza la carga
      }
  
      function doneLoading() {
        console.log("Done loading");
        setTimeout(function () {
        console.log("LOADED");
          resolve(preloadedImages);
        }, 15000);
      }
  
      // Carga de imÃ¡genes
      for (var i = 0; i < img.length; i++) {
        var tImg = new Image();
        tImg.onload = mediaLoaded; // Llama a `mediaLoaded` cuando la imagen se carga correctamente
        tImg.onerror = mediaLoaded; // Llama a `mediaLoaded` incluso si hay un error al cargar la imagen
        tImg.src = img[i].src; // Asigna la fuente de la imagen a la nueva imagen
      }
  
      // Carga de videos
      videos.forEach(function (video) {
        video.addEventListener("loadeddata", mediaLoaded, false); // Llama a `mediaLoaded` cuando el video estÃ¡ listo
        video.addEventListener("error", mediaLoaded, false); // Llama a `mediaLoaded` incluso si hay un error al cargar el video
      });
    });
  }
  
  // if (document.readyState !== 'loading') {
  //   loadbar();  // Si el documento ya estÃ¡ cargado, llama a `loadbar`
  // } else {
  //   document.addEventListener('DOMContentLoaded', function () {
  //     loadbar();  // Si no, espera a que el DOM estÃ© completamente cargado
  //   });
  // }
  
  function updateWaves(percWaves) {
    document.getElementById("wave01").style.transform = `translateX(${(percWaves-100)/2}%)`; // Actualiza la transformaciÃ³n en Y
    document.getElementById("wave02").style.transform = `translateX(${50 - percWaves}%)`; // Actualiza la transformaciÃ³n en Y
  }
  
  
  function preloadOnIntro(preloadingFunction) {
    return new Promise(async (resolve, reject) => {
      var ovrl = document.querySelector("#preloader"),
        stat = document.querySelector("#preloader-percent"),
        bar = document.querySelector("#progress-bar-slot")
  
      function mediaLoaded(perc) {
        console.log("perc:", perc, "%")
        if (!bar) return;
        
        bar.style.width = perc + "%"; // Actualiza el ancho de la barra de carga
  
        // const percWaves = (40 * perc) / 100; // Calcula el porcentaje de las olas
  
        updateWaves(perc); // Actualiza la posiciÃ³n de las olas
  
        if (perc < 9) {
          stat.innerHTML = "0" + perc + "%"; // Muestra el porcentaje con un cero delante si es menor a 9
        } else {
          stat.innerHTML = perc + "%"; // Muestra el porcentaje normal
        }
  
        if (perc === 100) return doneLoading(); // Si todos los medios estÃ¡n cargados, finaliza la carga
      }
  
      function doneLoading() {
        console.log("perc 100");
        // setTimeout(function () {
        // console.log("LOADED");
        //   resolve(preloadedImages);
        // }, 15000);
      }
  
      const delay = (time) => {
        return new Promise((res, rej)=>{
          setTimeout(()=>{
            res();
          }, time);
        })
      }
    
      try{
        console.log("preloadingFunction",preloadingFunction);
        console.log("mediaLoaded",mediaLoaded);
        const loadedImgs = await preloadingFunction(mediaLoaded);
        console.log("LOADED",loadedImgs);
        resolve(loadedImgs);
  
      }catch(err){
        reject(err);
      }
    });
  }