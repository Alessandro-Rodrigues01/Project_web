
//função para calcular
const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1)
  const secondNum = parseFloat(n2)
  var pot = ''
  if (operator === 'add') return firstNum + secondNum
  if (operator === 'subtract') return firstNum - secondNum
  if (operator === 'multiply') return firstNum * secondNum
  if (operator === 'divide') return firstNum / secondNum
  if (operator === 'potencia') return pot = Math.pow(firstNum, secondNum);
}

// função para porcentagem
const percente = (n1, operator, n2) => {
  const primValor = parseFloat(n1)
  const segValor = parseFloat(n2)
  if (operator === 'add') return (primValor * segValor) / 100 + primValor
  if (operator === 'subtract') return primValor - (primValor * segValor / 100)
  if (operator === 'multiply') return (primValor * segValor / 100)
  if (operator === 'divide') return primValor / (segValor / 100)
  if (n1 <= 0) return 0
}

// função para calcular raiz quadrada
const raiz = (n1) => {
  const primValor = parseFloat(n1)
  var rq = ''
  if (n1 > 0) {
    rq = Math.sqrt(primValor)
    return rq
  } else if (n1 <= 0)
    return 0

}


const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator--keys')
const display = document.querySelector('.calculator--display')


keys.addEventListener('click', e => {
  if (e.target.matches('button')) {


    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent
    const previousKeyType = calculator.dataset.previousKeyType

    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed')) // Desmarcar a pressão no operador assim que o segundo numero for digitado

    if (!action) {
      console.log('chave numerica')
    }



    if (!action) {
      if (displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate' ||
        previousKeyType === 'percente'

      ) {
        display.textContent = keyContent
      } else {
        display.textContent = displayedNum + keyContent
      }
      calculator.dataset.previousKeyType = 'number'
    }





    // nesse trecho ele verifica se a tecla anterior é um operador para incluir novos numeros n1 + n2
    // Inclui tambem o decimal '.' // se for oprerador ou '=' ele iclui 0.
    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.'
      } else if (
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        display.textContent = '0.'
      }
      calculator.dataset.previousKeyType = 'decimal'
    }

    // codigo para caso de calcular apertando primeiro numero, operador, numero e operador novamente
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide' ||
      action === 'potencia'
    ) {

      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum

      if (firstValue &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate'
      ) {
        //display.textContent = calculate(firstValue, operator, secondValue) "não usamos mais esta condição depois da atualização de calcular valores usando teclas de operador"
        const calcValue = calculate(firstValue, operator, secondValue) // Passamos a usar esta variavel
        display.textContent = calcValue

        // Atualiza o valor calculado como firstValue
        calculator.dataset.firstValue = calcValue
      } else {
        // Se não houver calculo, define displayedNum como firstValue
        calculator.dataset.firstValue = displayedNum
      }

      key.classList.add('is-depressed') // Marcar a tecla de operador, muda o foco
      calculator.dataset.previousKeyType = 'operator'
      calculator.dataset.operator = action

    }

    if (
      action === 'percente' ||
      action === 'raiz'
    ) {
      key.classList.add('is-depressed')
    }



    // Codigo para limpar o ultimo numero do visor // Ficara AC e para zerar tem que apertar mais uma vez
    if (action !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]')
      clearButton.textContent = 'CE'
    }


    //Codigo para limpar o diplay
    if (action === 'clear') {
      // console.log('clear key')
      if (key.textContent === 'AC') {
        calculator.dataset.firstValue = ''
        calculator.dataset.modValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
      } else {
        key.textContent = 'AC'
      }
      display.textContent = 0
      calculator.dataset.previousKeyType = 'clear'
    }


    // Codigo para chamar a função raiz "quadrada"
    if (action === 'raiz') {
      let firstValue = calculator.dataset.firstValue
      firstValue = displayedNum

      display.textContent = raiz(firstValue)
      calculator.dataset.previousKeyType = 'raiz'
    }




    // Codigo para calcular ao acionar a tecla de porcentagem '%'
    if (action === 'percente') {
      let firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum

      if (firstValue) {

        if (previousKeyType === 'percente') {
          firstValue = displayedNum

        }
        display.textContent = percente(firstValue, operator, secondValue)
      }
      calculator.dataset.modValue = secondValue
      calculator.dataset.previousKeyType = 'percente'
    }



    // Codigo para calcular ao acionar a tecla de igual '='
    if (action === 'calculate') {
      let firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum

      if (firstValue) {

        if (previousKeyType === 'calculate') {
          firstValue = displayedNum

        }
        display.textContent = calculate(firstValue, operator, secondValue)
      }
      calculator.dataset.modValue = secondValue
      calculator.dataset.previousKeyType = 'calculate'
    }

  }

})


