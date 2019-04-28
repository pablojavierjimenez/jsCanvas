var  app = {
  el: {
    originalImage: document.getElementById("originalImage"),
    uploadImage: document.getElementById("uploadImage"),
    myCanvas: document.getElementById("myCanvas"),
    downloadImage: document.getElementById("downloadImage"),
    filterButton: document.querySelectorAll('.filterButton')
  },
  methods: {
    _resizeImage: ( img ) => {
      var finalWidth  = img.naturalWidth || 512;
      var finalHeight =  img.naturalHeight || 512;
      return {
        width: finalWidth,
        height: finalHeight
      }
    },
    _drawImageOnCanvas: ( image, canvas, filter = "" ) => {
      let context = canvas.getContext('2d');
      // TODO:  investigar despues por que this aca me muestra
      //        los metodos pero las propiedades no ¯\_(ツ)_/¯
      //        console.log(this.el.myCanvas);
      /**
       * TODO:  ver como cueerno manejo eto del width y el naturalWidth
       *        mas que nada dentro de la funcion de _resizeImage, porque de ahi depende luego
       * los tamaños con los cuales la imagen se vaa setear dentro del canvas,
       * quiza tenga que hacer un paquete de funciones para manejar eso,
       * (y con quiza quiero decir, casi seguro)
       */
      let newSiza = app.methods._resizeImage( image );
      /**
       * @description ose los datos de posicion y tamaño
       * que obtengo de la imagen que me subieron recien
       */
      let sourceX = 0;
      let sourceY = 0;
      let sourceWidth = newSiza.width;
      let sourceHeight = newSiza.height;
      /**
       * @description es decir datos de tamaño y ubicacion
       * de el elemento de destino en este caso el canvas
       * siendo corto donde va a ir a parar dentro del canvas y como
       */
      let destWidth = sourceWidth;
      let destHeight = sourceHeight;
      let destX = canvas.width / 4 - destWidth / 2;
      let destY = canvas.height / 2 - destHeight / 2;
      context.filter = filter;
      context.drawImage( image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
    }
  }
};
app.el.originalImage.onload = ( ev ) => {
  app.methods._drawImageOnCanvas( app.el.originalImage, app.el.myCanvas );
};
app.el.uploadImage.addEventListener( 'change', ( ev ) => {
  app.el.originalImage.src = window.URL.createObjectURL(ev.srcElement.files[0]);
});
app.el.filterButton.forEach( ( item ) => {
  item.addEventListener( 'click', ( ev ) => {
    app.methods._drawImageOnCanvas( app.el.originalImage, app.el.myCanvas, item.dataset.filter );
  });
});
app.el.downloadImage.addEventListener( 'click', function () {
  var image = document.getElementById("myCanvas").toDataURL("image/png").replace("image/png", "image/octet-stream");
  download.setAttribute("href", image);
});
