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

const cards = document.querySelectorAll('.bw-a')
const cardImgs = document.querySelectorAll('.bw-img')

cards.forEach(function (card, index) {
  card.addEventListener('mouseover', function () {
    cardImgs[index].style.filter = 'none'
  })

  card.addEventListener('mouseout', function () {
    cardImgs[index].style.filter = 'grayscale(100%)'
  })
})
