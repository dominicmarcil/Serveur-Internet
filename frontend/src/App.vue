<template>
  <div class="max-w-xl mx-auto">
    <h1 class="text-3xl font-bold mb-4">Liste de tâches</h1>

    <div class="flex gap-2 mb-4">
      <input
        v-model="newTask"
        class="border p-2 w-full"
        placeholder="Nouvelle tâche"
      />
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded"
        @click="addTask"
      >
        Ajouter
      </button>
    </div>

    <TaskList :tasks="tasks" />
  </div>
</template>

<script>
import TaskList from "./components/TaskList.vue";

export default {
  components: { TaskList },
  data() {
    return {
      newTask: "",
      tasks: [],
    };
  },
  methods: {
    async loadTasks() {
      const res = await fetch("/api/tasks");
      this.tasks = await res.json();
    },
    async addTask() {
      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: this.newTask }),
      });
      this.newTask = "";
      this.loadTasks();
    },
  },
  mounted() {
    this.loadTasks();
  },
};
</script>
