<template>
  <section class="section">
    <div class="columns">
      <div class="column"></div>
      <div class="column is-8">
        <div class="box">

          <table class="table is-striped is-fullwidth">
            <thead>
              <th><abbr title="nombre">Nombre</abbr></th>
              <th><abbr title="plazas">Plazas</abbr></th>
            </thead>
            <tbody>
              <tr v-for="a in airplanes" :key="a.id">
                <td>{{a.nombre}}</td>
                <td>{{a.plazas}}</td>
              </tr>
            </tbody>
          </table>
          
          <!-- FORM -->
          <div class="columns">
            <div class="column is-6">
              <div class="field">
                <div class="control">
                  <input class="input" 
                  :class="{'is-success': (airplane.nombre.length>3), 'is-danger':airplane.nombre.length<=3}" 
                  type="text" placeholder="Nombre" v-model="airplane.nombre">
                </div>
              </div>
            </div>
            <div class="column is-4">
              <div class="field">
                <div class="control">
                  <input class="input"
                  :class="{'is-success': (airplane.plazas>15 && airplane.plazas <= 50), 'is-danger':(airplane.plazas <=15 || airplane.plazas > 50 )}" 
                  type="number" placeholder="Plazas" v-model="airplane.plazas">
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
  name: 'Airplane',
  data(){
    return{
      airplane:{
        id:null,
        nombre:'',
        plazas:0
      },
      airplanes:[]
    }
  },
  methods:{
    setForm(){

      if(this.airplane.nombre.length>3 
          && this.airplane.plazas>15){
            
          this.axios.post('/airplane',this.airplane)
          .then(resposne=>{
            this.resetForm()

            this.airplanes.push(resposne.data.record)
          })
          .catch(error=>{
            console.log(error.resposne)
          })
      }

    },
    resetForm(){
      
      this.airplane={
        id:null,
        nombre:'',
        plazas:0
      }
    }
  },
  mounted(){

    this.axios.get("/airplane")
    .then(response=>{
      this.airplanes=response.data.data
    })
    .catch(error=>{
      console.log(error.response)
    })
  }
}
</script>
