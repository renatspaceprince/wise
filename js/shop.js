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
    const productItems = document.querySelectorAll('shop-card')

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

customElements.define(
  'shop-card',
  class extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
      this.render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue != newValue) {
        this.render
      }
    }

    static get observedAttributes() {
      return ['name', 'price', 'image']
    }

    render() {
      this.shadowRoot.innerHTML = `
      <style>
        @import url('./css/shop-card.css');
      </style>
      <img
        src="${this.getAttribute('image') || ''}"
        alt=""
        class="shop__gallery-card-img"
      />
      <span class="shop__gallery-card-name">
        ${this.getAttribute('name') || ''}
      </span>
      <span class="shop__gallery-card-price">
        ${this.getAttribute('price') || ''}
      </span>
    `
    }
  }
)
