
//função para contador
let calculate = (n1, n2) => {
  let v1 = parseInt(n1)
  let v2 = parseInt(n2)
  let tab = '';
  let result = '';

  if (n1 === '') alert("Preencha este campo!!");

  if (v1 > 0) {
    for (let i = 0; i <= v2; i++) {
      tab = v1 * i;
      result += `${v1 + ' X ' + i + '   =   ' + tab} \   ` + `${'\n'}`
    }
    return result
  }

}

const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator--keys')
const display = document.querySelector('.cont--display')
let valor1 = document.querySelector('.cont--primValor')
let valor2 = document.querySelector('.cont--segValor')


// evento ao clicar nos botões
keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    // alert('fui submetido')


    const key = e.target
    const action = key.dataset.action
    let primV = valor1.value;
    let segV = valor2.value;


    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed')) // Desmarcar a pressão no operador assim que o segundo numero for digitado




    if (
      action === 'clear' ||
      action === 'calculate'
    ) {
      key.classList.add('is-depressed')
    }



    //Codigo para limpar o diplay
    if (action === 'clear') {
      // console.log('clear key')
      if (key.textContent === 'Limpar') {
        key.textContent = 'Limpar'
        display.textContent = ''
        valor1.value = ''
        valor2.value = ''
      }
    }





    // Codigo para calcular ao acionar a tecla de igual '='
    if (action === 'calculate') {
      let primValue = primV
      let segValue = segV



      display.textContent = calculate(primValue, segValue)

    }

  }

})


