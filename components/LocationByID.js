const LocationByID = {
template: `
<div>
    <router-link to="/locations">Retour</router-link>
    <form>
    <h1>{{locationName}}</h1>
    <br>
    <router-link :to="{ path: '/locations/updateLocation/' + locationID }">Update "{{locationName}}"</router-link>
    <span> || </span>
    <router-link to="/locations" v-on:click="DeleteLocation">DELETE "{{locationName}}"</router-link>
    </form>
</div>
<div>
    <h2>All Places in {{locationName}} :</h2>
    <div v-for="place in places">
        <h3># {{place.name}} #</h3>

        <input type="checkbox" :checked="place.visited === 1" @change="place.visited = ($event.target.checked ? 1 : 0); VisitedPlace(place.id, place.visited, place.name, place.lat, place.lng, place.slug)">
        <label>Visited</label>

        <br>

        <router-link :to="{ path: '/Places/updatePlace/' + place.id }">Update "{{place.name}}"</router-link>
        <span> || </span>
        <router-link to="/locations" v-on:click="DeletePlace(place.id)">DELETE "{{place.name}}"</router-link>
    </div>
        
</div>
<h2>Did you need to add a new place to {{locationName}} ?</h2>
<div>
    <form @submit.prevent="NewPlaces">

    <label>Place Name : </label>
    <input type="text" v-model="placeNameA">

    <label>Place Latitude :</label>
    <input type="number" v-model="placeLatA">

    <label>Place Longitude :</label>
    <input type="number" v-model="placeLngA">

    <label>This place is ever been visited ?</label>
    <input type="checkbox" v-model="placeVisitedA">
    <label>Visited</label>

    <br><button type="submit">New Place</button>
    </form>
</div>`,
mounted() {
fetch(`http://localhost:8000/api/locations/${this.$route.params.slug}/places`)
.then(response => response.json())
.then(json => {
    console.log(json.place);
    this.locationID = json.location.id;
    this.locationName = json.location.name;
    this.places = json.place;
});
},
methods: {
DeleteLocation() {
fetch(`http://localhost:8000/api/locations/${this.$route.params.slug}`, {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    id: this.locationID,
    })
})
.then(response => response.json())
.then(json => {
    console.log(json);
});
},
DeletePlace(placeIDD) {
fetch(`http://localhost:8000/api/places/${placeIDD}`, {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    id: this.placeIDD,
    })
})
.then(response => response.json())
.then(json => {
    console.log(json);
})
},
NewPlaces() {
fetch(`http://localhost:8000/api/locations/${this.$route.params.slug}/places`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    location_id: this.locationID,
    name: this.placeNameA,
    lat: this.placeLatA,
    lng: this.placeLngA,
    visited: this.placeVisitedA,
    slug: this.slug
    })
})
.then(response => response.json())
.then(json => {
    console.log(json);
});
},
VisitedPlace(placeID,Pvisited,placeNameV, placeLatV, placeLngV, slug) {
fetch(`http://localhost:8000/api/places/${placeID}`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    location_id: this.locationID,
    id: placeID,
    name: placeNameV,
    lat: placeLatV,
    lng: placeLngV,
    visited: Pvisited,
    slug: slug
    })
})
.then(response => response.json())
.then(json => {
    console.log(json);
    console.log(Pvisited)
});
}
},
data() {
return {
locationID: "",
locationName: "",
placeID: "",

placeNameA: "",
placeLatA: "",
placeLngA: "",
placeVisitedA: false,

slug: "",
places: [],
};
}};

export default LocationByID