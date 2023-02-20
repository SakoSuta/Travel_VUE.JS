const app = Vue.createApp({});

const Home = { template: '<div>Home</div>' }
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

const SlugLocat = {
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
    }).then(
      router.push(`/locations`)
    );
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
    placeVisitedA: "",

    slug: "",
    places: [],
  };
}};

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
    }).then(
      router.push(`/locations/${this.locationID}`)
    );
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
}}

// const UpdatePlace = { 
//   template: `
//   <div>
//     <router-link :to="{ path: '/locations/' + location_id_PLA }">Retour</router-link>
//     <form @submit.prevent="updatePlaces">

//         <label>Place Name : </label>
//         <input type="text" v-model="placeNameU">

//         <label>Place Latitude :</label>
//         <input type="number" v-model="placeLatU">

//         <label>Place Longitude :</label>
//         <input type="number" v-model="placeLngU">

//         <select>
//           <option v-for="location in locations" v-model="location_id_PLA" value=location.id v-bind:selected="location.id === location_id_PLA">{{location.name}}</option>
//         </select>

//         <label>This place is ever been visited ?</label>
//         <input type="checkbox" v-model="placeVisitedU">
//         <label>Visited</label>

//         <button type="submit">Update Place</button>
//       </form>
//   </div>`,
//   mounted() {
//     fetch(`http://localhost:8000/api/places/${this.$route.params.slug}`)
//       .then(responseLoc => responseLoc.json())
//       .then(json => {
//         console.log(json);
//         this.location_id_PLA = json.location_id
//         this.locationName_PLA = json.location.name
//         this.placeID = json.id;
//         this.placeNameU = json.name;
//         this.placeLatU = json.lat;
//         this.placeLngU = json.lng;
//         this.placeVisitedU = json.visited
//       })
//     fetch(`http://localhost:8000/api/locations`)
//     .then(responsePla => responsePla.json())
//     .then(json => {
//       console.log(json);
//       this.locations = json;
//     });
// },
// methods: {
//   updatePlaces() {
//     fetch(`http://localhost:8000/api/places/${this.placeID}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         location_id: this.location_id_PLA,
//         name: this.placeNameU,
//         lat: this.placeLatU,
//         lng: this.placeLngU,
//         visited: this.placeVisitedU,
//         slug: this.slug
//       })
//     })
//     .then(response => response.json())
//     .then(json => {
//       console.log(json);
//     }).then(
//       router.push(`/locations/${this.location_id_PLA}`)
//     );
//   }
// },
// data() {
//   return {
//     locations: [],
//     location_id_PLA: this.location_id_PLA,
//     placeNameU: this.placeNameU,
//     placeLatU: this.placeLatU,
//     placeLngU: this.placeLngU,
//     placeVisitedU: this.placeVisitedU,
//     slug: "",
//   };
// }}

const routes = [
    { path: '/', component: Home },
    { path: '/locations', component: Locations, props: true },
    { path: '/locations/:slug(\\d+)', component: SlugLocat},
    { path: '/locations/updateLocation/:slug(\\d+)', component: UpdateLocation},
    // { path: '/Places/updatePlace/:slug(\\d+)', component: UpdatePlace},

]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

app.use(router);

app.mount("#app");