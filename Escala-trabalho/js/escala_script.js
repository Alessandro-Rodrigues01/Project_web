
const limpar = document.querySelector('.refreshLimpar'); // evento limpar
const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.key--equals') //evento click
const display = document.querySelector('.cont--display')
let dataInp = document.querySelector('.data')
let escalaOp = document.querySelector('.escohleEscala')


// evento ao clicar em executar
keys.addEventListener('click', e => {
	if (e.target.matches('button')) {
		// alert('fui submetido')


		const key = e.target
		const action = key.dataset.action
		let escolheEsc = escalaOp.value;
		let myDate = dataInp.value;


		var datasNova = myDate
		var escoEsc = parseInt(escolheEsc)

		if (myDate === '' || escolheEsc <= 0) alert("Campo sem preenchimento!");

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




		/*get the week number by following the norms of ISO 8601*/
		function getWeek(dt) {
			var calc = function (o) {
				if (o.dtmin.getDay() != 1) {
					if (o.dtmin.getDay() <= 4 && o.dtmin.getDay() != 0) o.w += 1;
					o.dtmin.setDate((o.dtmin.getDay() == 0) ? 2 : 1 + (7 - o.dtmin.getDay()) + 1);
				}
				o.w += Math.ceil((((o.dtmax.getTime() - o.dtmin.getTime()) / (24 * 60 * 60 * 1000)) + 1) / 7);
			}, getNbDaysInAMonth = function (year, month) {
				var nbdays = 31;
				for (var i = 0; i <= 3; i++) {
					nbdays = nbdays - i;
					if ((dtInst = new Date(year, month - 1, nbdays)) && dtInst.getDate() == nbdays && (dtInst.getMonth() + 1) == month && dtInst.getFullYear() == year)
						break;
				}
				return nbdays;
			};
			if (dt.getMonth() + 1 == 1 && dt.getDate() >= 1 && dt.getDate() <= 3 && (dt.getDay() >= 5 || dt.getDay() == 0)) {
				var pyData = { "dtmin": new Date(dt.getFullYear() - 1, 0, 1, 0, 0, 0, 0), "dtmax": new Date(dt.getFullYear() - 1, 11, getNbDaysInAMonth(dt.getFullYear() - 1, 12), 0, 0, 0, 0), "w": 0 };
				calc(pyData);
				return pyData.w;
			} else {
				var ayData = { "dtmin": new Date(dt.getFullYear(), 0, 1, 0, 0, 0, 0), "dtmax": new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0, 0, 0), "w": 0 },
					nd12m = getNbDaysInAMonth(dt.getFullYear(), 12);
				if (dt.getMonth() == 12 && dt.getDay() != 0 && dt.getDay() <= 3 && nd12m - dt.getDate() <= 3 - dt.getDay()) ayData.w = 1; else calc(ayData);
				return ayData.w;
			}
		}

		//console.log(getWeek(new Date(datasNova +'T00:00:00')));


		var primSemAno = escoEsc;  // 1 == vazio 2 = cheio
		var semanaCheia = ['segunda-feira', 'quarta-feira', 'sexta-feira', 'sábado', 'domingo'];
		var semanaVazia = ['terça-feira', 'quinta-feira'];

		//var cont = ''
		var interc = ''
		if (primSemAno === 1) {
			for (var i = 1; i <= getWeek(new Date(datasNova + 'T00:00:00')); i++) {
				if (i % 2 != 0) {
					interc = semanaVazia
				} else {
					interc = semanaCheia
				}
				//cont += i + '--'
			}
		}
		else if (primSemAno === 2) {
			for (var i = 1; i <= getWeek(new Date(datasNova + 'T00:00:00')); i++) {
				if (i % 2 != 0) {

					interc = semanaCheia
				} else {
					interc = semanaVazia
				}
				//cont += i + '--'
			}
		}

		var now = new Date(datasNova + 'T00:00:00');
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
			//year: 'numeric',
			//month: 'long',
			//day: 'numeric',
			//timezone: 'UTC'
		};



		var diaSema = now.toLocaleDateString('pt-BR', opcoes)
		if (interc == semanaCheia && diaSema == 'terça-feira') document.getElementById('display').innerHTML = 'Dia: ' + resultDate + ', ' + diaSema + ' semana cheia, folga!'
		else if (interc == semanaCheia && diaSema == 'quinta-feira') document.getElementById('display').innerHTML = 'Dia ' + resultDate + ', ' + diaSema + ' semana cheia, folga!'
		else if (interc == semanaCheia && diaSema !== 'terça-feira') document.getElementById('display').innerHTML = 'Dia ' + resultDate + ', ' + diaSema + ' semana cheia, trabalho!'
		else if (interc == semanaCheia && diaSema !== 'quinta-feira') document.getElementById('display').innerHTML = 'Dia ' + resultDate + ', ' + diaSema + ' semana cheia, trabalho!'

		if (interc == semanaVazia && diaSema == 'segunda-feira') document.getElementById('display').innerHTML = 'Dia: ' + resultDate + ', ' + diaSema + ' semana vazia, folga!'
		else if (interc == semanaVazia && diaSema == 'quarta-feira') document.getElementById('display').innerHTML = 'Dia ' + resultDate + ', ' + diaSema + ' semana vazia, folga!'
		else if (interc == semanaVazia && diaSema == 'sexta-feira') document.getElementById('display').innerHTML = 'Dia ' + resultDate + ', ' + diaSema + ' semana vazia, folga!'
		else if (interc == semanaVazia && diaSema == 'sábado') document.getElementById('display').innerHTML = 'Dia ' + resultDate + ', ' + diaSema + ' semana vazia, folga!'
		else if (interc == semanaVazia && diaSema == 'domingo') document.getElementById('display').innerHTML = 'Dia ' + resultDate + ', ' + diaSema + ' semana vazia, folga!'

		else if (interc == semanaVazia && diaSema !== 'segunda-feira') document.getElementById('display').innerHTML = 'Dia ' + resultDate + ', ' + diaSema + ' semana vazia, trabalho!'
		else if (interc == semanaVazia && diaSema !== 'quarta-feira') document.getElementById('display').innerHTML = 'Dia ' + resultDate + ', ' + diaSema + ' semana vazia, trabalho!'
		else if (interc == semanaVazia && diaSema !== 'sexta-feira') document.getElementById('display').innerHTML = 'Dia ' + resultDate + ', ' + diaSema + ' semana vazia, trabalho!'
		else if (interc == semanaVazia && diaSema !== 'sábado') document.getElementById('display').innerHTML = 'Dia ' + resultDate + ', ' + diaSema + ' semana vazia, trabalho!'
		else if (interc == semanaVazia && diaSema !== 'domingo') document.getElementById('display').innerHTML = 'Dia ' + resultDate + ', ' + diaSema + ' semana vazia, trabalho!'


		/* console.log(cont)
		 console.log(interc)
	 */
	}

})

//evento para limpar e atualizar
limpar.addEventListener('click', e => {
	if (e.target.matches('button')) {
		//alert('fui submetido')

		const key = e.target
		const action = key.dataset.action

		// limpar e atualizar a pagina
		if (action === 'clear') {
			setTimeout(function () {
				window.location.reload(1);
			}, 1000);

		}
	}
})
