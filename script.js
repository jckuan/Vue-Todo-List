var app = new Vue({
  el: "#app",
  data: {
    newTodo: '',
    todos: [
      {
        id: '123',
        title: '(Double click to edit.)',
        completed: true
      }
    ],
    visibility: 'all',
    cacheTodo: {},
    cacheTitle: '',
  },
  methods: {
    addTodo: function () {
      const value = this.newTodo.trim();
      const timeStamp = Math.floor(Date.now());
      if (!value) {
        return;
      }
      this.todos.push({
        id: timeStamp,
        title: value,
        completed: false
      });
      this.newTodo = '';
    },
    removeTodo: function (todo) {
      const vm = this;
      const newIndex = vm.todos.findIndex(function (item, key) {
        return todo.id === item.id;
      })
      this.todos.splice(newIndex, 1);
    },
    editTodo: function (item) {
      // console.log(item);
      this.cacheTodo = item;
      this.cacheTitle = item.title;
    },
    cancelEdit: function () {
      this.cacheTodo = {}
    },
    doneEdit: function (item) {
      item.title = this.cacheTitle;
      this.cacheTitle = '';
      this.cacheTodo = {}
    },
    removeAll: function () {
      this.todos = [];
    }
  },
  computed: {
    filteredTodos: function () {
      if (this.visibility == 'all') {
        return this.todos;
      } else if (this.visibility == 'active') {
        return this.todos.filter(item => !item.completed);
      } else if (this.visibility == 'completed') {
        return this.todos.filter(item => item.completed);
      }
    },
    undoneTodos: function () {
      return this.todos.filter(item => !item.completed);
    }
  }
})