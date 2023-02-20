const UpdatePlace = { 
template: `
<div>
    <router-link :to="{ path: '/locations/' + location_id_PLA }">Retour</router-link>
    <form @submit.prevent="updatePlaces">

        <label>Place Name : </label>
        <input type="text" v-model="placeNameU">

        <label>Place Latitude :</label>
        <input type="number" v-model="placeLatU">

        <label>Place Longitude :</label>
        <input type="number" v-model="placeLngU">

        <select>
        <option v-for="location in locations" v-model="location_id_PLA" value=location.id v-bind:selected="location.id === location_id_PLA">{{location.name}}</option>
        </select>

        <label>This place is ever been visited ?</label>
        <input type="checkbox" v-model="placeVisitedU">
        <label>Visited</label>

        <button type="submit">Update Place</button>
    </form>
</div>`,
mounted() {
    fetch(`http://localhost:8000/api/places/${this.$route.params.slug}`)
    .then(responseLoc => responseLoc.json())
    .then(json => {
        console.log(json);
        this.location_id_PLA = json.location_id
        this.locationName_PLA = json.location.name
        this.placeID = json.id;
        this.placeNameU = json.name;
        this.placeLatU = json.lat;
        this.placeLngU = json.lng;
        this.placeVisitedU = json.visited
    })
    fetch(`http://localhost:8000/api/locations`)
    .then(responsePla => responsePla.json())
    .then(json => {
    console.log(json);
    this.locations = json;
    });
},
methods: {
updatePlaces() {
    fetch(`http://localhost:8000/api/places/${this.placeID}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        location_id: this.location_id_PLA,
        name: this.placeNameU,
        lat: this.placeLatU,
        lng: this.placeLngU,
        visited: this.placeVisitedU,
        slug: this.slug
    })
    })
    .then(response => response.json())
    .then(json => {
    console.log(json);
    }).then(
    router.push(`/locations/${this.location_id_PLA}`)
    );
}
},
data() {
return {
    locations: [],
    location_id_PLA: this.location_id_PLA,
    placeNameU: this.placeNameU,
    placeLatU: this.placeLatU,
    placeLngU: this.placeLngU,
    placeVisitedU: this.placeVisitedU,
    slug: "",
};
}}

export default UpdatePlace