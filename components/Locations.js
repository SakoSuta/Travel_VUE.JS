const Locations = {
template: `
<div>
    <h2>All location</h2>
    <ul>
    <router-link :to="{ path: '/locations/' + location.id }" v-for="location in locations">
        <li>{{location.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
    </router-link>
    </ul>
</div>
<div>
    <form @submit.prevent="submitForm">

    <label>Location Name : </label>
    <input type="text" v-model="locationNameA">

    <label>Location Latitude :</label>
    <input type="number" v-model="locationLatA">

    <label>Location Longitude :</label>
    <input type="number" v-model="locationLngA">

    <button type="submit">New location</button>
    </form>
</div>
`,
mounted() {
    fetch('http://localhost:8000/api/locations')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        this.locations = json;
    });
},
methods: {
    submitForm() {
    fetch('http://localhost:8000/api/locations', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name: this.locationNameA,
        lat: this.locationLatA,
        lng: this.locationLngA,
        slug: this.slug
        })
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
    });
    }
},
data() {
    return {
    locations: [],
    locationNameA: "",
    locationLatA: "",
    locationLngA: "",
    slug: "",
    };
},
};

export default Locations