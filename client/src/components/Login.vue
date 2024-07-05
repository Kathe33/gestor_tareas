<template>
    <div>
        <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
    
        <input type="text" placeholder="usuario" id="username" v-model="username" required />
        <input type="password" placeholder="contraseña" id="password" v-model="password" required />
        <button type="submit">Iniciar Sesión</button>
    </form>
    </div>
</template>


<script>
import api from '../services/api';

export default {
    name: 'userLogin',
    data() {
        return {
        username: '',
        password: ''
        };
    },
    methods: {
        async login()  {
        try {
        await api.post('/usuarios/login', {
            username: this.username,
            password: this.password
        });
        this.$router.push('/tasks');
        } catch (error) {
        console.error(error);
        }
    }}
};
</script>