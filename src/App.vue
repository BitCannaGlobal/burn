<template>
 
 
      <br /><br />   
      <v-sheet
      border
        class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4 info"
        elevation="4" 
        max-width="800"
        width="100%"
        rounded
      >
      <img src="https://assets.coingecko.com/coins/images/4716/large/bcna.png" class="mt-6"  height="88"><br />
        <div class="mt-6 mb-10">
          <h2 class="text-h4 font-weight-black ">Total of BCNA burned</h2> 
          <h2 class="roboto-medium text-h4 font-weight-black text-green">{{ finalBurn.number.toFixed(0) }} BCNA</h2> 
          <div align="center" class="roboto-bold countdown mt-8">Next burn</div> 
          <vue3-flip-countdown v-if="isLoaded" :deadline="nextBurnDate" labelColor="white" />  
        </div>
      </v-sheet>
 

</template>
<script>
import { ref, reactive, watch } from 'vue'
import moment from "moment";
import { StargateClient } from "@cosmjs/stargate";
import gsap from 'gsap'

export default {
  name: "popupView",
  data() {
    return {
      msg: "popup",
      drawer: false,
      nextBurnTime: "",
      nextBurnDate: "",
      isLoaded: false,
      totalBurn: 0,
      finalBurn: reactive({
        number: 0
      }) 
    };
  },
  setup() {
 
  },
  async beforeMount() {
    const client = await StargateClient.connect(
      "https://rpc.bitcanna.io",
    );
    const query = `message.action = '/cosmos.authz.v1beta1.MsgExec' AND message.sender = 'bcna16pf952kyvt2dq5gq3ak7j9sh3d4kxcpdz0gvms'`;
    const results = await client.searchTx(query);
 
    let totalBurn = 0
    for (const burnTx of results) {  
      let convertAmount = Number(burnTx.events[13].attributes[1].value.replace("ubcna", ''))
      totalBurn += convertAmount
    }
    this.totalBurn =  Number(totalBurn / 1000000).toFixed(0)  
    gsap.to(this.finalBurn, { duration: 5, number: this.totalBurn || 0 })
  },
  
  async mounted() {
    const burnToday = Date.parse(moment().date() + ' ' + moment().format('MMM') + ' ' + moment().year() + ' 16:20:00 GMT') / 1000;    
    if (moment().unix() > burnToday) {
      var m = moment(new Date(moment().year(), moment().month(), moment().date() + 1, 16, 20, 0));
      this.nextBurnTime =  burnToday + (60 * 60 * 24)
       
      const fmt = "YYYY-MM-DD HH:mm:ss";
      this.nextBurnDate = moment
        .unix(Number(m / 1000))
        .format(fmt);      
    } else {
      var m = moment(new Date(moment().year(), moment().month(), moment().date(), 16, 20, 0));
      const fmt = "YYYY-MM-DD HH:mm:ss";
      this.nextBurnDate = moment
        .unix(Number(m / 1000))
        .format(fmt);      
    }
    this.isLoaded = true
  },
};
</script>
<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

 
.roboto-thin {
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  font-style: normal;
}

.roboto-light {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-style: normal;
}

.roboto-regular {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.roboto-medium {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-style: normal;
}

.roboto-bold {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: normal;
}

.roboto-black {
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-style: normal;
}

.roboto-thin-italic {
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  font-style: italic;
}

.roboto-light-italic {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-style: italic;
}

.roboto-regular-italic {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: italic;
}

.roboto-medium-italic {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-style: italic;
}

.roboto-bold-italic {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: italic;
}

.roboto-black-italic {
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-style: italic;
}

</style>
