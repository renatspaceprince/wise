const logo = document.getElementById('logo')
const logoRed = document.getElementById('logo-red')

logo.addEventListener('mouseover', function () {
  if ('mouseout') {
    logo.style.display = 'none'
    logoRed.style.display = 'block'
  }
})

logoRed.addEventListener('mouseout', function () {
  logo.style.display = 'block'
  logoRed.style.display = 'none'
})


class WordCount extends HTMLElement {
  constructor() {
    // Всегда первым делом вызывайте super() в конструкторе
    super();

    // Далее пишется функциональность элемента

    ...
  }
}
