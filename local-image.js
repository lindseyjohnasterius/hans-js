



class LocalImage extends HTMLElement {
  connectedCallback(){
    this.image = this.getAttribute('src')
    if(this.image === null){
      const upload_image = document.createElement('input')
      upload_image.setAttribute('type', 'file')
      upload_image.setAttribute('accept', 'image/png, image/jpeg')
      upload_image.addEventListener('change', (e) => {
        this.handleNewFile(upload_image)
      }) 

      this.appendChild(upload_image)

    } 
  }

  handleNewFile(image){

    const file = image.files[0]
    const reader = new FileReader(file)
    reader.readAsDataURL(file)

    reader.addEventListener('load', () => {
      const image = document.createElement('img')
      image.setAttribute('width', window.innerWidth * .9)
      image.setAttribute('height', window.innerHeight * .9)
      image.src = reader.result
      this.querySelector('input').remove()
      this.appendChild(image)
      document.querySelector('keystone-corners').updateCorners()
    })

  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      default:
    }
  }

}

customElements.define('local-image', LocalImage)


