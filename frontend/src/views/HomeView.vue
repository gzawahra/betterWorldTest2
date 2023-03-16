<template>
  <img class="background-image" src="polygons-bg.png">
  <v-card v-if="dataReady && showNetworkDialog" class="input-card">
    <input title="name" type="text" class="input-network-name" required v-model="NewNetworkName"
      minlength="4" maxlength="16" size="10" placeholder="name">
    <input title="company" type="text" class="input-network-company" required v-model="NewNetworkCompany"
      minlength="4" maxlength="16" size="10" placeholder="company">
    <input title="city" type="text" class="input-network-city" required v-model="NewNetworkCity"
      minlength="4" maxlength="16" size="10" placeholder="city">
    <input title="country" type="text" class="input-network-country" required v-model="NewNetworkCountry"
      minlength="2" maxlength="16" size="10" placeholder="country code">
      <v-btn class="close-add-network-button" @click="showNetworkDialog = false">Close</v-btn>
    <v-btn class="submit-network-button" @click="submitNewNetwork">Submit</v-btn>
  </v-card>
  <v-card v-if="dataReady" class="main-card">
    <input title="change your username" type="text" class="searchbox" required v-model="SearchQuery"
              minlength="2" maxlength="2" size="10" placeholder="Search country">
    <v-btn class="add-network-button" @click="showNetworkDialog = true">
      <v-icon icon="mdi-plus"></v-icon>
    </v-btn>
    <v-table class="leaderboard-table">
    <tbody class="leaderboard-table-body">
      <tr
        v-for="(item, index) in networksDisplay"
        :key="index">
          <td class="text-center table-stat" v-if="dataReady">{{networksDisplay[index].name}}</td>
          <td class="text-center table-stat" v-if="dataReady">{{networksDisplay[index].company}}</td>
          <td class="text-center table-stat" v-if="dataReady">{{networksDisplay[index].city}}</td>
          <td class="text-center table-stat" v-if="dataReady">{{networksDisplay[index].country}}</td>
        </tr>
    </tbody>
  </v-table>
   </v-card>
   <div v-if="!dataReady" class="loading-leaderboard-orbit-div">
      <orbit-spinner class="spinner"  :animation-duration="800" :size="150" color="#aa4646"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import INetwork from '../models/INetwork'
import { OrbitSpinner } from 'epic-spinners'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import store from '../store/index'

