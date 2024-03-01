# Time Control 
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/Alessandro-Rodrigues01/Project_web/blob/main/LICENSE) 

# Sobre o projeto
O projeto foi desenvolvido para rodar em computador local dentro de uma organização, com intuito de controlar o tempo de trabalho dos colaboradores, visando emitir alerta visual assim que o tempo ultrapassar os vinte minutos para o termino do expediente.
Temos opções de turnos:

- ADM
- Noturno
- Escala
- Turnos 1º/2º
  
  Ambos têm suas peculiaridades de horas trabalhadas.
  Se o funcionário for trabalhar em regime de hora extra e quer somente contar hora extra, ele aciona o checkbox da hora extra que 
 ira calcular a hora extra desde o início.
 Se for controlar o tempo corrido durante o expediente, o cálculo acontece quando zerar o time.

## O programa funciona da seguinte forma:
O usuário terá que fornecer as informações referente ao seu expediente de trabalho, preenchendo os campos corretamente como data do dia, hora de entrada, turno, porcentagem (65% ou 100%) e o salário, no campo salário fica oculto por questões de privacidade.
Assim que for pressionado o botão "start time" um poup up é acionado para verificação dos dados, se estiver ok click em OK ou em cancelar para corrigir os campos.
Se esquecer de preencher um campo o programa não executa e emite uma mensagem de campo sem preenchimento, para refazer clicar em Refresh/Limpar. 
Depois que o programa for executado todos os campos e o botão "Start time" fica inibido, não é possível fazer alteração nos dados em estado de execução, exceto os botões checkbox "Hora extra" e "Refresh Limpar".
No rodapé da aplicação temos a informação da data/hora atual em formato "week, day, month, year".


## Layout web
![Web 1](https://github.com/Alessandro-Rodrigues01/Project_web/blob/main/Time_control-V2.2/assets/Tela-inicial.png)

## Projeto em execução
![Web 1](https://github.com/Alessandro-Rodrigues01/Project_web/blob/main/Time_control-V2.2/assets/projeto-em-execucao.png)

## Informações do botão checkbox
![Web 1](https://github.com/Alessandro-Rodrigues01/Project_web/blob/main/Time_control-V2.2/assets/projeto-em-execucao-2.png)

## Checkbox acionado
![Web 1](https://github.com/Alessandro-Rodrigues01/Project_web/blob/main/Time_control-V2.2/assets/checkBoxAcionado.png)

## Tempo esgotando
![Web 1](https://github.com/Alessandro-Rodrigues01/Project_web/blob/main/Time_control-V2.2/assets/Tempo-esgotando.png)

## Tempo esgotado
![Web 1](https://github.com/Alessandro-Rodrigues01/Project_web/blob/main/Time_control-V2.2/assets/tempo-esgotado.png)


# Tecnologias utilizadas
## Back end
- JavaScript
  
## Front end
- HTML / CSS


# Como executar o projeto

## Back end
Pré-requisitos: Navegadores atualizados, Firefox, Google Chrome, Microsoft Edge, opera e safari

```bash
# clonar repositório
git clone https://github.com/Alessandro-Rodrigues01/Project_web/tree/main/Time_control-V2.2

# entrar na pasta do projeto Time_control-V2.2
cd Time_control-V2.2

# executar o projeto
executando o arquivo .html
```

# Autor
Alessandro Rodrigues

https://www.linkedin.com/in/alessandro-rodrigues-a73b50246/
