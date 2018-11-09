<template>
    <div>
        <table class="table is-striped is-fullwidth">
            <thead>
                <th><abbr title="fecha_salida">Fecha salida</abbr></th>
                <th><abbr title="hora_salida">Hora salida</abbr></th>
                <th><abbr title="fecha_llegada">Fecha llegada</abbr></th>
                <th><abbr title="hora_llegada">Hora llegada</abbr></th>
                <th><abbr title="aeropuerto_origen">Salida</abbr></th>
                <th><abbr title="aeropuerto_destino">Destino</abbr></th>
                <th><abbr title="avion">Avion</abbr></th>
                <th></th>
            </thead>
            <tbody>
                <tr v-for="f in flights" :key="f.id">
                    <td>{{f.fecha_salida}}</td>
                    <td>{{f.hora_salida}}</td>
                    <td>{{f.fecha_llegada}}</td>
                    <td>{{f.hora_llegada}}</td>
                    <td>{{f.aeropuerto_origen.nombre}} - {{f.aeropuerto_origen.pais|getName}}</td>
                    <td>{{f.aeropuerto_destino.nombre}} - {{f.aeropuerto_destino.pais|getName}}</td>
                    <td>{{f.avion.nombre}} - {{f.avion.plazas}}</td>
                </tr>
            </tbody>
        </table>
    <!-- FORM -->
        <div class="columns is-gapless" >
            <div class="column is-2">
                <div class="field has-addons" >
                    <div class="control">
                        <button class="button is-info" ref='fecha_salida' type='button'><font-awesome-icon icon="calendar"/></button>
                    </div>
                    <div class="control is-expanded">
                        <label class="input">{{flight.fecha_salida}}</label>
                    </div>
                </div>
            </div>
            <div class="column is-1">
                <div class="field">
                    <div class="control">
                        <vue-timepicker v-if="!loading" format="HH:mm" v-model="hora_salida" :minute-interval="30" @change="setHoraSalida" hide-clear-button ></vue-timepicker>
                    </div>
                </div>
            </div>
            <div class="column is-2">
                <div class="field has-addons">
                    <div class="control">
                        <button class="button is-info" ref='fecha_llegada' type='button'><font-awesome-icon icon="calendar"/></button>
                    </div>
                    <div class="control is-expanded">
                        <label class="input">{{flight.fecha_llegada}}</label>
                    </div>
                </div>
            </div>
            <div class="column is-1">
                <div class="field">
                    <div class="control">
                        <vue-timepicker v-if="!loading" format="HH:mm" v-model="hora_llegada"  :minute-interval="30" @change="setHoraLlegada" hide-clear-button ></vue-timepicker>
                    </div>
                </div>
            </div>
            <div class="column is-2">
                <div class="field">
                    <div class="control">
                        <div class="select is-fullwidth" 
                        :class="{'is-success': flight.aeropuerto_origen.id != null, 'is-danger': flight.aeropuerto_origen.id == null}"  >
                            <select v-model="flight.aeropuerto_origen">
                                <option v-for="ao in airports_out" :key="ao.id" :value="ao">{{ao.nombre}} - {{ao.pais|getName}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-2">
                <div class="field">
                    <div class="control"> 
                        <div class="select is-fullwidth" 
                        :class="{'is-success': flight.aeropuerto_destino.id != null, 'is-danger': flight.aeropuerto_destino.id == null}"  >
                            <select v-model="flight.aeropuerto_destino">
                                <option v-for="ai in airports_in" :key="ai.id" :value="ai">{{ai.nombre}} - {{ai.pais|getName}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-2">
                <div class="field">
                    <div class="control">
                        <div class="select is-fullwidth" 
                        :class="{'is-success': flight.avion.id != null, 'is-danger': flight.avion.id == null}"  >
                            <select v-model="flight.avion">
                                <option v-for="a in airplanes" :key="a.id" :value="a">{{a.nombre}} - {{a.plazas}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-1">
                <button class="button is-primary" @click="setForm"><font-awesome-icon icon="plus"/></button>
            </div>
        </div>
    </div>
</template>
<script>

import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';

export default {
    name: 'Flight',
    data(){
        return{
            flight:{
                fecha_salida:null,
                fecha_llegada:null,
                hora_salida:null,
                hora_llegada:null,
                aeropuerto_origen:{},
                aeropuerto_destino:{},
                avion:{}
            },
            flights:[],
            airports_in:[],
            airports_out:[],
            airplanes:[],
            hora_salida:null,
            hora_llegada:null,
            loading:false
        }
    },
    filters:{
        getName: function (value) {
            
            return value?value.name:value
        }
    },
    methods:{
        setForm(){
            if(
                this.flight.fecha_salida != null &&
                this.flight.fecha_llegada != null &&
                this.flight.hora_salida != null &&
                this.flight.hora_llegada != null &&
                this.flight.aeropuerto_origen.id != null &&
                this.flight.aeropuerto_destino.id != null &&
                this.flight.avion.id != null 
            ){
                this.loading = true
                this.axios.post("/flight",this.flight)
                .then(response=>{
                    this.loading=false
                    this.flights.push(response.data.record)
                    this.flight={
                        fecha_salida:null,
                        fecha_llegada:null,
                        hora_salida:null,
                        hora_llegada:null,
                        aeropuerto_origen:{},
                        aeropuerto_destino:{},
                        avion:{}
                    }
                    
                    this.hora_salida=null
                    this.hora_llegada=null
                })
                .catch(error=>{
                    this.loading=false
                    console.log(error.response)
                })

            }
        },
        formatDate(date){
            if(date)
                return date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()
            
            return ''
        },
        setHoraSalida($event){
            console.log($event)
            this.flight.hora_salida = `${$event.data.HH}:${$event.data.mm}`
        },
        setHoraLlegada($event){
            console.log($event)
            this.flight.hora_llegada = `${$event.data.HH}:${$event.data.mm}`
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

        this.axios.get("/airport")
        .then(response=>{
            this.airports_in=this.airports_out=response.data.data
        })
        .catch(error=>{
            console.log(error.response)
        })
        
        
        this.axios.get("/flight")
        .then(response=>{
            this.flights=response.data.data
        })
        .catch(error=>{
            console.log(error.response)
        })

        const today = new Date();
        const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDay());
        
        const calendar_salida = bulmaCalendar.attach(this.$refs.fecha_salida, {
            lang: 'en',
            displayMode: 'dialog',
            showFooter: false,
            showHeader: false,
            startDate: today,
            maxDate: today.toString(),
            minDate: minDate.toString()
        })[0]        
        calendar_salida.on('date:selected', e => (this.flight.fecha_salida = this.formatDate(e.start) || null))
        
        const calendar_llegada = bulmaCalendar.attach(this.$refs.fecha_llegada, {
            lang: 'en',
            displayMode: 'dialog',
            showFooter: false,
            showHeader: false,
            startDate: today,
            maxDate: today.toString(),
            minDate: minDate.toString()
        })[0]        
        calendar_llegada.on('date:selected', e => (this.flight.fecha_llegada = this.formatDate(e.start) || null))

    }
}
</script>
