class KeyStoneCorners extends HTMLElement {
  connectedCallback(){
    setTimeout(() =>{
    this.upper_left_corner = document.createElement('keystone-corner')
    this.upper_right_corner = document.createElement('keystone-corner')
    this.lower_left_corner = document.createElement('keystone-corner')
    this.lower_right_corner = document.createElement('keystone-corner')

    this.upper_left_corner.style.left = this.offsetLeft +'px'
    this.upper_left_corner.style.top = this.offsetTop + 'px'
    this.upper_right_corner.style.left = this.offsetLeft + this.offsetWidth + 'px'
    this.upper_right_corner.style.top = this.offsetTop + 'px'
    this.lower_left_corner.style.left = this.offsetLeft + 'px'
    this.lower_left_corner.style.top = this.offsetTop + this.offsetHeight  + 'px'
    this.lower_right_corner.style.left = this.offsetLeft + this.offsetWidth + 'px'
    this.lower_right_corner.style.top = this.offsetTop + this.offsetHeight + 'px'

    document.body.appendChild(this.upper_left_corner)
    document.body.appendChild(this.upper_right_corner)
    document.body.appendChild(this.lower_left_corner)
    document.body.appendChild(this.lower_right_corner)

    this.style.width = 'fit-content'
    this.style.height = 'fit-content'

    this.original_position = [
      this.upper_left_corner.style.left,
      this.upper_left_corner.style.top
    ,[
      this.upper_right_corner.style.left,
      this.upper_right_corner.style.top 

    ],[
      this.lower_left_corner.style.left,
      this.lower_left_corner.style.top
    ],[
      this.lower_right_corner.style.left,
      this.lower_right_corner.style.top
    ]]
    this.target_position = [...this.original_position]

    this.upper_left_corner.addEventListener('init-corner', (e) => {
      this.original_position[0] = e.detail
      this.target_position[0] = e.detail
    })

    this.lower_left_corner.addEventListener('init-corner', (e) => {
      this.original_position[1] = e.detail
      this.target_position[1] = e.detail

    })

    this.upper_right_corner.addEventListener('init-corner', (e) => {
      this.original_position[2] = e.detail
      this.target_position[2] = e.detail

    })
    this.lower_right_corner.addEventListener('init-corner', (e) => {
      this.original_position[3] = e.detail
      this.target_position[3] = e.detail

    })

    this.upper_left_corner.addEventListener('set-corner', (e) => {
      this.target_position[0] = e.detail
      this.setMatrix()
    })

    this.lower_left_corner.addEventListener('set-corner', (e) => {
      this.target_position[1] = e.detail
      this.setMatrix()
    })

    this.upper_right_corner.addEventListener('set-corner', (e) => {
      this.target_position[2] = e.detail
      this.setMatrix()
    })
    this.lower_right_corner.addEventListener('set-corner', (e) => {
      this.target_position[3] = e.detail
      this.setMatrix()
    })

    },100)
  }

  updateCorners(){
    this.upper_left_corner.style.left = this.offsetLeft +'px'
    this.upper_left_corner.style.top = this.offsetTop + 'px'
    this.upper_right_corner.style.left = this.offsetLeft + this.offsetWidth + 'px'
    this.upper_right_corner.style.top = this.offsetTop + 'px'
    this.lower_left_corner.style.left = this.offsetLeft + 'px'
    this.lower_left_corner.style.top = this.offsetTop + this.offsetHeight  + 'px'
    this.lower_right_corner.style.left = this.offsetLeft + this.offsetWidth + 'px'
    this.lower_right_corner.style.top = this.offsetTop + this.offsetHeight + 'px'
    this.setMatrix()
  }

  setMatrix(){


    const from = () => {
      let k, len, results, p;
      results = [];
      for (k = 0, len = this.original_position.length; k < len; k++) {
        p = this.original_position[k];
        results.push({
          x: p[0] - this.original_position[0][0],
          y: p[1] - this.original_position[0][1]
        });
      }
      return results;
    }

    const to = () => {
      var k, len, results, p;
      results = [];
      for (k = 0, len = this.target_position.length; k < len; k++) {
        p = this.target_position[k];
        results.push({
          x: p[0] - this.original_position[0][0],
          y: p[1] - this.original_position[0][1]
        });
      }
      return results;

    }


    const H = getTransform(from(), to())


    this.style.transformOrigin = '0 0'
    this.style.transform = "matrix3d(" + (((function() {
        var _i, _results;
        _results = [];
        for (let i = _i = 0; _i < 4; i = ++_i) {
          _results.push((function() {
            var _j, _results1;
            _results1 = [];
            for (let j = _j = 0; _j < 4; j = ++_j) {
              _results1.push(H[j][i].toFixed(20));
            }
            return _results1;
          })());
        }
        return _results;
      })()).join(',')) + ")"

  }

}

customElements.define('keystone-corners', KeyStoneCorners)




class KeystoneCorner extends HTMLElement {
  connectedCallback(){

    this.innerHTML = '+'
    setTimeout(() => {
      const init_event = new CustomEvent('init-corner', {detail: [this.offsetLeft, this.offsetTop]})
      this.dispatchEvent(init_event)
    }, 1000)

    this.setAttribute('draggable', true)
    this.addEventListener('dragend', (e) => {
      this.style.left = e.clientX + 'px'
      this.style.top = e.clientY + 'px'
      const end_drag_event = new CustomEvent('set-corner', {detail: [e.clientX, e.clientY]})
      this.dispatchEvent(end_drag_event)
    })
  }

}

customElements.define('keystone-corner', KeystoneCorner)





function getTransform(from, to){
  var A, H, b, h, i, k, k_i, l, lhs, m, ref, rhs;
  A = []; // 8x8
  for (i = k = 0; k < 4; i = ++k) {
    A.push([
      from[i].x, from[i].y, 1, 0, 0, 0, -from[i].x * to[i].x, -from[i].y * to[i].x]);
    A.push([0, 0, 0, from[i].x, from[i].y, 1, -from[i].x * to[i].y, -from[i].y * to[i].y]);
  }
  b = []; // 8x1
  for (i = l = 0; l < 4; i = ++l) {
    b.push(to[i].x);
    b.push(to[i].y);
  }
  // Solve A * h = b for h
  h = numeric.solve(A, b);
  H = [[h[0], h[1], 0, h[2]], [h[3], h[4], 0, h[5]], [0, 0, 1, 0], [h[6], h[7], 0, 1]];

  return H;

}