export default defineComponent({
  name: 'HomeView',
  data () {
    return {
      bgimg: '../public/polygons-bg.png',
      dataReady: false,
      networksDisplay: [] as INetwork[],
      searchText: '' as string,
      SearchQuery: '',
      showNetworkDialog: false,
      NewNetworkName: '',
      NewNetworkCompany: '',
      NewNetworkCity: '',
      NewNetworkCountry: '',
      newNetworkData: {
        name: '',
        company: '',
        city: '',
        country: ''
      }
    }
  },
  components: {
    OrbitSpinner
  },
  watch: {
    async SearchQuery (oldSearch, newSearch) {
      await this.goSearch(oldSearch, newSearch)
    }
  },
  methods: {
    async goSearch (oldQuery: string, query: string) {
      if (oldQuery.length === 2) {
        oldQuery = oldQuery.toUpperCase()
        this.filterByCountry(oldQuery)
      }
      if (oldQuery.length === 0) {
        this.resetNetworkDisplay()
      }
    },
    async refreshNetworks () {
      this.$http.get('/network').then(async (response: any) => {
        response.data.forEach((network: any) => {
          if (network.company != null) {
            network.company = network.company.replace(/[{}""]/g, '')
            network.company = network.company.replace(/,/g, ' ')
          }
          this.networksDisplay.push(network)
          this.networks.push(network)
        })
      }).catch((error: any) => {
        console.log(error.message)
        toast.error('Error while fetching networks')
      })
    },
    async submitNewNetwork () {
      console.log(this.NewNetworkName)
      if (this.NewNetworkName.length < 4) {
        toast.error('Network name must be atleast 4 chars long')
        return
      } else {
        this.newNetworkData.name = this.NewNetworkName
        this.newNetworkData.company = this.NewNetworkCompany
        this.newNetworkData.city = this.NewNetworkCity
        this.newNetworkData.country = this.NewNetworkCountry
        this.$http.post('/network/', this.newNetworkData)
          .then((response: any) => {
            console.log(response.status)
            if (response.status === 201) {
              toast.success('network created')
              this.NewNetworkName = ''
              this.NewNetworkCompany = ''
              this.NewNetworkCity = ''
              this.NewNetworkCountry = ''
              this.showNetworkDialog = false
            }
          })
          .catch((error) => {
            console.error(error)
          })
      }
      console.log('hello')
    },
    async filterByCountry (country: string) {
      for (let i = this.networksDisplay.length - 1; i >= 0; i--) {
        if (this.networksDisplay[i].country !== country) {
          this.networksDisplay.splice(i, 1)
        }
      }
    },
    async resetNetworkDisplay () {
      console.log('reset display')
      this.networksDisplay = [...this.networks]
    }
  },
  async mounted () {
    await this.refreshNetworks()
    this.dataReady = true
  },
  computed: {
    networks: {
      get () {
        return store.getters.getNetworks
      },
      set (value: INetwork[]) {
        store.commit('setNetworks', value)
      }
    }
  }
})
</script>
<style>
.background-image {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100vh;
  width: 177.77777778vh; /* 100 * 16 / 9 */
  min-width: 100%;
  min-height: 56.25vw; /* 100 * 9 / 16 */
  transform: translate(-50%, -50%);
  z-index: 0;
  pointer-events:none;
}
@font-face{
  font-family: cyberFont;
  src: url("../assets/fonts/cyberspace.ttf");
}
@font-face{
    font-family: agency-fb;
    src: url("../assets/fonts/AgencyFB-Bold.ttf");
}
.submit-network-button {
  background-color: rgba(50, 50, 50, 0);
  border-color: rgba(128, 30, 30, 0.8);
  border:2px solid rgba(128, 30, 30, 0.8);
  color: white;
  margin: 30px;
  border-radius: 10px;
  pointer-events: auto;
}
.close-add-network-button {
  background-color: rgba(50, 50, 50, 0);
  border-color: rgba(128, 30, 30, 0.8);
  border:2px solid rgba(128, 30, 30, 0.8);
  color: white;
  margin: 30px;
  border-radius: 10px;
  pointer-events: auto;
}
.add-network-button {
  background-color: rgba(50, 50, 50, 0);
  border:2px solid rgba(128, 30, 30, 0.8);
  border-radius: 10px;
  margin-bottom: 30px;
  color: white;
  float: right;
}
.input-network-name {
  color: white;
  margin: 10px;
  padding: 10px;
  min-width: 300px;
  border:2px solid rgba(128, 30, 30, 0.8);
  border-radius: 10px;
  pointer-events: auto;
}
.input-network-company {
  color: white;
  margin: 10px;
  padding: 10px;
  min-width: 300px;
  border:2px solid rgba(128, 30, 30, 0.8);
  border-radius: 10px;
  pointer-events: auto;
}
.input-network-city {
  color: white;
  margin: 10px;
  padding: 10px;
  min-width: 300px;
  border:2px solid rgba(128, 30, 30, 0.8);
  border-radius: 10px;
  pointer-events: auto;
}
.input-network-country {
  color: white;
  margin: 10px;
  padding: 10px;
  min-width: 300px;
  border:2px solid rgba(128, 30, 30, 0.8);
  border-radius: 10px;
  pointer-events: auto;
}
.searchbox {
  color: white;
  border:none;
  margin-bottom: 15px;
}
.input-card {
  background-color: rgba(0,0,0,1);
  border-radius: 20px;
  max-width: 320px;
  width: fit-content;
  min-height: fit-content;
  max-height: 90vh;
  border:2px solid rgba(128, 30, 30, 0.8);
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  align-items: center;
  justify-content: center;
  justify-items: center;
  transform: translate(-50%, -50%);
  pointer-events: auto;
  z-index: 5;
}
.main-card {
  background-color: rgba(50,50,50,0);
  color: white;
  width: fit-content;
  min-height: fit-content;
  max-height: 90vh;
  /* border:2px solid rgb(170, 70, 70,0.3); */
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: auto;
}
.table-header {
  /* font-family: agency-fb; */

  color: white;
  max-height: 10px;
  max-width: 90vw;
  min-width: 90vw;
  font-size: 20px !important;
}
.table-header-element {
  min-width: max-contentd;
  max-width: max-content;
  max-height: 5px;
}
.table-stat {
  /* font-family: agency-fb; */
  color: white;
  max-width: max-content;
  min-width: max-content;
  max-height: fit-content;
  font-size: 20px !important;
  overflow-x: hidden !important;
  /* overflow-y: auto !important; */
  cursor: pointer;
}
.leaderboard-divider {
  min-width: 90vw;
  color: white;
  border-color: rgba(128, 30, 30, 0.8);
}
.leaderboard-table {
  display: block;
  width: 90vw;
  min-width: 90vw;
  border-radius: 20px;
  color: white;
  transition: 0.5s;
  border:2px solid rgb(170, 70, 70,0.3);
  border-radius: 20px;
  /* border:2px solid rgb(170, 70, 70,0); */
  background-color: rgba(50, 50, 50, 0.8);
  /* overflow: hidden !important; */
  pointer-events: auto;
}
::-webkit-scrollbar {
    width: 0px;
}
.leaderboard-table-body {
  display: block;
  max-height: 90vh;
  max-width: 90vw;
  min-width: 90vw;
  overflow-x: hidden !important;
  overflow-y: auto !important;
}
/* .leaderboard-table-item {
  color: white;
  font-family: agency-fb;
  font-size: 25px !important;
  width: 25px;
  margin-bottom: 8px;
  margin-right: 5px;
  background-color: rgba(150, 150, 50, 0);
  transition: 1s;
  overflow: hidden !important;
  pointer-events: auto;
  cursor: pointer;
} */
.loading-leaderboard-orbit-div {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  transform: translate(-50%, -50%);
  width: 376px;
  height: 200px;
  border:2px solid rgba(170, 170, 70,0);
}
.orbit-spinner.spinner {
  margin-top: 25px;
  margin-left: 113px;
}
html, body {
  overflow: hidden !important;
  --toastify-color-light: rgba(50,50,50,0.3);
  --toastify-color-dark: rgba(50,50,50,0.3);
  --toastify-color-info: rgba(50,50,50,0.3);
  --toastify-color-success: rgba(50,50,50,0.3);
  --toastify-color-warning: rgba(50,50,50,0.3);
  --toastify-color-error: rgba(50,50,50,0.3);
  --toastify-text-color-dark: rgb(255,255,255);
  --toastify-font-family: agency-fb;
  --toastify-text-color-light: rgb(255,255,255);
  --toastify-text-color-info: #fff;
  --toastify-text-color-success: #fff;
  --toastify-text-color-warning: #fff;
  --toastify-text-color-error: #fff;
  --toastify-color-progress-info: #aa4646;
  --toastify-color-progress-success: rgb(170, 70, 70);
  --toastify-color-progress-warning:rgb(170, 70, 70);
  --toastify-color-progress-error: rgb(170, 70, 70);
  --toastify-toast-width: 500px;
  /* overflow: hidden !important; */
}
</style>
