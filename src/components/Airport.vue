<template>
  <section class="section">
    <div class="columns">
      <div class="column"></div>
      <div class="column is-8">
        <div class="box">

          <table class="table is-striped is-fullwidth">
            <thead>
              <th><abbr title="nombre">Nombre</abbr></th>
              <th><abbr title="pais">Pais</abbr></th>
              <th><abbr title="localidad">Localidad</abbr></th>
            </thead>
            <tbody>
              <tr v-for="a in airports" :key="a.id">
                <td>{{a.nombre}}</td>
                <td>{{a.pais | getName}}</td>
                <td>{{a.localidad}}</td>
              </tr>
            </tbody>
          </table>
          <!-- FORM -->
          <div class="columns is-gapless">
            <div class="column is-4">
              <div class="field">
                <div class="control">
                  <input class="input" 
                  :class="{'is-success': (airport.nombre.length>3), 'is-danger':airport.nombre.length<=3}" 
                  type="text" placeholder="Nombre" v-model="airport.nombre">
                </div>
              </div>
            </div>
            <div class="column is-3">
              <div class="field">
                <div class="control">
                  <div class="select" 
                  :class="{'is-success': (airport.pais.numericCode != null), 'is-danger':airport.pais.numericCode == null}"  >
                    <select v-model="airport.pais">
                      <option v-for="c in countries" :key="c.numericCode" :value="c">{{c.name}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-4">
              <div class="field">
                <div class="control">
                  <input class="input"
                  :class="{'is-success': (airport.localidad.length>5), 'is-danger':airport.localidad.length<=5}" 
                  type="text" placeholder="Localidad" v-model="airport.localidad">
                </div>
              </div>
            </div>
            <div class="column is-1">
              <button class="button is-primary" @click="setForm"><font-awesome-icon icon="plus"/></button>
            </div>
          </div>

        </div>
      </div>
      <div class="column"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Airport',
  data(){
    return{
      airport:{
        id:null,
        nombre:'',
        pais:{},
        localidad:''
      },
      countries:[],
      airports:[]
    }
  },
  filters:{
    getName: function (value) {
      
      return value?value.name:value
    }
  },
  methods:{
    setForm(){

      if(this.airport.nombre.length>3 
          && this.airport.localidad.length>5
          && this.airport.pais.numericCode != null){
            
          this.axios.post('/airport',this.airport)
          .then(resposne=>{
            this.resetForm()

            this.airports.push(resposne.data.record)
          })
          .catch(error=>{
            console.log(error.resposne)
          })
      }

    },
    resetForm(){
      
      this.airport={
        id:null,
        nombre:'',
        pais:{},
        localidad:''
      }
    }
  },
  mounted(){
    this.axios.get("https://restcountries.eu/rest/v2/all")
    .then(response=>{
      this.countries=response.data
    })
    .catch(error=>{
      console.log(error.response)
    })

    this.axios.get("/airport")
    .then(response=>{
      this.airports=response.data.data
    })
    .catch(error=>{
      console.log(error.response)
    })
  }
}
</script>
