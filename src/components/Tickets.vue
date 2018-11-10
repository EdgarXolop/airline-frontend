<template>
    <div>
        <table class="table is-striped is-fullwidth">
            <thead>
                <th><abbr title="dni">DNI</abbr></th>
                <th><abbr title="nombre">Nombre</abbr></th>
                <th><abbr title="apellidos">Apellidos</abbr></th>
                <th><abbr title="fecha_salida">Fecha salida</abbr></th>
                <th><abbr title="hora_salida">Hora salida</abbr></th>
                <th><abbr title="fecha_llegada">Fecha llegada</abbr></th>
                <th><abbr title="hora_llegada">Hora llegada</abbr></th>
                <th><abbr title="aeropuerto_origen">Salida</abbr></th>
                <th><abbr title="aeropuerto_destino">Destino</abbr></th>
                <th><abbr title="plazas">Plazas</abbr></th>
                <th></th>
            </thead>
            <tbody>
                <tr v-for="t in tickets" :key="t.id">
                    <td>{{t.customer.dni}}</td>
                    <td>{{t.customer.nombre}}</td>
                    <td>{{t.customer.apellidos}}</td>
                    <td>{{t.flight.fecha_salida}}</td>
                    <td>{{t.flight.hora_salida}}</td>
                    <td>{{t.flight.fecha_llegada}}</td>
                    <td>{{t.flight.hora_llegada}}</td>
                    <td>{{t.flight.aeropuerto_origen.nombre}} - {{t.flight.aeropuerto_origen.pais|getName}}</td>
                    <td>{{t.flight.aeropuerto_destino.nombre}} - {{t.flight.aeropuerto_destino.pais|getName}}</td>
                    <td>{{t.plazas}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            tickets: []
        }
    },
    filters:{
        getName: function (value) {
            
            return value?value.name:value
        }
    },
    mounted(){
        this.axios.get("/customer/buy")
        .then(response=>{
            this.tickets = response.data.data
        })
    }
}
</script>
