var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;
var control;
function inicio () {
	control = setInterval(cronometro,10);

}
function parar () {
	clearInterval(control);

}
function reinicio () {
	clearInterval(control);
	centesimas = 0;
	segundos = 0;
	minutos = 0;
	horas = 0;
	Centesimas.innerHTML = ":00";
	Segundos.innerHTML = ":00";
	Minutos.innerHTML = ":00";
	Horas.innerHTML = "00";

}
function inicioDown(seg, min){
	clearInterval(control)
	segundos = seg
	minutos = min
	if (segundos < 10) { $("#timer").text(minutos + ":0" + segundos) }
	else {$("#timer").text(minutos + ":" + segundos)}
}

function countDown(){
	segundos--
	if (segundos < 0){
		segundos = 59
		minutos--
	}
	if (segundos < 10) { $("#timer").text(minutos + ":0" + segundos) }
	else {$("#timer").text(minutos + ":" + segundos)}

	if(minutos < 0){
		// llego al final
		reiniciarPartida()
	} else {
		setTimeout("countDown()",1000)
	}

}

function cronometro () {
	if (centesimas < 99) {
		centesimas++;
		if (centesimas < 10) { centesimas = "0"+centesimas }
		Centesimas.innerHTML = ":"+centesimas;
	}
	if (centesimas == 99) {
		centesimas = -1;
	}
	if (centesimas == 0) {
		segundos ++;
		if (segundos < 10) { segundos = "0"+segundos }
		Segundos.innerHTML = ":"+segundos;
	}
	if (segundos == 59) {
		segundos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0) ) {
		minutos++;
		if (minutos < 10) { minutos = "0"+minutos }
		Minutos.innerHTML = ":"+minutos;
	}
	if (minutos == 59) {
		minutos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
		horas ++;
		if (horas < 10) { horas = "0"+horas }
		Horas.innerHTML = horas;
	}
}
