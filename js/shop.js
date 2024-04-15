function startup() {
  const modalContainer = document.querySelector('.modal')

  const showProductModal = (productCode, shouldUpdateUrl = true) => {
    if (shouldUpdateUrl) {
      const url = new URL(window.location.href)
      const queryParams = new URLSearchParams(url.search)

      queryParams.set('product', productCode)
      url.search = queryParams.toString()

      window.history.pushState({}, '', url)
    }

    modalContainer.style.display = 'block'
  }

  const initModal = (event) => {
    console.log(event)
    const urlParams = new URLSearchParams(window.location.search)
    const productCode = urlParams.get('product')

    if (!productCode) {
      modalContainer.style.display = 'none'
      return
    }

    showProductModal(productCode, false)
  }

  const addListenersToProductItems = () => {
    const productItems = document.querySelectorAll('.shop__gallery-card')

    for (const productElement of productItems) {
      productElement.addEventListener('click', () => {
        showProductModal(productElement.dataset.code)
      })
    }
  }

  window.addEventListener('popstate', initModal)
  addListenersToProductItems()
  initModal()
}

document.addEventListener('DOMContentLoaded', startup)
