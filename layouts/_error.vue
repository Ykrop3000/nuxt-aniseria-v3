<template>
  <div class="notfound">
    <div id="parallax" class="text" :style="{'background-image': `url(${images[i]})`}">
      <span>404</span>
      <span>
        The page have isekaied
      </span>
    </div>
  </div>
</template>
<script>
function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export default {
  data () {
    return {
      images: [
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/31ccb3d5-2c06-4c5e-9ae0-12c53746ddf5/dea71g2-a87d45af-d86e-4a94-b45a-5b8743aee9f9.png/v1/fill/w_900,h_1229,strp/commisison___the_mute_cynic_by_sa_dui_dea71g2-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMjI5IiwicGF0aCI6IlwvZlwvMzFjY2IzZDUtMmMwNi00YzVlLTlhZTAtMTJjNTM3NDZkZGY1XC9kZWE3MWcyLWE4N2Q0NWFmLWQ4NmUtNGE5NC1iNDVhLTViODc0M2FlZTlmOS5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.i9gJf0i01bAumGabIN52-BndhjaGgYcguJ1YjdH0dnk',
        'https://cs4.pikabu.ru/post_img/big/2016/05/24/10/1464106020145127105.png',
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/08069cc4-6595-4406-b587-20f2e2027964/ddjkwvv-796def73-461a-4aab-9c12-76942f1ea964.png/v1/fill/w_1120,h_713,strp/__video__commission___dancing_swords_by_hyanna_natsu_ddjkwvv-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMDgwIiwicGF0aCI6IlwvZlwvMDgwNjljYzQtNjU5NS00NDA2LWI1ODctMjBmMmUyMDI3OTY0XC9kZGprd3Z2LTc5NmRlZjczLTQ2MWEtNGFhYi05YzEyLTc2OTQyZjFlYTk2NC5wbmciLCJ3aWR0aCI6Ijw9MTY5NiJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.RMti5h62hx3xr77RJM2mldT3Ja6rTJq7ldVESyEhdfI',
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aca03e17-c955-49db-bca7-3854c0203d94/dds7c0q-eafcf254-b5b0-43ff-beea-e52603cbc399.png/v1/fill/w_1280,h_1097,q_80,strp/_ce__nerine_by_yukirunran_dds7c0q-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMDk3IiwicGF0aCI6IlwvZlwvYWNhMDNlMTctYzk1NS00OWRiLWJjYTctMzg1NGMwMjAzZDk0XC9kZHM3YzBxLWVhZmNmMjU0LWI1YjAtNDNmZi1iZWVhLWU1MjYwM2NiYzM5OS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.7244zkpT2FPCxmqtqahAXh0N8OKQKb6ER5ieT-FoDxQ'
      ],
      i: getRandomInt(4)
    }
  },
  mounted () {
    // Add event listener
    document.addEventListener('mousemove', this.parallax)
  },
  methods: {

    parallax (e) {
      const elem = document.querySelector('#parallax')
      const _w = window.innerWidth / 2
      const _h = window.innerHeight / 2
      const _mouseX = e.clientX
      const _mouseY = e.clientY
      const _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`
      // let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
      // let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
      // let x = `${_depth3}, ${_depth2}, ${_depth1}`;
      const x = `${_depth1}`
      elem.style.backgroundPosition = x
      // elem.style.textShadow  = `rotateX(${ay}deg) rotateY(${ax}deg)`;
      // elem.style.textShadow  = `${ax}px ${ay}px 40px #000`;
    }
  }
}
</script>
<style scoped>
    .text{
        position: relative;

        background-position: center;
        background-clip: text;
        background-repeat: no-repeat;
        -webkit-background-clip: text;
        color: transparent;
        display: flex;
        flex-direction: column;
    }
    .notfound{
        margin: 0;
        padding: 0;
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'Oswald', sans-serif;
        text-align: center;
        font-weight: 900;
        line-height: auto;

    }
    span{
        font-size: 3rem;
    }
    span:first-child{
        font-size: 20rem;
        line-height: 20rem;
    }
    @media (max-width: 760px){
        span{
            font-size: 5vw;
        }
        span:first-child{
            font-size: 30vw;
            line-height: 30vw;
        }
    }
</style>
