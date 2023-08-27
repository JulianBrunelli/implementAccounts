const { createApp } = Vue;

createApp({
    data() {
        return {
            nameClient: "",
            clientsAccounts: [],
            loans: [],
            json: null,
            // loader: true,
        };
    },
    created() {
        this.loadData()
    },
    methods: {
        loadData() {
            axios.get("/api/clients/current")
                .then(response => {
                    this.nameClient = response.data.firstName + " " + response.data.lastName
                    this.clientsAccounts = response.data.accounts.sort((a, b) => a.id - b.id)
                    this.loans = response.data.loans
                    this.json = JSON.stringify(response.data, null, 1);
                    // this.loader = false
                })
                .catch((error) => console.error(error.message));
        },
        signOut() {
            axios.post('/api/logout')
                .then(response => {
                    location.href = "../pages/index.html"
                })
                .catch((error) => console.error(error.message));
        },
        addAccount() {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        axios.post("/api/clients/current/accounts")
                            .then(response => {
                                Swal.fire('Saved!', '', 'success').then(response => {
                                    location.href = '../pages/accounts.html'
                                })
                            })
                    } else {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
        }
    },
}).mount("#app");
