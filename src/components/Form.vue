<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Modal title</p>
            <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
            <div class="field">
                <label class="label">DNI</label>
                <div class="control">
                    <input class="input" type="text" placeholder="DNI" v-model="user.dni" @keyup="onChangeDni">
                </div>
            </div>
            <div class="field">
                <label class="label">Nombre</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Nombre" v-model="user.nombre">
                </div>
            </div>
            <div class="field">
                <label class="label">Apellidos</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Apellidos" v-model="user.apellidos">
                </div>
            </div>
            <div class="field">
                <label class="label">Direccion</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Direccion" v-model="user.direccion">
                </div>
            </div>
            <div class="field">
                <label class="label">Telefono</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Telefono" v-model="user.telefono">
                </div>
            </div>
            <div class="field">
                <label class="label">Tarjeta de credito</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Tarjeta de credito" v-model="user.tarjeta_credito">
                </div>
            </div>
            <div class="field">
                <label class="label">plazas </label>
                <div class="control">
                    <input class="input" type="number" placeholder="Tarjeta de credito" v-model="buy.plazas">
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success" @click="setForm">Comprar</button>
            <button class="button" @click="closeModal">Cancel</button>
            <p class="help is-danger" v-show="error!=null">{{error}}</p>
        </footer>
    </div>
</template>
<script>

let date = null

export default {
    data(){
        return{
            buy:{
                plazas:null
            },
            user:{
                dni:null,
                nombre:null,
                apellidos:null,
                direccion:null,
                telefono:null,
                tarjeta_credito:null,
            },
            error:null
        }
    },
    props:{
        flight:{
            type: Object,
            default: ()=>({})
        }, 
        cancel:{
            type: Function,
            default: ()=>{}
        },
        onBuyEnd:{
            type:Function,
            default: ()=>{}
        }
    },
    methods:{
        closeModal(){
            this.cancel()
            this.buy={
                id_flight: null,
                plazas:null
            },
            this.user={
                dni:null,
                nombre:null,
                apellidos:null,
                direccion:null,
                telefono:null,
                tarjeta_credito:null,
            }
        },
        onChangeDni(){
            date = new Date()
            setTimeout(()=>{
                const now = new Date()

                if((now.getTime()-date.getTime())>400){
                    
                    this.axios.get("/customer/"+this.user.dni)
                    .then(response=>{
                        this.user=response.data.data
                    })
                }

            },400)
        },
        setForm(){
            if(
                this.buy.plazas>0 && this.buy.plazas < 50 &&
                this.user.dni != null && this.user.dni.length >0 &&
                this.user.nombre != null && this.user.nombre.length >0 &&
                this.user.apellidos !=null && this.user.apellidos.length >0 &&
                this.user.direccion !=null && this.user.direccion.length >0 &&
                this.user.telefono !=null && this.user.telefono.length >0 &&
                this.user.tarjeta_credito !=null && this.user.tarjeta_credito.length >0
            ){
                this.buy.id_flight = this.flight.id
                const { user,buy } = this
                
                this.axios.post("/customer/buy", { user,buy })
                .then(()=>{
                    this.onBuyEnd()
                    this.closeModal()
                })
                .catch(error=>{
                    this.error = error.response.data.message
                    console.log(error.response)
                })
            }
        }
    }
}
</script>
