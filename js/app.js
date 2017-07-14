// Arreglo de imagenes
var imagenes=[];
imagenes[0] = "image/1.png";
imagenes[1] = "image/2.png";
imagenes[2] = "image/3.png";
imagenes[3] = "image/4.png";

// Matriz para identificar la posicion de las imagenes
var rows = 7;
var cols = 7;
var grid = [];

// funciones para cambiar de color al titulo
function colorRojo(elemento){
  $(elemento).animate({
    color: "red"
  }, 2000, "swing", function(){
    colorBlanco(elemento)
  })
}
function colorBlanco(elemento){
  $(elemento).animate({
    color:"white"
  }, 2000, "linear", function(){
    colorRojo(elemento)
  })
}


// funciones para llenar el tablero
// generar aleatoriamente las imagenes
function genImg(){
  var pickInt = Math.floor((Math.random()*4));
   return imagenes[pickInt];
}
// inicializar el grid
function initGrid(){
  for (var row = 0; row < rows; row++) {
      grid[row]=[];
      for (var col=0; col< cols; col++) {
         grid[row][col]= new celdaGrid(row, col, null, null);

     }
  }
}
// construir los objetos del grid
function celdaGrid(col, row, img, obj){
  return{
    col: col,
    row: row,
    img: img,
    elim: false,
    ptos: 0,
    obj: obj
  }
}
// llenar el tablero y cargar el grid
function llenarTablero(){
  var columnas = $(".panel-tablero").children()
  var col = 0
  jQuery.each(columnas,function(key, value){
    var top = 20
    for(var i = 0; i < rows; i++){
      var img = genImg()
      var cell = $("<img src='" + img + "' class='imgGen' id='" + i +"_"+col + "' row='"+ i + "' col='" + col + "' elim='false'" + " down ='0'" + " style='top: "+ top + "px;'>")
      $(value).append(cell)
      grid[i][col].obj = cell
      grid[i][col].img = img
      top += 5
    }
    col++
  })
};

function llenarTablero2(){
  var columnas = $(".panel-tablero").children()
  var col = 0
    jQuery.each(columnas,function(key, value){
      var row = 0
      var filas = $(columnas[col]).children()
         jQuery.each(filas,function(key, value){
           var img = genImg()
           var cell = $("<img src='" + img + "' class='imgGen' id='" + row +"_"+col + "' row='"+ row + "' col='" + col + "' elim='false'" + " down ='0'" +  ">")
           $(value).append(cell)
           row++
         })
    col++
    })
    setTimeout(2000, intercambiar2())
}

function intercambiar2(){
  var columnas = $(".panel-tablero").children()
  var col = 0
  var filas = $(columnas[col]).children()
  var row = 0
  var img = genImg()
  var cell = $("<img src='" + img + "' class='imgGen' id='" + row +"_"+col + "' row='"+ row + "' col='" + col + "' elim='false'" + " down ='0'" +  ">")
   var ini = $(filas[row]).append(cell)
   var abajo = $(filas[row+ 1]).detach()
/*   $(ini).fadeIn(2000, function(){
      var celda = $(filas[row]).children().first().detach
      var ini2 = $(filas[row+1]).append(cell)
   }) */






}


// funciones para revisar el tablero y marcar celdas a eliminar
// revision horizontal
function celdasHorizontal(){
  for ( var row = 0; row < rows; row ++){
      var fila = $("img[row='"+ row + "']")
      var col = 0
      while (col < cols - 1){
        var sig = col + 1
        var cont = 1
        imgAct = $(fila[col]).attr("src")
        for (var i = sig ; i < cols; i++){
          imgSig = $(fila[i]).attr("src")
          if (imgAct == imgSig){
            cont++
            if( i == cols -1){
              sig = cols
              break
            }
          } else {
            sig = i
            break
          }
        }
        for ( var j = col; j < sig ; j++){
          if (cont >2 ){
            //marco la celda como eliminada e incremento el puntaje
            $(fila[j]).attr("elim","true")
            $("#score-text").html(parseInt($("#score-text").html())+ cont)
          }
        }
        col = sig
      }
  }

}
//  revision vertical
function celdasVertical() {
  for (var col = 0; col < cols; col++){
    var columna = $("img[col='" + col + "']")
    var row = 0
    while (row < rows-1) {
      var sig = row + 1
      var cont = 1
      var imgAct = $(columna[row]).attr("src")
      for (var i = sig; i < rows; i++){
        var imgSig = $(columna[i]).attr("src")
        if(imgAct == imgSig){
          cont++
          if (i == rows-1){
            sig = rows
            break
          }
        } else {
          sig = i
          break
        }
      }
      for (var j = row; j < sig; j++){
        if (cont >2){
          //marco la celda como eliminada e incremento el puntaje
          $(columna[j]).attr("elim","true")
          $("#score-text").html(parseInt($("#score-text").html())+ cont)
        }
      }
      row = sig
    }
  }
}
// animacion para eliminar celdas marcadas
function elimCeldas(){
  $("img[elim='true']")
           .animate({
             opacity : 0
           }, 200)
           .animate({
             opacity : 100
           }, 200)
           .animate({
             opacity : 0
           }, 200)
           .animate({
             opacity : 100
           }, 200)
           .animate({
             opacity : 0
           }, 200)
           .animate({
             opacity : 100
           }, 200)
           .animate({
             opacity : 0
           }, 200)
           .animate({
             opacity : 100
           }, 200)
           .animate({
             opacity : 0
           }, 200, function(){
            //  $(this).detach()
           })

    $("img[elim='true']").promise().done(bajarCeldas)
}

