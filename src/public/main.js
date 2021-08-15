
const app = new Vue({
    el: '#app',
    data: {
        title: '',
        description: '',
        notes: [],
        idEdit: 0,
    },

    methods: {
        getNote: function (id) {
            return this.notes.find(n => n.id === id);
        },
        onSubmit: function () {
            if (this.idEdit != 0) {
                const note = {
                    id: this.idEdit,
                    title: this.title,
                    description: this.description
                };
                updateNote(note);
                this.idEdit = 0;
            } else {
                saveNote(this.title, this.description);
            }
            this.title = '';
            this.description = '';

        },
        listenNewNotes: function () {
            listenServerNewNote((data) => {
                this.notes.push(data);
            });
        },
        loadNotes: function () {
            loadNotes((notes) => this.notes = notes);
        },
        removeNote: function (id) {
            removeNote(id);
        },
        updateNote: function (id) {
            this.idEdit = id;
            const { title, description } = this.getNote(id);
            this.title = title;
            this.description = description;
        }
    },
    created: function () {
        this.loadNotes();
        this.listenNewNotes();
    },
    computed: {
        getTitleCard: function () {
            return this.idEdit != 0 ? 'Update a Note' : 'Add a Note';
        }
    }
})
