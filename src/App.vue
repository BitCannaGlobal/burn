<template> 
<div class="back"></div>
 <div class="light"></div>
 <div class="content">
   <div class="fire">
   <div class="bottom"></div>
   <figure></figure>
   <figure></figure>
   <figure></figure>
   <figure></figure>
   <figure></figure>
   <figure></figure>
   <figure></figure>
   <figure></figure>
   <figure></figure>
   <figure></figure>
   <figure></figure>
   <figure></figure>
   <figure></figure>
   <figure></figure>
   <figure></figure>
     </div>
   <div class="reverse">
       <div></div>
       <div></div>
       <div></div>
       <div></div>
       <div></div>
       <div></div>
       <div></div>
       <div></div>
   </div>
 </div>
 
 <p class="mt-10">
   <img src="https://assets.coingecko.com/coins/images/4716/large/bcna.png"><br />
   <div id="flipdown" class="flipdown"></div>
   <!--<span class="author">420 BCNA are burned every day at 4:20 a.m.</span>-->
 
   <v-sheet
      border
        class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4 info"
        elevation="4" 
        max-width="800"
        width="800"
        rounded
      >
 
        <div class="mt-6 mb-10">
          <h2 class="text-h4 font-weight-black ">Total of BCNA burned</h2> 
          <h1 class="roboto-medium text-h4 font-weight-black text-green">{{ finalBurn.number.toFixed(0) }} BCNA</h1> 
          <br /> 
        <h2 class="text-h4 font-weight-black ">Next burn</h2> 
        <vue-countdown :time="countDownDate" v-slot="{ days, hours, minutes, seconds }">
          {{ hours }}h {{ minutes }}m {{ seconds }}s
          </vue-countdown>
        </div>
        <div class="text-h6">Burner address <br />bcna14zzg8gnzmss09jvwldrcg2f85prwwg38fnwjda
        <v-btn
          class=" text-none"
          color="#4f545c"
          prepend-icon="mdi-open-in-new"
          variant="flat"
          href="https://www.mintscan.io/bitcanna/address/bcna14zzg8gnzmss09jvwldrcg2f85prwwg38fnwjda"
          target="_blank"
        > View
        </v-btn>
        <br /><br /></div>
 
      </v-sheet>
      
 </p>
 <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
   <defs>
     <filter id="goo">
       <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
       <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
       <feBlend in="SourceGraphic" in2="goo" />
     </filter>
   </defs>
 </svg>
 
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
      nextBurnDate: "",
      isLoaded: false,
      totalBurn: 0,
      countDownDate: 0,
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
    gsap.to(this.finalBurn, { duration: 3, number: this.totalBurn || 0 }) 
  },
  
  async mounted() {
    const burnToday = Date.parse(moment().date() + ' ' + moment().format('MMM') + ' ' + moment().year() + ' 18:20:00 GMT') / 1000;    
    if (moment().unix() > burnToday) {
      var m = moment(new Date(moment().year(), moment().month(), moment().date() + 1, 16, 20, 0));

      const now = new Date();
      const nextBurn = new Date(moment().format('MM') + ' ' +( moment().date() + 1) + ', ' + moment().year() +' 18:20:00'); 
      //console.log(nextBurn, now)
      this.countDownDate = nextBurn - now
 
      const fmt = "YYYY-MM-DD HH:mm:ss";
      this.nextBurnDate = moment
        .unix(Number(m / 1000))
        .format(fmt);      
    } else {
    
      const now = new Date();
      const nextBurn = new Date(moment().format('MM') + ' ' + moment().date() + ', ' + moment().year() +' 18:20:00'); 
      //console.log(nextBurn, now)
      this.countDownDate = nextBurn - now
    
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
 @import url('https://fonts.googleapis.com/css?family=Cinzel|Open+Sans+Condensed:300i');
 .back {
  
   background: #000000;
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
 }
 .light {
   width: 100%;
   height: 100%;
   animation: firelight 2s ease infinite;
   background: radial-gradient(
     ellipse at bottom,
     rgba(173, 133, 12, 0.15) 0%,
     rgba(41, 163, 25, 0) 90%
   );
   position: relative;
   z-index:1;
   bottom: 0;
   left: 0;
   bottom: 0;
 }
 @keyframes firelight {
   0% {
     opacity: 1;
   }
   50% {
     opacity: 0.8;
   }
   100% {
     opacity: 1;
   }
 }
 .content {
   position: absolute;
   left: 50%;
   bottom: 0;
   margin: 0 0 0 -100px;
   width: 200px;
   height: 200px;
   overflow: hidden;
 
   .fire{    
     filter: url(#goo);
     position: absolute;
     width: 100%;
     height: 100%;
   }
   div.bottom {
     position: absolute;
     left: 50px;
     bottom: 0;
     width: 100px;
     height: 30px;
     background: #ff9800;
     border-radius: 30px;
   }
   figure {
     position: absolute;
     margin: 0 0 -15px;
     left: calc(50% - 70px);
     bottom: 0;
     width: 70px;
     height: 70px;
     background: #ff9800;
     border-radius: 100%;
     @for $i from 1 through 16 {
       &:nth-child(#{$i}) {
         animation: firecircle
           1.2s
           #{$i*0.14}s
           cubic-bezier(0.5, 0.07, 0.64, 1)
           infinite;
         margin-left: random(70)+px;
         margin-bottom: -#{15+random(25)}px;
       }
     }
   }
   .reverse div {
     position: absolute;
     margin: 0 0 -15px;
     left: 0;
     bottom: 0;
     width: 70px;
     height: 70px;
     background: #000000;
     border-radius: 100%;
     @for $i from 1 through 4 {
       &:nth-child(#{$i}) {
         animation: firereverseleft
           1.2s
           #{$i*0.5}s
           cubic-bezier(0.5, 0.07, 0.64, 1)
           infinite;
         margin-left: random(23)+px;
         margin-bottom: -#{15+random(25)}px;
       }
     }
     @for $i from 1 through 4 {
       &:nth-child(#{$i+4}) {
         left:120px;
         animation: firereverseright
           1.2s
           #{$i*0.5}s
           cubic-bezier(0.5, 0.07, 0.64, 1)
           infinite;
         margin-left: random(23)+px;
         margin-bottom: -#{15+random(25)}px;
       }
     }
   }
 }
 @keyframes firecircle {
   0% {
     transform: translateY(0) scale(1);
     background: #ff9800;
   }
   100% {
     transform: translateY(-175px) scale(0);
     background: #ffc107;
   }
 }
 @keyframes firereverseleft {
   0% {
     transform: translateY(0) translateX(0) scale(0.3);
   }
   100% {
     transform: translateY(-175px) translateX(50px) scale(1);
   }
 }
 @keyframes firereverseright {
   0% {
     transform: translateY(0) translateX(0) scale(0.3);
   }
   100% {
     transform: translateY(-175px) translateX(-50px) scale(1);
   }
 }
 p {
   color: white;
   position: absolute;
   left: 50%;
   top: 30%;
   transform: translate(-50%, -50%);
   text-align: center;
   font-size: 42px; 
 }
 .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .9;
    position: absolute;
    width: 100%;
  }
 </style>
