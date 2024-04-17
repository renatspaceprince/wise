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
    static get observedAttributes() {
      return ['name', 'price', 'image']
    }
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
    }
    connectedCallback() {
      this.render()
    }

    render() {
      this.shadowRoot.innerHTML = `
      <style>
      :host{
        display: flex;
        flex-direction: column;
    
        @media (max-width: 767px) {
          padding: 0;
          // height: 250px;
        }  
      }

      .shop__gallery-card-img {
        width: 259px;
        height: 343px;
        object-fit: cover;
    
        @media (max-width: 767px) {
          height: 100%;
          width: 100%;
        }
      }

      .shop__gallery-card-name {
        color: black;
        
        @media (max-width: 767px) {
          font-size: 10px;
          max-width: 100%;
        }
      }

      .shop__gallery-card-price {
        color: black;
        @media (max-width: 767px) {
          font-size: 12px;
        }
      }
    }
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
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue != newValue) {
        this.render
      }
    }
  }
)
