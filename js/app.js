// Arreglo de imagenes
var imagenes=[];
imagenes[0] = "image/1.png";
imagenes[1] = "image/2.png";
imagenes[2] = "image/3.png";
imagenes[3] = "image/4.png";

// Matriz para identificar la posicion de las imagenes
var rows = 7;
var cols = 7;
var reemplazar = false;
var iniLeft, iniTop;

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
// llenar el tablero
function llenarTablero(){
  for (var col = 0; col < cols; col++){
    left= 100 + col * 115
    for (var row = 0; row < rows; row++){
      tope = 160 + row * 90
      var img = genImg()
      var cell = $("<img src='" + img + "' style='" + " top: " + tope + "px; left: " + left + "px'"+ " col='" +  col + "' row='"+ row +"' />")
      $(cell).appendTo("body")
    }
  }
};
function limpiarTablero(){
  $("img").remove()
}

// funciones para revisar el tablero y reemplazar imagenes
// reordenar columnas
function reOrdenarCol(fila){
  for ( var row = 0; row < rows; row ++){
    var filaNew = []
    var col = 0
    while (col < cols){
      for (var i = 0; i < cols; i++){
        var colNew = fila[i]
        //alert($(colNew).attr("col"))
        if ($(colNew).attr("col") == col){
          filaNew.push(colNew)
          break
        }
      }
      col++
    }
  }
  return(filaNew)
}
// revisar horizontalmente si hay tres repeticiones o mas
function celdasHorizontal(){
  for ( var row = 0; row < rows; row ++){
      var filaOld = $("img[row='"+ row + "']")
      var fila = reOrdenarCol(filaOld)
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
            reemplazar = true
          }
        }
        col = sig
      }
  }

}
// reordenar las filas
function reOrdenarRow(fila){
  for ( var row = 0; row < rows; row ++){
    var filaNew = []
    var col = 0
    while (col < cols){
      for (var i = 0; i < cols; i++){
        var colNew = fila[i]
        //alert($(colNew).attr("col"))
        if ($(colNew).attr("row") == col){
          filaNew.push(colNew)
          break
        }
      }
      col++
    }
  }
  return(filaNew)
}
// revisar verticalmente si hay tres repeticiones o mas
function celdasVertical() {
  for (var col = 0; col < cols; col++){
    var columnaOld = $("img[col='" + col + "']")
    var columna =  reOrdenarRow(columnaOld)
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
          reemplazar = true
        }
      }
      row = sig
    }
  }
}

// funciones para realizar la animacion
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
           }, 200, function(){
             $(this).attr("src",genImg())
           })

    $("img[elim='true']").promise().done(bajarCeldas)
}
// bajar celdas
function bajarCeldas(){
    for (var col = 0; col < cols; col++){
      var columnaOld = $("img[col='" + col + "']")
      var columna = reOrdenarRow(columnaOld)
      //busco imagenes eliminadas en la columna
      for (var row = 0; row < rows; row++){
         if ( $(columna[row]).attr("elim") == "true"){
          // marco las celdas para bajar
          for (var ant = row; ant >= 0; ant--){
            if (ant == 0){
              //estoy en la primera fila, debo generar la imagen
              showFirst(columna[row])
              break
            } else {
              moveDown(columna[ant-1])
            }
        }
      }
    }
  }
  reemplazar = false
  $("img[elim='true']").promise().done(revisarTablero)
}
// función para repetir mientras se encuentren tres o mas repeticiones
function revisarTablero(){
  celdasHorizontal()
  celdasVertical()
  if (reemplazar){
      $("img").draggable({disabled: true })
      elimCeldas()
  } else{
      $("img").draggable({disabled: false })
  }

}
// mover imagenes hacia abajo
function moveDown(imagen){
  $(imagen)
  .animate(
    { top :  "+=90"},
  200, "swing", function(){
    var newRow = parseInt($(imagen).attr("row")) + 1
    $(imagen).attr("row",  newRow  )
  })
}
//colocar una nueva imagen en la parte superior
function showFirst(imagen){
  $(imagen)
  .animate(
    { top : "160"}, 200
  )
  .animate(
    {
      opacity : "100"
    }, 200, function(){
      $(imagen).attr("row", "0"  )
      $(imagen).attr("elim", "false"  )
    })
}
// drag and drop
// funcion para setear el drag and drop en todas las imagenes
function setDragDrop(){
  $("img").draggable({
        revert: true, helper: "none",
        start: function(){
          iniLeft = parseInt($(this).css("left"))
          iniTop = parseInt($(this).css("top"))
        }
      });
  $("img").droppable({
    accept: "img",
    drop: function( event, ui ) {
       var draggable = ui.draggable, droppable = $(this),
           dragPos = draggable.position(), dropPos = droppable.position();
        var left = parseInt(dragPos.left)
        var top  = parseInt(dragPos.top)
        $("#movimientos-text").html(parseInt($("#movimientos-text").html()) + 1)
        if (((Math.abs(left - iniLeft) <= 150) && (Math.abs(top - iniTop) <= 20)) ||
            ((Math.abs(left - iniLeft) <= 20) && (Math.abs(top - iniTop) <= 150))){
          var imag1 = draggable.attr("src")
          var imag2 = droppable.attr("src")
          draggable.attr("src", imag2)
          droppable.attr("src", imag1)
          // vuelvo a revisar el tablero para eliminar tres repeticiones o mas
          setTimeout("revisarTablero()",600)
        }
    }
  })
}
//reiniciar partida
function reiniciarPartida(){
  $("#movimientos-text").text("0")
  $("#score-text").text("0")
  inicioDown(0, 2)
  limpiarTablero()
  $(".panel-tablero").animate( {width: "0%"}, 1000 ).animate({opacity: "0"}, 200)
  $(".panel-score").animate( {width: "90%"}, 1000 )
}

// funcion principal
$(function(){
  // animacion de titulo, cambio de color
  colorRojo($(".main-titulo"));

  $(".btn-reinicio").click(function(){
    if ($(this).text() == "Iniciar"){
      // preparar el tablero
      $(this).text("Reiniciar")
      $("#score-text").html("0")
      limpiarTablero()
    }
    else {
      $(".panel-tablero").animate( {width: "70%"}, 1000 ).animate({opacity: "100"}, 200)
      $(".panel-score").animate( {width: "25%"}, 1000 )
    }
    // llenar el tablero
    llenarTablero()
    // activo el drag and drop
    setDragDrop()
    revisarTablero()
    // activo el timer
    inicioDown(0, 2)
    countDown()
  })

}); // fin de la funcion principal
