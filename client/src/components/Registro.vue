<template>
    <div>
        <h1>Registrate</h1>
        <form @submit.prevent="register" method="post">
            <input type="text" placeholder="usuario" id="username" v-model="username"  required />
            <input type="password" placeholder="constraseña" id="password" v-model="password" required />
            <button type="submit">Crear cuenta</button>
        </form>
    </div>
</template>

<script>
import api from '../services/api';

export default {
    name: 'UserRegister',
    data() {
        return {
            username: '',
            password: ''
            };
    },
    methods: {
        async registro(){
            try {
                await api.post('/usuario/registro', {
                    username: this.username,
                    password: this.password
                });
                this.$router.push('/login');
            } catch (error) {
                console.error('error al registrar', error);
            }
        }      
    }
};
</script>