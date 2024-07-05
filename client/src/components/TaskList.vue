<template>
    <div>
        <div>
        <h1>Agregar tarea</h1>
        <form @submit.prevent="addTask">
            <input v-model="title" placeholder="Titulo" required />
            <textarea v-model="description" placeholder="Descripcion"></textarea>
            <button type="submit">Agregar</button>
        </form>
        </div>
        <div>
        <h1>Lista de tareas</h1>
        <ul>
            <li v-for="task in tasks" :key="task.id">
                {{ task.title }} - {{ task.description }} 
                <button @click="deleteTask(task.id)">Eliminar</button>
                <button @click="editTask(task)">Editar</button>
                <input type="checkbox" v-model="task.completed" @change="updateTask(task)">
            </li>
        </ul>
        </div>
        <div v-if="isEditing">
            <h2>Editar tarea</h2>
            <form @submit.prevent="updateTask">
            <input v-model="currentTask.title" placeholder="Titulo" required />
            <textarea v-model="currentTask.description" placeholder="Descripcion"></textarea>
            <button type="submit">Guardar cambios</button>
            <button @click="cancelEdit">Cancelar</button>
            </form>
        </div>
    </div>
</template>

<script>
import api from '../services/api';

export default {
    data() {
        return {
            title: '',
            description: '',
            tasks: [],
            isEditing: false,
            currentTask: null
        };
    },
    created() {
        this.fetchTasks();
    },
    methods: {
        async fetchTasks() {
            const response = await api.get('/tasks');
            this.tasks = response.data;
        },
        async addTask() {
            await api.post('/tasks', {
                title: this.title,
                description: this.description
            });
            this.title = '';
            this.description = '';
            this.fetchTasks();
        },
        async updateTask() {
                await api.put(`/tasks/${this.currentTask.id}`, this.currentTask);
                this.isEditing = false;
                this.currentTask = null;
                this.fetchTasks();
        },
        async toggleTaskCompletion(task) {
                task.completed = !task.completed;
                await api.put(`/tasks/${task.id}`, task);
        },
        editTask(task) {
            this.isEditing = true;
            this.currentTask = { ...task };
        },
        cancelEdit() {
            this.isEditing = false;
            this.currentTask = null;
        },
        async deleteTask(id) {
            await api.delete(`/tasks/${id}`);
            this.fetchTasks();
        }
    }
};
</script>
