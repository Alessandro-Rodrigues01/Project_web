// variaveis do lado do timer
const timer = document.querySelector('.startTime'); //evento
const limpar = document.querySelector('.refreshLimpar'); // evento
let entra2 = document.querySelector('.calculator--entra2');  //
let datas = document.querySelector('.calculator--data');
let selectTurno = document.querySelector('.escohleTurno');
let percent1 = document.querySelector('.escohlePorcent')
let salario = document.querySelector('.calculator--salario');
var checkboxT = document.querySelector(".switch-check");
var btnTimer = document.getElementById("myBtn");



// evento do lado do timer
timer.addEventListener('click', e => {
	if (e.target.matches('button')) {
		//alert('fui submetido')

		const key = e.target
		const action = key.dataset.action
		let sal = salario.value;
		let ent2 = entra2.value;
		let escolhet = selectTurno.value; // turno escolhido
		let myDate = datas.value;
		let perc1 = percent1.value;


		if (action === 'clear-time') {
			if (key.textContent === 'Limpar') {
				datas.value = ''
				entra2.value = ''
			}
		}


		// conversor de tempo
		var confirmar = confirm('Certifique-se  de que todos os campos foram preenchidos corretamente !! \nPara confirmar: Click em OK ! \nPara abortar: Click em Cancelar ! \n');
		if (confirmar == true) {
			btnTimer = document.getElementById("myBtn").disabled = true;
			entra2 = document.querySelector('.calculator--entra2').disabled = true;
			datas = document.querySelector('.calculator--data').disabled = true;
			selectTurno = document.querySelector('.escohleTurno').disabled = true;
			percent1 = document.querySelector('.escohlePorcent').disabled = true;
			salario = document.querySelector('.calculator--salario').disabled = true;
		}

		if (confirmar == true && sal != '' && ent2 != '' && escolhet != 0 && myDate != '' && perc1 != 0) {
			btnTimer = document.getElementById("myBtn").innerHTML = 'Processando...'
			btnTimer = document.getElementById("myBtn").style.color = '#FFFACD'
			btnTimer = document.getElementById("myBtn").style.fontFamily = 'Didot, serif'
		}
		if (action === 'start-hora' && confirmar == true && action != 'clear-time') {

			if (myDate === '' || ent2 === '' || escolhet <= 0 || sal === '' || perc1 <= 0) alert("Favor preencher todos os campos !!\nClick em Refresh/limpar !!");


			var datasNova = myDate
			var horaEnt = ent2  // entrada
			var turnoEs = parseFloat(escolhet) // turno escolhido
			var ganhos = parseFloat(sal)
			var percent2 = parseFloat(perc1)

			//codigo para acrescentar mais um dia caso o turno passe da meia noite !!
			var mudaData = new Date(datasNova + 'T' + horaEnt + ':01');
			var dia = (mudaData.getDate() + 1);
			if (dia < 10) dia = '0' + dia
			if (dia == '32') dia = '01'
			var mes = (mudaData.getMonth() + 1);
			if (dia == '01') mes = (mudaData.getMonth() + 2)
			if (mes == '13') mes = (mudaData.getMonth() - 10)
			if (mes < 10) mes = '0' + mes
			if (dia == '32') mes = (mudaData.getMonth());
			var ano = mudaData.getFullYear();
			if (mes == '01' && dia == '01') ano = (mudaData.getFullYear() + 1);
			if (mes == '04' || mes == '06' || mes == '09' || mes == '11') {
				if (dia == '31') {
					mes = (mudaData.getMonth() + 2);
					dia = '01'
					if (mes < 10) mes = '0' + mes
				}
			}

			// Tratativa para ano bissexto
			if (ano % 4 === 0 && mes == '02' && dia == '30') { // dia 29/02
				mes = '03'
				dia = '01'
			} else if (ano % 4 !== 0 && mes == '02' && dia == '29') { // dia 28/02
				mes = '03'
				dia = '01'
			}
			//////

			var diaMaisUm = ano + '-' + mes + '-' + dia // variavel dia + 1
			var entradaDec = horaEnt.toString().replace(':', '.'); // transforma a hora da entrada em decimal para fazer a comparação '< ou >'
			var dataFormat = dia + '/' + mes + '/' + ano
			//////////

			// mudando o formato do input data 'dias normais' de yyyy/mm/dd  para dd/mm/yyyy
			var dataFormat2 = myDate.toString().replaceAll('-', '/')

			let dateObj = new Date(dataFormat2);

			if (!isNaN(dateObj)) {
				let day = dateObj.getDate();
				day = day < 10 ? "0" + day : day;
				let month = dateObj.getMonth() + 1;
				month = month < 10 ? "0" + month : month;
				const year = dateObj.getFullYear();

				var resultDate = `${day}/${month}/${year}`;
			}
			//////



			// console.log (diaMaisUm)
			// console.log (dataFormat2)

			// codigo para a hora da entada + o turno eecolhido
			var data = new Date(datasNova + 'T' + horaEnt + ':01');
			data.setHours(data.getHours() + turnoEs);
			data.setMinutes(data.getMinutes())
			if (turnoEs === 7) data.setMinutes(data.getMinutes() + 80);
			if (turnoEs === 8) data.setMinutes(data.getMinutes() + 48);
			if (turnoEs === 9) data.setMinutes(data.getMinutes() + 48);

			var horaIni = data.getHours();
			if (horaIni < 10) horaIni = '0' + horaIni
			var minut = data.getMinutes();
			if (minut < 10) minut = '0' + minut

			///////


			// aqui se o turno acabar depois da meia noite, este trecho usa a variavel com dia + 1
			var deadline = ''
			if (turnoEs === 12 && entradaDec > 11.59 && entradaDec <= 23.59) deadline = new Date(diaMaisUm + 'T' + horaIni + ':' + minut + ':' + '01').getTime();
			if (turnoEs === 7 && entradaDec > 15.39 && entradaDec <= 23.59) deadline = new Date(diaMaisUm + 'T' + horaIni + ':' + minut + ':' + '01').getTime();
			if (turnoEs === 8 && entradaDec > 15.11 && entradaDec <= 23.59) deadline = new Date(diaMaisUm + 'T' + horaIni + ':' + minut + ':' + '01').getTime();
			if (turnoEs === 9 && entradaDec > 14.11 && entradaDec <= 23.59) deadline = new Date(diaMaisUm + 'T' + horaIni + ':' + minut + ':' + '01').getTime();

			// aqui se o turno termianar até 23:59 usa a variavel coma data do dia
			else if (turnoEs === 7 && entradaDec <= 15.39 && entradaDec >= 0) deadline = new Date(datasNova + 'T' + horaIni + ':' + minut + ':' + '01').getTime();
			else if (turnoEs === 8 && entradaDec <= 15.11 && entradaDec >= 0) deadline = new Date(datasNova + 'T' + horaIni + ':' + minut + ':' + '01').getTime();
			else if (turnoEs === 12 && entradaDec <= 11.59 && entradaDec >= 0) deadline = new Date(datasNova + 'T' + horaIni + ':' + minut + ':' + '01').getTime();
			else if (turnoEs === 9 && entradaDec <= 14.11 && entradaDec >= 0) deadline = new Date(datasNova + 'T' + horaIni + ':' + minut + ':' + '01').getTime();


			// codigo para somar a jornada trabalhada
			var inicioJor = new Date(datasNova + 'T' + horaEnt);
			var fimJor = new Date(datasNova + 'T' + horaIni + ':' + minut);

			var jornada = new Date(fimJor - inicioJor);
			var resultHj = (jornada.getHours() + 3)
			if (resultHj < 10) resultHj = '0' + resultHj

			var resultMj = jornada.getMinutes();
			if (resultMj < 10) resultMj = '0' + resultMj



			// função de conversão de time
			var x = setInterval(function () {
				var now = new Date().getTime();
				var t = deadline - now;
				var days = Math.floor(t / (1000 * 60 * 60 * 24));
				if (days < 10) days = '0' + days
				var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				if (hours < 10) hours = '0' + hours
				var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
				if (minutes < 10) minutes = '0' + minutes
				var seconds = Math.floor((t % (1000 * 60)) / 1000);
				if (seconds < 10 || seconds > 59) seconds = '0' + seconds

				if (myDate === '' || ent2 === '' || escolhet <= 0 || perc1 <= 0) {
					document.getElementById("demo4").innerHTML = 'Campos inválidos, click em "Refresh/Limpar"'
					document.getElementById("demo4").style.color = "#FF0000"
					document.getElementById("demo4").style.fontSize = '14px'

				} else {
					document.getElementById("demo4").innerHTML = 'Jornada à trabalhar: ' + resultHj + ':' + resultMj + ' hrs.';
					document.getElementById("demo4").style.textDecoration = "underline #363636"
				}


				if (turnoEs === 12 && entradaDec > 11.59 && entradaDec <= 23.59) document.getElementById("demo3").innerHTML = 'Às ' + horaIni + ':' + minut + ' hrs, em ' + dataFormat; //final do expediente
				if (turnoEs === 7 && entradaDec > 15.39 && entradaDec <= 23.59) document.getElementById("demo3").innerHTML = 'Às ' + horaIni + ':' + minut + ' hrs, em ' + dataFormat; //final do expediente
				if (turnoEs === 8 && entradaDec > 15.11 && entradaDec <= 23.59) document.getElementById("demo3").innerHTML = 'Às ' + horaIni + ':' + minut + ' hrs, em ' + dataFormat; //final do expediente
				if (turnoEs === 9 && entradaDec > 14.11 && entradaDec <= 23.59) document.getElementById("demo3").innerHTML = 'Às ' + horaIni + ':' + minut + ' hrs, em ' + dataFormat; //final do expediente

				else if (turnoEs === 7 && entradaDec <= 15.39 && entradaDec >= 0) document.getElementById("demo3").innerHTML = 'Às ' + horaIni + ':' + minut + ' hrs, em ' + resultDate; //final do expediente
				else if (turnoEs === 8 && entradaDec <= 15.11 && entradaDec >= 0) document.getElementById("demo3").innerHTML = 'Às ' + horaIni + ':' + minut + ' hrs, em ' + resultDate; //final do expediente
				else if (turnoEs === 12 && entradaDec <= 11.59 && entradaDec >= 0) document.getElementById("demo3").innerHTML = 'Às ' + horaIni + ':' + minut + ' hrs, em ' + resultDate; //final do expediente
				else if (turnoEs === 9 && entradaDec <= 14.11 && entradaDec >= 0) document.getElementById("demo3").innerHTML = 'Às ' + horaIni + ':' + minut + ' hrs, em ' + resultDate; //final do expediente

				if (isNaN(horaIni, minut) || dataFormat === undefined || resultDate === undefined) document.getElementById("demo3").innerHTML = 'Campos inválidos!'

				if (t >= 0 && perc1 != 0) {
					if (days >= 0 && days) document.getElementById("day").innerHTML = days;
					if (hours >= 0) document.getElementById("hour").innerHTML = hours;
					if (minutes >= 0) document.getElementById("minute").innerHTML = minutes;
					if (seconds >= 0) document.getElementById("second").innerHTML = seconds;
				}

				if (hours <= 0 && minutes < 20 && days <= 0) {

					document.getElementById("demo2--1").innerHTML = `\u231B` + "Tempo esgotando!!";

				} else if (t < 0 && sal != '' && ent2 != '' && escolhet != 0 && myDate != '' && perc1 != 0) {
					//clearInterval(x);
					document.getElementById("demo").innerHTML = "<img src ='ICONI/TEMPO_ESGOTADO.jpeg'  width='275px'>";
					document.getElementById("demo2--1").innerHTML = "";

				} else if (myDate === '' || ent2 === '' || perc1 <= 0 || escolhet <= 0) {
					document.getElementById("demo").innerHTML = 'Campos inválidos, click em "Refresh/Limpar!" '
					document.getElementById("demo").style.color = "#8A2BE2"
					document.getElementById("demo").style.fontSize = '14px'
				}

			}, 1000);



			var x = setInterval(function () {

				var now = new Date().getTime();
				var t = deadline - now;
				var days = Math.floor(t / (1000 * 60 * 60 * 24));
				if (days < 10) days = '0' + days
				var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				if (hours < 10) hours = '0' + hours
				var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
				if (minutes < 10) minutes = '0' + minutes
				var seconds = Math.floor((t % (1000 * 60)) / 1000);
				if (seconds < 10 || seconds > 59) seconds = '0' + seconds




				var datasNova = myDate
				var horaEnt = ent2  // entrada
				var turnoEs = parseFloat(escolhet) // turno escolhido 



				var data = new Date(datasNova + 'T' + horaEnt + ':01');


				data.setHours(data.getHours() + turnoEs);
				data.setMinutes(data.getMinutes())
				if (turnoEs === 7) data.setMinutes(data.getMinutes() + 80);
				if (turnoEs === 8) data.setMinutes(data.getMinutes() + 48);
				if (turnoEs === 9) data.setMinutes(data.getMinutes() + 48);



				var horaIni = data.getHours();
				if (horaIni < 10) horaIni = '0' + horaIni
				var minut = data.getMinutes();
				if (minut < 10) minut = '0' + minut



				var inicioJor = new Date(datasNova + 'T' + horaEnt);
				var fimJor = new Date(datasNova + 'T' + horaIni + ':' + minut);
				var jornada = new Date(fimJor - inicioJor);
				var resultHj = (jornada.getHours() + 3)
				if (resultHj < 10) resultHj = '0' + resultHj
				var resultMj = jornada.getMinutes();
				if (resultMj < 10) resultMj = '0' + resultMj




				if (checkboxT.checked && turnoEs != 0 && perc1 != 0) {
					var diferenca = new Date(now - inicioJor);
					var resultadoH = diferenca.getUTCHours()
					if (resultadoH < 10) resultadoH = '0' + resultadoH
					resultadoH = resultadoH

					var resultadoH2 = diferenca.getUTCMinutes();

					if (resultadoH2 < 10) resultadoH2 = '0' + resultadoH2
					resultadoH2 = resultadoH2
					var resultadoH3 = diferenca.getUTCSeconds() + '';
					if (resultadoH3 < 10) resultadoH3 = '0' + resultadoH3

					let valorH = ganhos / 220 //valor em horas
					let valorMin = valorH / 60 // valor em minutos
					let valorSeg = valorMin / 60 //valor em segundos
					let valorHoraT = resultadoH * valorH
					let valorMinutT = resultadoH2 * valorMin
					let valorSegundT = resultadoH3 * valorSeg
					let totalH = valorHoraT + valorMinutT + valorSegundT  // somando valor em horas e minutos convertidos
					// console.log ('valor hora total ' + totalH)
					let valorHoraExtra = totalH * percent2 / 100 + totalH
					valorHoraExtra = valorHoraExtra.toFixed(2);
					var valorTotalExtra = valorHoraExtra.toString().replace('.', ',');


					if (salario.value === '' || isNaN(valorHoraExtra)) {
						document.getElementById("demo2").innerHTML = 'Campo salário inválido, click em "Refresh/Limpar!" '
						document.getElementById("demo2").style.color = "#8A2BE2"
						document.getElementById("demo2").style.fontSize = '15px'
					} else if (checkboxT.checked) {
						document.getElementById("demo2").innerHTML = 'Valor em R$: ' + valorTotalExtra + ` \uD83D\uDCB8`
					}
					if (isNaN(resultadoH, resultadoH2, resultadoH3)) {
						document.getElementById("demo5").innerHTML = 'Preenchimento inválido.'

					} else if (checkboxT.checked) {
						document.getElementById("demo5").innerHTML = 'Contando horas extras: ' + resultadoH + ':' + resultadoH2 + ':' + resultadoH3
						document.getElementById("demo2--1").style.display = "none"
					}

				} else {
					document.getElementById("demo5").innerHTML = ""
					document.getElementById("demo2").innerHTML = ""
					document.getElementById("demo2--1").style.display = "block"
				}




				if (t < 0 && checkboxT.checked == false && turnoEs != 0 && perc1 != 0) {
					var diferenca = new Date(now - fimJor);
					var resultadoH = diferenca.getUTCHours()
					if (resultadoH < 10) resultadoH = '0' + resultadoH
					resultadoH = resultadoH

					var resultadoH2 = diferenca.getUTCMinutes();

					if (resultadoH2 < 10) resultadoH2 = '0' + resultadoH2
					resultadoH2 = resultadoH2

					var resultadoH3 = diferenca.getUTCSeconds() + '';
					if (resultadoH3 < 10) resultadoH3 = '0' + resultadoH3


					let valorH = ganhos / 220 //valor em horas
					let valorMin = valorH / 60 // valor em minutos
					let valorSeg = valorMin / 60 //valor em segundos
					let valorHoraT = resultadoH * valorH
					let valorMinutT = resultadoH2 * valorMin
					let valorSegundT = resultadoH3 * valorSeg
					let totalH = valorHoraT + valorMinutT + valorSegundT  // somando valor em horas e minutos convertidos
					// console.log ('valor hora total ' + totalH)

					let valorHoraExtra = totalH * percent2 / 100 + totalH
					valorHoraExtra = valorHoraExtra.toFixed(2);
					var valorTotalExtra = valorHoraExtra.toString().replace('.', ',');

					if (salario.value === '' || isNaN(valorHoraExtra)) {
						document.getElementById("demo2").innerHTML = 'Campo salário inválido, click em "Refresh/Limpar!" '
						document.getElementById("demo2").style.color = "#8A2BE2"
						document.getElementById("demo2").style.fontSize = '15px'
					} else if (t < 0) {
						document.getElementById("demo2").innerHTML = 'Valor em R$: ' + valorTotalExtra + ` \uD83D\uDCB8`
						document.getElementById("demo2--1").style.marginBottom = "-30px"
					}
					if (isNaN(resultadoH, resultadoH2, resultadoH3)) {
						document.getElementById("demo5").innerHTML = 'Preenchimento inválido.'
					} else if (t < 0) document.getElementById("demo5").innerHTML = 'Contando horas extras: ' + resultadoH + ':' + resultadoH2 + ':' + resultadoH3

				}


			}, 1000);



		}

	}
})



//evento para limpar e atualizar
limpar.addEventListener('click', e => {
	if (e.target.matches('button')) {
		//alert('fui submetido')

		const key = e.target
		const action = key.dataset.action

		// limpar e atualizar a pagina
		if (action === 'clear-time') {
			setTimeout(function () {
				window.location.reload(1);
			}, 1000);

		}
	}
})




// Relogio digital
var x = setInterval(function () {
	var now = new Date();
	var dia = now.getDate();
	var mes = (now.getMonth() + 1);
	var ano = now.getFullYear();
	var hora = now.getHours();
	var minuto = now.getMinutes();
	var segundo = now.getSeconds();
	if (hora < 10) hora = '0' + hora
	if (minuto < 10) minuto = '0' + minuto
	if (segundo < 10) segundo = '0' + segundo

	const opcoes = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timezone: 'UTC'
	};

	//console.log(dia + '/' + mes + '/' + ano + '  ' + hora + ':' + minuto + ':' + segundo )
	//console.log(now.toLocaleDateString('pt-BR',opcoes));

	document.getElementById("dataHora").innerHTML = now.toLocaleDateString('pt-BR', opcoes) + `${'\n'} \uD83D\uDD57` + hora + ':' + minuto + ':' + segundo

}, 1000);


