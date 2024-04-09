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

const cards = document.querySelectorAll('.home__card')
const cardImgs = document.querySelectorAll('.home__card-img')

cards.forEach(function (card, index) {
  card.addEventListener('mouseover', function () {
    cardImgs[index].style.filter = 'none'
  })

  card.addEventListener('mouseout', function () {
    cardImgs[index].style.filter = 'grayscale(100%)'
  })
})
