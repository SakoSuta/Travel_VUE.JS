import router from '../app.js';

const UpdateLocation = { 
template: `
<div>
    <router-link :to="{ path: '/locations/' + locationID }">Retour</router-link>
    <form @submit.prevent="updateLocation">

    <label>Location Name :</label>
    <input type="text" v-model="locationNameU">

    <label>Location Latitude :</label>
    <input type="text" v-model="locationLatU">

    <label>Location Longitude :</label>
    <input type="text" v-model="locationLngU">

    <button type="submit">Update the location</button>
    </form>
</div>`,
mounted() {
    fetch(`http://localhost:8000/api/locations/${this.$route.params.slug}`)
    .then(response => response.json())
    .then(json => {
        console.log(json);
        this.locationID = json.id;
        this.locationNameU = json.name;
        this.locationLatU = json.lat;
        this.locationLngU = json.lng;
    });
},
methods: {
updateLocation() {
    fetch(`http://localhost:8000/api/locations/${this.$route.params.slug}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: this.locationNameU,
        lat: this.locationLatU,
        lng: this.locationLngU,
        slug: this.slug
    })
    })
    .then(response => response.json())
    .then(json => {
    console.log(json);
    })
    .then(() => {
        router.push(`/locations/${this.locationID}`);
    });
}
},
data() {
return {
    locationID: "",
    locationNameU: this.locationNameU,
    locationLatU: this.locationLatU,
    locationLngU: this.locationLngU,
    slug: "",
};
}};

export default UpdateLocation