//bajar celdas
function bajarCeldas(){
  //alert("bajando")
  //analizo de columna en columna
  for (var col = 0; col < cols; col++){
    var columna = $("img[col='" + col + "']")
    //busco imagenes eliminadas en la columna
    for (var row = 0; row < rows; row++){
      if ( $(columna[row]).attr("elim") == "true"){
        // genero la nueva imagen para la celda eliminada
        $(columna[row]).attr("src", genImg())
        for (var i = row; i >= 0; i--){
          if (i == 0){
            showFirst(columna[i])
            break
          }
          moveDown(columna[i-1], columna[i])
        }
        $(columna[row]).attr("ptos", "0")
      }
    }
  }

}

function moveDown(imagen, imagen2){
  $(imagen)
  .animate(
    { top : "+=85px"},
  600, "swing", function(){
    var newRow = parseInt($(imagen).attr("row")) + 1
    $(imagen).attr("row",  newRow  )
    //$(imagen2).detach()
    //$(imagen2).detach()
  })
}
function moveUp(imagen){
  $(imagen)
  .animate(
    { top : "-=85px"},
  600, "swing", function(){
    var newRow = parseInt($(imagen).attr("row")) - 1
    $(imagen).attr("row",  newRow  )
  })
}

function showFirst(imagen){
  //alert("entro move up")
  $(imagen)
  .animate(
    {
      opacity : "100"
    }, 600, function(){
      $(imagen).attr("row", "0"  )
    })
}
// actualizo del grid
function actualizarGrid(){
  alert("inicio actualizar grid")
  for (var row = 0; row < rows; row++) {
      for (var col=0; col< cols; col++) {
        if (grid[row][col].elim){
          for (var ant = row; ant >= 0; ant--){
            if (ant ==0){
              //estoy en la primera fila, debo generar la imagen
              var img = genImg()
              grid[ant][col].img = img
              var obj = grid[ant][col].obj
              //muestro la nueva imagen
              $(obj).attr("src", img)
              $(obj).css("opacity","100")
              //sleep(100)
              //$(obj).fadeIn(200)
              //alert("row:" + grid[ant][col].row + "col: " + grid[ant][col].row)
              break
            }
            //intercambio las imagenes
            var imgAbajo = grid[ant][col].img
            var imgArriba = grid[ant-1][col].img
            grid[ant][col].img = imgArriba
            grid[ant-1][col].img = imgAbajo
            //intercambio las imagenes visualmente
            //celda de abajo
            var objAbajo = grid[ant][col].obj
            $(objAbajo).attr("src",imgArriba)
            $(objAbajo).css("opacity","100")
            //sleep(100)
            //$(objAbajo).fadeIn(200)
            //celda de arriba
            var objArriba = grid[ant-1][col].obj
            //setTimeout($(objArriba).attr("src", imgAbajo),2000)
            $(objArriba).css("opacity", "0")
            //sleep(100)
            //$(objArriba).fadeOut(200)
          }
          grid[row][col].elim = false
          grid[row][col].ptos = 0
        }
        //sleep(100)
      }
    }
    //alert("fin actualizar grid")
}



// funcion principal
$(function(){
  // animacion de titulo, cambio de color
  colorRojo($(".main-titulo"));
  // Armar el grid con los elementos y llenar el tablero
   initGrid();
   llenarTablero();
   //llenarTablero2();
   intercambiar2()
  // Revisar tablero
  celdasHorizontal();
  celdasVertical();
  elimCeldas();
  //setTimeout(actualizarGrid(), 60000)
}); // fin de la funcion principal
