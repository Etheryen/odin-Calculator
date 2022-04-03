let display = document.querySelector('#display');
let zero = document.querySelector('#zero');
let one = document.querySelector('#one');
let two = document.querySelector('#two');
let three = document.querySelector('#three');
let four = document.querySelector('#four');
let five = document.querySelector('#five');
let six = document.querySelector('#six');
let seven = document.querySelector('#seven');
let eight = document.querySelector('#eight');
let nine = document.querySelector('#nine');
let plus = document.querySelector('#plus');
let minus = document.querySelector('#minus');
let division = document.querySelector('#division');
let multiplication = document.querySelector('#multiplication');
let equals = document.querySelector('#equals');
let point = document.querySelector('#point');
let clear = document.querySelector('#clear');
let backspace = document.querySelector('#backspace');

let numbers = [zero, one, two, three, four, five, six, seven, eight, nine]
let operators = ['+', '−', '×', '÷']
let screen = '0'
display.innerHTML = screen

const add = (a, b) => {
  return a + b
}

const subtract = (a, b) => {
  return a - b
}

const multiply = (a, b) => {
  return a * b
}

const divide = (a, b) => {
  if(b != 0) return a / b
  return 'Zero division error'
}

const operate = (operator, a, b) => {
  switch (operator) {
    case '+':
      return add(a, b)
    case '-':
      return subtract(a, b)
    case '*':
      return multiply(a, b)
    case '/':
      return divide(a, b)
    default:
      return 'Wrong operator error'
  }
}

for(let i = 0; i < 10; i++) {
  numbers[i].onclick = () => {
    if(screen.slice(-5, -4) == '.') return
    if(screen == '0') screen = ''
    screen += i.toString()
    display.innerHTML = screen
  }
}

point.onclick = () => {
  if(screen.slice(-1) == ' ') screen += '0'
  for(let i = -5; i < -1; i++) {
    if(screen.slice(i, i+1) == '.') return
  }
  if(screen.slice(-1) == '.') return
  screen += '.'
  display.innerHTML = screen
}

backspace.onclick = () => {
  if(screen.length == '1') {
    screen = '0'
    display.innerHTML = screen
    return
  }
  screen = screen.slice(0, -1)
  if(operators.includes(screen.slice(-1))) {
    screen = screen.slice(0, -2)
  }
  display.innerHTML = screen
}

clear.onclick = () => {
  screen = '0'
  display.innerHTML = screen
}

plus.onclick = () => {
  if(operators.includes(screen.slice(-2, -1))) return
  screen += ' + '
  display.innerHTML = screen
}

minus.onclick = () => {
  if(operators.includes(screen.slice(-2, -1))) return
  screen += ' − '
  display.innerHTML = screen
}

multiplication.onclick = () => {
  if(operators.includes(screen.slice(-2, -1))) return
  screen += ' × '
  display.innerHTML = screen
}

division.onclick = () => {
  if(operators.includes(screen.slice(-2, -1))) return
  screen += ' ÷ '
  display.innerHTML = screen
}

equals.onclick = () => {
  screen = screen.split(' ')
  if(screen.slice(-1) == '') {
    screen.pop()
    screen.pop()
  }
  for(let i = 0; i < screen.length; i++) {
    if(screen[i] == '−') screen[i] = '-'
    if(screen[i] == '×') screen[i] = '*'
    if(screen[i] == '÷') screen[i] = '/'
  }
  while(screen.length != 1) {
    console.log(screen)
    for(let i = 0; i < screen.length; i++) {
      if(screen[i] == '*') {
        screen[i] = multiply(parseFloat(screen[i-1]), parseFloat(screen[i+1]))
        screen[i] = Math.round(screen[1] * 10000) / 10000
        screen.splice(i-1, 1)
        screen.splice(i, 1)
        i--
      }
      else if(screen[i] == '/') {
        screen[i] = divide(parseFloat(screen[i-1]), parseFloat(screen[i+1]))
        if(screen[i] != 'Zero division error') screen[i] = Math.round(screen[1] * 10000) / 10000
        screen.splice(i-1, 1)
        screen.splice(i, 1)
        i--
      }
    }
    for(let i = 0; i < screen.length; i++) {
      if(screen[i] == '+') {
        screen[i] = add(parseFloat(screen[i-1]), parseFloat(screen[i+1]))
        screen[i] = Math.round(screen[1] * 10000) / 10000
        screen.splice(i-1, 1)
        screen.splice(i, 1)
        i--
      }
      else if(screen[i] == '-') {
        screen[i] = subtract(parseFloat(screen[i-1]), parseFloat(screen[i+1]))
        screen[i] = Math.round(screen[1] * 10000) / 10000
        screen.splice(i-1, 1)
        screen.splice(i, 1)
        i--
      }
    }
  }
  screen = screen.join()
  console.log(`${screen} ${typeof(screen)}`)
  display.innerHTML = screen
  if(screen == 'Zero division error') screen = '0'
}