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
 
 <p>
   <img src="https://assets.coingecko.com/coins/images/4716/large/bcna.png"><br />

   <!--<span class="author">420 BCNA are burned every day at 4:20 a.m.</span>-->
 
   <v-sheet
      border
        class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4 info"
        elevation="4" 
        max-width="800"
 
        rounded
      >
 
        <div class="mt-6 mb-10">
          <h2 class="text-h4 font-weight-black ">Total of BCNA burned</h2> 
          <h2 class="roboto-medium text-h4 font-weight-black text-green">{{ finalBurn.number.toFixed(0) }} BCNA</h2> 
          <div align="center" class="roboto-bold countdown mt-8">Next burn</div> 
          <vue3-flip-countdown v-if="isLoaded" :deadline="nextBurnDate" labelColor="white" />  
        </div>
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



 var Fire  = function(){
 
 this.canvas 		= document.getElementById('fire');
 this.ctx 			= this.canvas.getContext('2d');
 this.canvas.height 	= window.innerHeight;
 this.canvas.width 	= window.innerWidth;
 
 this.aFires 		= [];
 this.aSpark 		= [];
 this.aSpark2 		= [];
 
 
 
 this.mouse = {
   x : this.canvas.width * .5,
   y : this.canvas.height * .75,
 }
 
 
 
 this.init();
 
 }
 Fire.prototype.init = function()
 {
 
 this.canvas.addEventListener('mousemove', this.updateMouse.bind( this ), false);
 this.imageObj = new Image();
 this.imageObj.src = document.getElementById('bg').getAttribute('src');
 this.pattern = this.ctx.createPattern( this.imageObj, 'repeat' );
 
 }
 Fire.prototype.run = function(){
 
 this.update();
 this.draw();
 
 if( this.bRuning )
   requestAnimationFrame( this.run.bind( this ) );
 
 }
 Fire.prototype.start = function(){
 
 this.bRuning = true;
 this.run();
 
 }
 Fire.prototype.stop = function(){
 
 this.bRuning = false;
 
 }
 Fire.prototype.update = function(){
 
 this.aFires.push( new Flame( this.mouse ) );
 this.aSpark.push( new Spark( this.mouse ) );
 this.aSpark2.push( new Spark( this.mouse ) );
 
 
 
 for (var i = this.aFires.length - 1; i >= 0; i--) {
 
   if( this.aFires[i].alive )
     this.aFires[i].update();
   else
     this.aFires.splice( i, 1 );
 
 }
 
 for (var i = this.aSpark.length - 1; i >= 0; i--) {
 
   if( this.aSpark[i].alive )
     this.aSpark[i].update();
   else
     this.aSpark.splice( i, 1 );
 
 }
 
 
 for (var i = this.aSpark2.length - 1; i >= 0; i--) {
 
   if( this.aSpark2[i].alive )
     this.aSpark2[i].update();
   else
     this.aSpark2.splice( i, 1 );
 
 }
 
 }
 
 Fire.prototype.draw = function(){
 
 this.clearCanvas();	
 
 this.drawHalo();
 
 this.drawTxt();
 
 this.ctx.globalCompositeOperation = "overlay";//or lighter or soft-light
 
 for (var i = this.aFires.length - 1; i >= 0; i--) {
 
   this.aFires[i].draw( this.ctx );
 
 }
 
 this.ctx.globalCompositeOperation = "soft-light";//"soft-light";//"color-dodge";
 
 for (var i = this.aSpark.length - 1; i >= 0; i--) {
   
   if( ( i % 2 ) === 0 )
     this.aSpark[i].draw( this.ctx );
 
 }
 
 this.ctx.globalCompositeOperation = "color-dodge";//"soft-light";//"color-dodge";
 
 for (var i = this.aSpark2.length - 1; i >= 0; i--) {
 
   this.aSpark2[i].draw( this.ctx );
 
 }
 
 
 }
 
 Fire.prototype.updateMouse = function( e ){
 
 this.mouse.x = e.clientX;
 this.mouse.y = e.clientY;
 
 }
 
 Fire.prototype.clearCanvas = function(){
 
 this.ctx.globalCompositeOperation = "source-over";
 this.ctx.fillStyle = "rgba( 15, 5, 2, 1 )";
 this.ctx.fillRect( 0, 0, window.innerWidth, window.innerHeight );
 
 
 this.ctx.globalCompositeOperation = "lighter";
 this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
 this.ctx.fillStyle = this.pattern;
 this.ctx.fill();/**/
 
 
 
 
 }
 
 Fire.prototype.drawHalo = function(){
 
 var r = rand( 300, 350 );
 this.ctx.globalCompositeOperation = "lighter";
 this.grd = this.ctx.createRadialGradient( this.mouse.x, this.mouse.y,r,this.mouse.x, this.mouse.y, 0 );
 this.grd.addColorStop(0,"transparent");
 this.grd.addColorStop(1,"rgb( 50, 2, 0 )");
 this.ctx.beginPath();
 this.ctx.arc( this.mouse.x, this.mouse.y - 100, r, 0, 2*Math.PI );
 this.ctx.fillStyle= this.grd;
 this.ctx.fill();
 
 }
 
 Fire.prototype.drawTxt = function(){
 
 var mousePCx = ( ( this.canvas.width / 2 ) - this.mouse.x ) / 20;
 var mousePCy = ( ( this.canvas.height / 2 ) - this.mouse.y ) / 20;
 
 this.ctx.globalCompositeOperation = "source-over";
 this.ctx.save();
 
 this.ctx.font = "15em Amatic SC";
 this.ctx.textAlign = "center";
 this.ctx.strokeStyle = "rgb(50, 50, 0)";
 this.ctx.fillStyle = "rgb(100, 10, 0)";
 this.ctx.lineWidth = 2;
 
 this.ctx.shadowColor = "rgba( 10, 0, 0, 0.5 )";
 this.ctx.shadowOffsetX = rand( mousePCx - 2, mousePCx + 2 ); 
 this.ctx.shadowOffsetY = rand( mousePCy - 2, mousePCy + 2 ); 
 this.ctx.shadowBlur = rand( 7, 10 );
 
 this.ctx.strokeText("Fire",this.canvas.width/2, this.canvas.height * .72 );
 this.ctx.fillText("Fire",this.canvas.width/2, this.canvas.height * .72 );	
 
 this.ctx.restore();
 
 }
 
 
 
 
 
 
 
 var Flame = function( mouse ){
 
 this.cx = mouse.x;
 this.cy = mouse.y;
 this.x = rand( this.cx - 25, this.cx + 25);
 this.y = rand( this.cy - 5, this.cy + 5);
 this.lx = this.x;
 this.ly = this.y;
 this.vy = rand( 1, 3 );
 this.vx = rand( -1, 1 );
 this.r = rand( 30, 40 );
 this.life = rand( 2, 7 );
 this.alive = true;
 this.c = {
 
   h : Math.floor( rand( 2, 40) ),
   s : 100,
   l : rand( 80, 100 ),
   a : 0,
   ta : rand( 0.8, 0.9 )
 
 }
 
 
 
 
 }
 Flame.prototype.update = function()
 {
 
 this.lx = this.x;
 this.ly = this.y;
 
 this.y -= this.vy;
 this.vy += 0.08;
 
 
 this.x += this.vx;
 
 if( this.x < this.cx )
   this.vx += 0.2;
 else
   this.vx -= 0.2;
 
 
 
 
 if(  this.r > 0 )
   this.r -= 0.3;
 
 if(  this.r <= 0 )
   this.r = 0;
 
 
 
 this.life -= 0.12;
 
 if( this.life <= 0 ){
 
   this.c.a -= 0.05;
 
   if( this.c.a <= 0 )
     this.alive = false;
 
 }else if( this.life > 0 && this.c.a < this.c.ta ){
 
   this.c.a += .08;
 
 }
 
 }
 Flame.prototype.draw = function( ctx ){
 
 this.grd1 = ctx.createRadialGradient( this.x, this.y, this.r*3, this.x, this.y, 0 );
 this.grd1.addColorStop( 0.5, "hsla( " + this.c.h + ", " + this.c.s + "%, " + this.c.l + "%, " + (this.c.a/20) + ")" );
 this.grd1.addColorStop( 0, "transparent" );
 
 this.grd2 = ctx.createRadialGradient( this.x, this.y, this.r, this.x, this.y, 0 );
 this.grd2.addColorStop( 0.5, "hsla( " + this.c.h + ", " + this.c.s + "%, " + this.c.l + "%, " + this.c.a + ")" );
 this.grd2.addColorStop( 0, "transparent" );
 
 
 ctx.beginPath();
 ctx.arc( this.x, this.y, this.r * 3, 0, 2*Math.PI );
 ctx.fillStyle = this.grd1;
 //ctx.fillStyle = "hsla( " + this.c.h + ", " + this.c.s + "%, " + this.c.l + "%, " + (this.c.a/20) + ")";
 ctx.fill();
 
 
 ctx.globalCompositeOperation = "overlay";
 ctx.beginPath();
 ctx.arc( this.x, this.y, this.r, 0, 2*Math.PI );
 ctx.fillStyle = this.grd2;
 ctx.fill();
 
 
 
 ctx.beginPath();
 ctx.moveTo( this.lx , this.ly);
 ctx.lineTo( this.x, this.y);
 ctx.strokeStyle = "hsla( " + this.c.h + ", " + this.c.s + "%, " + this.c.l + "%, 1)";
 ctx.lineWidth = rand( 1, 2 );
 ctx.stroke();
 ctx.closePath();
 
 }
 
 
 
 
 
 
 
 
 var Spark = function( mouse ){
 
 this.cx = mouse.x;
 this.cy = mouse.y;
 this.x = rand( this.cx -40, this.cx + 40);
 this.y = rand( this.cy, this.cy + 5);
 this.lx = this.x;
 this.ly = this.y;
 this.vy = rand( 1, 3 );
 this.vx = rand( -4, 4 );
 this.r = rand( 0, 1 );
 this.life = rand( 4, 8 );
 this.alive = true;
 this.c = {
 
   h : Math.floor( rand( 2, 40) ),
   s : 100,
   l : rand( 40, 100 ),
   a : rand( 0.8, 0.9 )
 
 }
 
 }
 Spark.prototype.update = function()
 {
 
 this.lx = this.x;
 this.ly = this.y;
 
 this.y -= this.vy;
 this.x += this.vx;
 
 if( this.x < this.cx )
   this.vx += 0.2;
 else
   this.vx -= 0.2;
 
 this.vy += 0.08;
 this.life -= 0.1;
 
 if( this.life <= 0 ){
 
   this.c.a -= 0.05;
 
   if( this.c.a <= 0 )
     this.alive = false;
 
 }
 
 }
 Spark.prototype.draw = function( ctx ){
 
 ctx.beginPath();
 ctx.moveTo( this.lx , this.ly);
 ctx.lineTo( this.x, this.y);
 ctx.strokeStyle = "hsla( " + this.c.h + ", " + this.c.s + "%, " + this.c.l + "%, " + (this.c.a / 2) + ")";
 ctx.lineWidth = this.r * 2;
 ctx.lineCap = 'round';
 ctx.stroke();
 ctx.closePath();
 
 ctx.beginPath();
 ctx.moveTo( this.lx , this.ly);
 ctx.lineTo( this.x, this.y);
 ctx.strokeStyle = "hsla( " + this.c.h + ", " + this.c.s + "%, " + this.c.l + "%, " + this.c.a + ")";
 ctx.lineWidth = this.r;
 ctx.stroke();
 ctx.closePath();
 
 }
 
 function rand( min, max ){ return Math.random() * ( max - min) + min; };
 function onresize() { oCanvas.canvas.width = window.innerWidth; oCanvas.canvas.height = window.innerHeight; };
 
 
 
 var oCanvas;
 function init()
 {
 
 oCanvas = new Fire();
 oCanvas.start();
 
 }
 
 
 window.onload = init;
 </script>
 <style lang="scss">
 @import url('https://fonts.googleapis.com/css?family=Cinzel|Open+Sans+Condensed:300i');
 .back {
  
   background: #141e30;
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
   position: fixed;
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
   margin: 0 0 -30px -100px;
   width: 200px;
   height: 200px;
   overflow: hidden;
   border-radius: 100%;
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
     background: #141e30;
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
 
 </style>