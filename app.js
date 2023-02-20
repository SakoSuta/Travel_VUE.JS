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
      <form @submit.prevent="DeleteLocation">
        <router-link :to="{ path: '/locations/updateLocation/' + locationID }">Update {{locationName}} ||</router-link>
        <button type="submit">DELETE {{locationName}}</button>
      </form>
    </div>
    <div>
      <h2>All Places in {{locationName}} :</h2>
      <div>
        <input type="checkbox" v-model="placeVisitedV" v-bind:checked="placeVisitedV === 1" @change="VisitedPlace">
        <input type="text" v-for="place in places" v-model="placeID" :value="place.id">
        <router-link v-for="place in places" :to="{ path: '/Places/updatePlace/' + place.id }">
{{place.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </router-link>
      </div>
          
    </div>
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

        <button type="submit">New Place</button>
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
        this.placeNameV = json.place.name;
        this.placeLatV = json.place.lat;
        this.placeLngV = json.place.lng;
        this.placeVisitedV = json.place.visited;
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
  VisitedPlace() {
    fetch(`http://localhost:8000/api/places/6`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        location_id: this.locationID,
        id: this.placeID,
        name: this.placeNameV,
        lat: this.placeLatV,
        lng: this.placeLngV,
        visited: this.placeVisitedV,
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
    locationID: "",
    locationName: "",
    placeID: "",

    placeNameA: "",
    placeLatA: "",
    placeLngA: "",
    placeVisitedA: "",

    placeNameV: this.placeNameV,
    placeLatV: this.placeLatV,
    placeLngV: this.placeLngA,
    placeVisitedV: this.placeVisitedV,

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