
//função para contador
let calculate = (n1, n2, n3) => {
  let v1 = parseInt(n1)
  let v2 = parseInt(n2)
  let passo = parseInt(n3)
  let cont = ''

  if (n3 <= 0) passo = 1
  if (n3 == 0) alert("Valor vazio ou igual a zero intervalo retorna 01!");

  if (n1 === '' || n2 === '') alert("Preencha este campo!!");

  if (v1 <= v2) {
    for (let c = v1; c <= v2; c += passo) {
      cont += `${c}\;  `
    }
    return cont
  } else {
    for (let c = v1; c >= v2; c -= passo) {
      cont += `${c}\; `
    }
    return cont
  }



}


const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator--keys')
const display = document.querySelector('.cont--display')
let valor1 = document.querySelector('.cont--primValor')
let valor2 = document.querySelector('.cont--segValor')
let interv = document.querySelector('.cont--intervalo')


// evento ao clicar nos botões
keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    // alert('fui submetido')


    const key = e.target
    const action = key.dataset.action
    let primV = valor1.value;
    let segV = valor2.value;
    let pass = interv.value;


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
        interv.value = ''
      }
    }




    if (action === 'calculate') {
      let primValue = primV
      let segValue = segV
      let thirthValue = pass



      display.textContent = calculate(primValue, segValue, thirthValue)

    }

  }

})


