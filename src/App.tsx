declare const Chart: any;
import { useState, useEffect, useRef, useMemo } from "react";

// ─────────────────────────────────────────────
// GLOBAL CSS — โทนสว่างขึ้น 20%
// ─────────────────────────────────────────────
const G = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Share+Tech+Mono&family=Noto+Sans+Thai:wght@400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0f1e35;--bg2:#162840;--bg3:#1e3454;--bg4:#2a4268;
  --border:rgba(212,168,67,.42);--border2:rgba(212,168,67,.65);
  --gold:#e8bc55;--gold2:#f5cc70;--gold3:#ffe899;
  --red:#e86060;--cyan:#4ecaae;--orange:#e88c4a;--purple:#aa8ff0;
  --blue:#5aaee8;--green:#5ec87e;
  --text:#f5eedd;--muted:#9aacbf;--muted2:#c8d8e8;
}
body{background:var(--bg);color:var(--text);font-family:'Noto Sans Thai',sans-serif;min-height:100vh;overflow-x:hidden}
.mono{font-family:'Share Tech Mono',monospace}
.cond{font-family:'Barlow Condensed',sans-serif}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--bg2)}::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
@keyframes glow{0%,100%{box-shadow:0 0 8px var(--gold)}50%{box-shadow:0 0 24px var(--gold)}}
@keyframes airIn{0%{transform:translateY(-50px) scale(.6);opacity:0}65%{transform:translateY(6px) scale(1.06)}100%{transform:translateY(0) scale(1);opacity:1}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes flagWave{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
@keyframes waterShimmer{0%,100%{opacity:.5;transform:scaleX(1)}50%{opacity:.8;transform:scaleX(1.015)}}
@keyframes gondola{0%,100%{transform:translateX(0) rotate(-1deg)}50%{transform:translateX(8px) rotate(1deg)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes slideR{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
@keyframes sunRay{0%,100%{opacity:.3}50%{opacity:.6}}
.fade-up{animation:fadeUp .4s ease forwards}
.air-in{animation:airIn .5s cubic-bezier(.34,1.56,.64,1) forwards}
.slide-r{animation:slideR .3s ease forwards}
.btn{font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:1.5px;border:none;cursor:pointer;transition:all .2s;user-select:none}
.btn:active{transform:scale(.96)}
.btn-gold{background:linear-gradient(135deg,#c8902a,#f5cc70,#c8902a);background-size:200%;color:#0e1220;padding:11px 26px;border-radius:5px;text-transform:uppercase;font-size:15px}
.btn-gold:hover{background-position:right;box-shadow:0 0 20px rgba(232,188,85,.5)}
.btn-cyan{background:linear-gradient(135deg,#1e5248,#4ecaae);color:#fff;padding:10px 22px;border-radius:5px;text-transform:uppercase;font-size:14px}
.btn-cyan:hover{box-shadow:0 0 16px rgba(78,202,174,.45)}
.btn-red{background:linear-gradient(135deg,#7a2020,#e86060);color:#fff;padding:9px 20px;border-radius:5px;text-transform:uppercase;font-size:13px}
.btn-purple{background:linear-gradient(135deg,#3a2060,#aa8ff0);color:#fff;padding:10px 22px;border-radius:5px;text-transform:uppercase;font-size:14px}
.btn-purple:hover{box-shadow:0 0 16px rgba(170,143,240,.45)}
.btn-outline{background:transparent;border:1px solid var(--border2);color:var(--muted2);padding:8px 18px;border-radius:5px;text-transform:uppercase;font-size:12px;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:1px;cursor:pointer;transition:all .2s}
.btn-outline:hover{border-color:var(--gold);color:var(--gold)}
.btn-ghost{background:rgba(255,255,255,.09);border:1px solid var(--border);color:var(--muted2);padding:7px 16px;border-radius:4px;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:600;letter-spacing:1px;cursor:pointer;transition:all .2s}
.btn-ghost:hover{background:rgba(255,255,255,.14);color:var(--text)}
.card{background:linear-gradient(135deg,rgba(22,38,65,.97),rgba(30,48,78,.97));border:1px solid rgba(212,168,67,.42);border-radius:10px;padding:20px;backdrop-filter:blur(8px)}
.card-gold{border-color:rgba(232,188,85,.7);box-shadow:0 0 28px rgba(232,188,85,.22)}
.card-cyan{border-color:rgba(78,202,174,.35);box-shadow:0 0 18px rgba(78,202,174,.1)}
.card-hover{transition:all .2s;cursor:pointer}
.card-hover:hover{border-color:rgba(232,188,85,.6);transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,.32)}
.badge{font-family:'Share Tech Mono',monospace;font-size:10px;padding:3px 9px;border-radius:3px;letter-spacing:1px;text-transform:uppercase;display:inline-block}
.input{background:rgba(10,20,38,.8);border:1px solid rgba(232,188,85,.4);color:var(--text);border-radius:6px;padding:10px 14px;font-family:'Noto Sans Thai',sans-serif;font-size:14px;width:100%;outline:none;transition:border-color .2s}
.input:focus{border-color:var(--gold)}
.input::placeholder{color:var(--muted)}
select.input option{background:#1e3454}
.overlay{position:fixed;inset:0;background:rgba(8,18,35,.85);backdrop-filter:blur(8px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px}
.divider{height:1px;background:var(--border);margin:14px 0}
`;

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const CHAPTERS = [
  {id:"CH1",label:"บทที่ 1",title:"แม่เหล็กและไฟฟ้า",icon:"⚡",color:"#4ecaae",bg:"rgba(78,202,174,.06)"},
  {id:"CH2",label:"บทที่ 2",title:"ความร้อนและแก๊ส",icon:"🔥",color:"#e88c4a",bg:"rgba(232,140,74,.06)"},
  {id:"CH3",label:"บทที่ 3",title:"ของแข็งและของไหล",icon:"💧",color:"#aa8ff0",bg:"rgba(170,143,240,.06)"},
];

const XP_RANKS = [
  {minXP:2000,maxXP:2500,label:"DIAMOND",  grade:"4",  color:"#a8d8ff",icon:"💎",desc:"ดีเยี่ยม",  scoreRange:"80–100"},
  {minXP:1875,maxXP:1999,label:"PLATINUM", grade:"3.5",color:"#e0ccff",icon:"🔮",desc:"ดีมาก",     scoreRange:"75–79"},
  {minXP:1750,maxXP:1874,label:"GOLD",     grade:"3",  color:"#f5cc70",icon:"🥇",desc:"ดี",         scoreRange:"70–74"},
  {minXP:1625,maxXP:1749,label:"SILVER I", grade:"2.5",color:"#c8ddf0",icon:"🥈",desc:"ค่อนข้างดี",scoreRange:"65–69"},
  {minXP:1500,maxXP:1624,label:"SILVER II",grade:"2",  color:"#b0cce0",icon:"🥈",desc:"พอใช้",     scoreRange:"60–64"},
  {minXP:1375,maxXP:1499,label:"BRONZE I", grade:"1.5",color:"#ffb86a",icon:"🥉",desc:"อ่อน",      scoreRange:"55–59"},
  {minXP:1250,maxXP:1374,label:"BRONZE II",grade:"1",  color:"#ff9840",icon:"🥉",desc:"อ่อนมาก",   scoreRange:"50–54"},
  {minXP:0,   maxXP:1249,label:"IRON",     grade:"0",  color:"#9aacbf",icon:"⚙️",desc:"ไม่ผ่าน",   scoreRange:"0–49"},
];
const MAX_XP = 2500;

const AIRDROP_POOL = [
  {id:"r1",name:"AWM Sniper Rifle",   icon:"🔫",rarity:"LEGENDARY",color:"#f5cc70"},
  {id:"r2",name:"Level 3 Helmet",     icon:"⛑️", rarity:"EPIC",     color:"#a569bd"},
  {id:"r3",name:"Ghillie Suit",       icon:"🥷", rarity:"EPIC",     color:"#a569bd"},
  {id:"r4",name:"Adrenaline Syringe", icon:"💉", rarity:"RARE",     color:"#4ecaae"},
  {id:"r5",name:"First Aid Kit",      icon:"🩺", rarity:"RARE",     color:"#4ecaae"},
  {id:"r6",name:"Scope 4x",           icon:"🔭", rarity:"UNCOMMON", color:"#7de8a0"},
  {id:"r7",name:"Energy Drink",       icon:"🥤", rarity:"COMMON",   color:"#7b8fe0"},
  {id:"r8",name:"Bandage Pack",       icon:"🩹", rarity:"COMMON",   color:"#7b8fe0"},
];

const TYPE_META={
  worksheet:{label:"ใบกิจกรรม",color:"#4ecaae",icon:"📝"},
  quiz:     {label:"แบบทดสอบ", color:"#f5cc70",icon:"🎯"},
  lab:      {label:"แลป",      color:"#e88c4a",icon:"🧪"},
};

function getRank(xp){return XP_RANKS.find(r=>xp>=r.minXP)||XP_RANKS[XP_RANKS.length-1]}

// ─────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────
const INIT_ASSIGNMENTS = [
  {id:"A1",chapterId:"CH1",title:"ใบกิจกรรม 1.1: กฎของโอห์ม",xp:300,due:"30 พ.ค. 2568",desc:"คำนวณแรงดัน กระแส ความต้านทาน",type:"worksheet",createdAt:"20 พ.ค. 2568"},
  {id:"A2",chapterId:"CH1",title:"แบบทดสอบ 1.2: วงจรไฟฟ้า",xp:400,due:"5 มิ.ย. 2568",desc:"30 ข้อ multiple choice",type:"quiz",createdAt:"20 พ.ค. 2568"},
  {id:"A3",chapterId:"CH1",title:"Lab 1.3: แม่เหล็กไฟฟ้า",xp:350,due:"12 มิ.ย. 2568",desc:"ทดลองสนามแม่เหล็ก",type:"lab",createdAt:"20 พ.ค. 2568"},
  {id:"A4",chapterId:"CH2",title:"ใบกิจกรรม 2.1: กฎของแก๊ส",xp:300,due:"18 มิ.ย. 2568",desc:"Boyle's & Charles' Law",type:"worksheet",createdAt:"21 พ.ค. 2568"},
  {id:"A5",chapterId:"CH2",title:"แบบทดสอบ 2.2: อุณหพลศาสตร์",xp:400,due:"24 มิ.ย. 2568",desc:"30 ข้อ multiple choice",type:"quiz",createdAt:"21 พ.ค. 2568"},
  {id:"A6",chapterId:"CH3",title:"ใบกิจกรรม 3.1: แรงลอยตัว",xp:350,due:"30 มิ.ย. 2568",desc:"หลักของอาร์คิมิดีส",type:"worksheet",createdAt:"22 พ.ค. 2568"},
  {id:"A7",chapterId:"CH3",title:"Lab 3.2: ของไหลและความดัน",xp:400,due:"5 ก.ค. 2568",desc:"Pascal & Bernoulli",type:"lab",createdAt:"22 พ.ค. 2568"},
];
const INIT_RESOURCES = [];
const INIT_STUDENTS = [
  {id:"s1", name:"นาย ศิวรัตน์ ปัทมผดุงศักดิ์", password:"18677", avatar:"👨‍🎓", xp:0, submissions:{}, inventory:[], midterm:null, final:null, xpLog:[]},
  {id:"s2", name:"นางสาว สุธาสินี แสงปลาย",      password:"18583", avatar:"👩‍🎓", xp:0, submissions:{}, inventory:[], midterm:null, final:null, xpLog:[]},
  {id:"s3", name:"นางสาว พิมพ์ชนก กลิ่นระรื่น",  password:"18607", avatar:"👩‍🎓", xp:0, submissions:{}, inventory:[], midterm:null, final:null, xpLog:[]},
  {id:"s4", name:"นางสาว วรินรำไพ ทินภา",         password:"18608", avatar:"👩‍🎓", xp:0, submissions:{}, inventory:[], midterm:null, final:null, xpLog:[]},
  {id:"s5", name:"นางสาว วริศรา อุ่นใจ",          password:"18609", avatar:"👩‍🎓", xp:0, submissions:{}, inventory:[], midterm:null, final:null, xpLog:[]},
  {id:"s6", name:"นางสาว อริสา กานยะคามิน",       password:"18613", avatar:"👩‍🎓", xp:0, submissions:{}, inventory:[], midterm:null, final:null, xpLog:[]},
  {id:"s7", name:"นางสาว คันธารัตน์ ยอดหล้า",     password:"18646", avatar:"👩‍🎓", xp:0, submissions:{}, inventory:[], midterm:null, final:null, xpLog:[]},
  {id:"s8", name:"นางสาว สุดที่รัก รู้เจน",       password:"18804", avatar:"👩‍🎓", xp:0, submissions:{}, inventory:[], midterm:null, final:null, xpLog:[]},
];

// ─────────────────────────────────────────────
// AUDIO
// ─────────────────────────────────────────────
function playAirdropSound(){
  try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    [523,659,784,1047].forEach((f,i)=>{
      const o=ctx.createOscillator(),g=ctx.createGain();
      o.connect(g);g.connect(ctx.destination);o.frequency.value=f;o.type="sine";
      const t=ctx.currentTime+i*.12;
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.3,t+.04);g.gain.exponentialRampToValueAtTime(.001,t+.35);
      o.start(t);o.stop(t+.35);
    });
  }catch(e){}
}

// ─────────────────────────────────────────────
// VENICE BACKGROUND — สว่างขึ้น
// ─────────────────────────────────────────────
function VeniceBackground(){
  return(
    <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#0f1e35 0%,#162840 25%,#1e3a6a 50%,#224265 70%,#1a3050 100%)"}}/>
      <div style={{position:"absolute",right:"18%",top:"36%",width:100,height:100,borderRadius:"50%",
        background:"radial-gradient(circle,rgba(255,210,100,.45) 0%,rgba(255,160,60,.18) 50%,transparent 70%)",
        filter:"blur(8px)"}}/>
      {Array.from({length:35},(_,i)=>(
        <div key={i} style={{position:"absolute",borderRadius:"50%",background:"#fff",
          width:1.5,height:1.5,left:`${Math.random()*100}%`,top:`${Math.random()*40}%`,
          opacity:Math.random()*.6+.15,animation:`pulse ${2+Math.random()*3}s ease-in-out infinite`,
          animationDelay:`${Math.random()*4}s`}}/>
      ))}
      <div style={{position:"absolute",right:"8%",top:"9%",width:48,height:48,borderRadius:"50%",
        background:"radial-gradient(circle at 38% 35%,#fff9e0,#d4c06090)",
        boxShadow:"0 0 34px rgba(220,200,100,.5),0 0 70px rgba(220,200,100,.18)"}}/>
      <div style={{position:"absolute",left:0,right:0,top:"60%",height:"8%",
        background:"linear-gradient(0deg,transparent,rgba(255,170,70,.09))",filter:"blur(6px)"}}/>
      <svg style={{position:"absolute",bottom:"26%",left:0,width:"100%"}} height="130" viewBox="0 0 1400 130" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bldg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3858"/>
            <stop offset="100%" stopColor="#122438"/>
          </linearGradient>
        </defs>
        <path d="M0,130 L0,85 L50,85 L50,65 L65,55 L80,65 L80,85 L110,85 L110,50 L120,38 L130,50 L130,85 L165,85 L165,70 L180,58 L195,70 L195,85 L220,85 L220,55 L235,42 L240,32 L245,42 L260,55 L260,85 L295,85 L295,68 L310,56 L325,68 L325,85 L350,85 L350,72 L365,62 L365,72 L385,72 L385,85 L415,85 L415,50 L425,38 L432,28 L439,38 L450,50 L450,85 L480,85 L480,62 L495,50 L510,62 L510,85 L540,85 L540,70 L555,58 L555,70 L575,70 L575,85 L605,85 L605,52 L618,40 L625,30 L632,40 L645,52 L645,85 L675,85 L675,65 L690,53 L705,65 L705,85 L735,85 L735,72 L748,62 L748,72 L765,72 L765,85 L795,85 L795,50 L808,38 L815,28 L822,38 L835,50 L835,85 L865,85 L865,65 L878,53 L893,65 L893,85 L920,85 L920,72 L933,62 L946,72 L946,85 L975,85 L975,52 L988,40 L995,30 L1002,40 L1015,52 L1015,85 L1045,85 L1045,68 L1058,56 L1073,68 L1073,85 L1100,85 L1100,55 L1113,42 L1118,32 L1123,42 L1138,55 L1138,85 L1168,85 L1168,70 L1181,58 L1196,70 L1196,85 L1220,85 L1220,50 L1233,38 L1240,28 L1247,38 L1260,50 L1260,85 L1290,85 L1290,65 L1305,53 L1320,65 L1320,85 L1350,85 L1350,72 L1365,60 L1380,72 L1380,85 L1400,85 L1400,130 Z" fill="url(#bldg)"/>
        <ellipse cx="240" cy="30" rx="14" ry="11" fill="#1a2e48"/>
        <ellipse cx="625" cy="28" rx="14" ry="11" fill="#1a2e48"/>
        <ellipse cx="815" cy="26" rx="14" ry="11" fill="#1a2e48"/>
        <ellipse cx="1240" cy="26" rx="14" ry="11" fill="#1a2e48"/>
        <rect x="428" y="8" width="9" height="35" fill="#142438"/>
        <polygon points="428,8 432.5,0 437,8" fill="#142438"/>
        <rect x="1113" y="8" width="9" height="35" fill="#142438"/>
        <polygon points="1113,8 1117.5,0 1122,8" fill="#142438"/>
        {[[90,65],[155,72],[310,62],[490,65],[690,68],[880,68],[1065,62],[1180,65]].map(([x,y],i)=>(
          <rect key={i} x={x} y={y} width="5" height="4" rx="1" fill="#ffe08055" opacity=".8"/>
        ))}
      </svg>
      <div style={{position:"absolute",bottom:"16%",left:0,right:0,height:"10%",
        background:"linear-gradient(180deg,rgba(36,68,120,.65) 0%,rgba(24,50,90,.45) 100%)"}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:"26%",
        background:"linear-gradient(180deg,#162840 0%,#1e3a58 35%,#224060 70%,#1a3248 100%)",
        borderTop:"1px solid rgba(120,180,240,.22)"}}>
        {Array.from({length:9},(_,i)=>(
          <div key={i} style={{position:"absolute",left:"3%",right:"3%",height:1,
            background:`rgba(120,180,240,${.08+i*.012})`,
            top:`${12+i*9}%`,borderRadius:2,
            animation:`waterShimmer ${2.5+i*.4}s ease-in-out infinite`,animationDelay:`${i*.35}s`}}/>
        ))}
        <div style={{position:"absolute",top:0,left:"18%",width:6,height:"55%",
          background:"linear-gradient(180deg,rgba(255,230,100,.22),transparent)",borderRadius:3,
          animation:"waterShimmer 3s ease-in-out infinite"}}/>
        <div style={{position:"absolute",top:0,right:"22%",width:4,height:"40%",
          background:"linear-gradient(180deg,rgba(255,230,100,.16),transparent)",borderRadius:3,
          animation:"waterShimmer 3.5s ease-in-out infinite",animationDelay:"1s"}}/>
        <div style={{position:"absolute",bottom:"32%",left:"12%",animation:"gondola 4s ease-in-out infinite",fontSize:30,filter:"drop-shadow(0 3px 6px rgba(0,0,0,.6))"}}>🛶</div>
        <div style={{position:"absolute",bottom:"22%",right:"18%",animation:"gondola 5s ease-in-out infinite",animationDelay:"1.8s",fontSize:22,opacity:.75,filter:"drop-shadow(0 3px 6px rgba(0,0,0,.6))"}}>🛶</div>
        <div style={{position:"absolute",bottom:"28%",left:"55%",animation:"gondola 6s ease-in-out infinite",animationDelay:".8s",fontSize:18,opacity:.55,filter:"drop-shadow(0 3px 6px rgba(0,0,0,.5))"}}>🛶</div>
      </div>
      {[6,18,32,46,60,74,88].map((l,i)=>(
        <div key={i} style={{position:"absolute",left:`${l}%`,bottom:"25.5%",
          width:5,height:5,borderRadius:"50%",background:"#ffe090",
          boxShadow:`0 0 10px rgba(255,220,80,.9),0 0 24px rgba(255,200,60,.4)`,
          animation:`pulse ${1.8+i*.25}s ease-in-out infinite`,animationDelay:`${i*.45}s`}}/>
      ))}
      <div style={{position:"absolute",inset:0,opacity:.04,
        backgroundImage:"linear-gradient(rgba(120,180,240,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(120,180,240,.5) 1px,transparent 1px)",
        backgroundSize:"60px 60px"}}/>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center,transparent 40%,rgba(8,18,35,.45) 100%)"}}/>
    </div>
  );
}

// ─────────────────────────────────────────────
// MINI COMPONENTS
// ─────────────────────────────────────────────
function XPBar({xp,maxXP=MAX_XP,color="#f5cc70",showLabel=true}){
  const pct=Math.min(100,(xp/maxXP)*100);
  const rank=getRank(xp);
  return(
    <div>
      {showLabel&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:12}}>
        <span style={{color:"var(--muted2)"}}>{rank.label}</span>
        <span className="mono" style={{color}}>{xp.toLocaleString()} / {maxXP.toLocaleString()} XP</span>
      </div>}
      <div style={{height:10,background:"rgba(14,26,43,.8)",borderRadius:5,overflow:"hidden",border:"1px solid var(--border)"}}>
        <div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${color}55,${color})`,transition:"width 1s ease",borderRadius:5,position:"relative"}}>
          <div style={{position:"absolute",right:0,top:0,width:3,height:"100%",background:"rgba(255,255,255,.65)",boxShadow:`0 0 6px ${color}`}}/>
        </div>
      </div>
    </div>
  );
}

function GradeTag({xp,big=false}){
  const r=getRank(xp);
  return(
    <div style={{display:"inline-flex",flexDirection:"column",alignItems:"center",
      background:`${r.color}20`,border:`2px solid ${r.color}70`,
      borderRadius:8,padding:big?"10px 18px":"6px 12px",textAlign:"center"}}>
      <div style={{fontSize:big?18:14}}>{r.icon}</div>
      <div className="cond" style={{fontSize:big?38:22,fontWeight:900,color:r.color,lineHeight:1,
        textShadow:`0 0 18px ${r.color}66`}}>{r.grade}</div>
      <div className="mono" style={{fontSize:big?10:8,color:r.color,letterSpacing:1,marginTop:1}}>GRADE</div>
    </div>
  );
}

function ProgressFlag({xp}){
  const pct=Math.min(100,(xp/MAX_XP)*100);
  return(
    <div style={{position:"relative",marginTop:8}}>
      <div style={{height:14,background:"rgba(14,26,43,.8)",borderRadius:7,border:"1px solid var(--border)",position:"relative",overflow:"visible"}}>
        <div style={{width:`${pct}%`,height:"100%",background:"linear-gradient(90deg,#1a3a6a,#5aaee8,#f5cc70)",borderRadius:"7px 0 0 7px",transition:"width 1.2s ease",minWidth:pct>0?14:0,position:"relative"}}>
          <div style={{position:"absolute",right:-8,top:-6,fontSize:18,filter:"drop-shadow(0 2px 4px rgba(0,0,0,.8))"}}>🪖</div>
        </div>
        {XP_RANKS.slice().reverse().map(r=>(
          <div key={r.minXP} style={{position:"absolute",left:`${(r.minXP/MAX_XP)*100}%`,top:-2,width:1,height:18,background:"rgba(255,255,255,.22)"}}/>
        ))}
        <div style={{position:"absolute",right:-4,top:-8,fontSize:20,animation:"flagWave 2s ease-in-out infinite"}}>🏁</div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:5,fontSize:10,color:"var(--muted)"}}>
        <span className="mono">0 XP</span>
        <span className="mono">{MAX_XP.toLocaleString()} XP</span>
      </div>
    </div>
  );
}

function Top3Card({students}){
  const sorted=[...students].sort((a,b)=>b.xp-a.xp).slice(0,3);
  const medals=["🥇","🥈","🥉"],mc=["#f5cc70","#c8c8c8","#cd7f32"];
  return(
    <div className="card card-gold" style={{marginBottom:16}}>
      <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:3,marginBottom:14}}>🏆 TOP 3</div>
      <div style={{display:"flex",gap:10}}>
        {sorted.map((s,i)=>{const r=getRank(s.xp);return(
          <div key={s.id} style={{flex:1,textAlign:"center",padding:"12px 8px",
            background:i===0?"rgba(232,188,85,.12)":"rgba(255,255,255,.05)",
            border:`1px solid ${i===0?"rgba(232,188,85,.4)":"var(--border)"}`,borderRadius:8}}>
            <div style={{fontSize:24}}>{medals[i]}</div>
            <div style={{fontSize:30,margin:"4px 0"}}>{s.avatar}</div>
            <div style={{fontSize:12,color:"#fff",fontWeight:600,lineHeight:1.3}}>{s.name.split(" ").slice(1).join(" ")}</div>
            <div className="mono" style={{fontSize:16,fontWeight:700,color:mc[i],marginTop:4}}>{s.xp.toLocaleString()}</div>
            <div style={{fontSize:10,color:"var(--muted)"}}>XP</div>
            <div className="badge" style={{marginTop:8,background:`${r.color}20`,border:`1px solid ${r.color}50`,color:r.color,fontSize:9,lineHeight:1.5}}>{r.icon} {r.label}</div>
          </div>
        );})}
      </div>
    </div>
  );
}

function GradeTable(){
  return(
    <div className="card" style={{overflow:"hidden"}}>
      <div style={{background:"rgba(232,188,85,.1)",border:"1px solid rgba(232,188,85,.3)",borderRadius:8,padding:"10px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:14}}>
        <div style={{fontSize:26}}>⚡</div>
        <div>
          <div className="mono" style={{fontSize:13,color:"var(--gold2)",fontWeight:700,letterSpacing:1}}>1 คะแนน = 25 XP</div>
          <div style={{fontSize:12,color:"var(--muted2)",marginTop:2}}>XP เต็มเทอม 2,500 XP = 100 คะแนน</div>
        </div>
      </div>
      <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:3,marginBottom:14}}>📊 เกณฑ์ XP → เกรด</div>
      <div style={{display:"grid",gridTemplateColumns:"1.4fr 1.2fr 1fr .5fr .8fr",gap:1,background:"var(--border)"}}>
        {["RANK","XP","คะแนน","เกรด","สถานะ"].map(h=>(
          <div key={h} style={{background:"var(--bg3)",padding:"7px 10px",fontSize:11,color:"var(--muted2)",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:1}}>{h}</div>
        ))}
        {XP_RANKS.map(r=>[
          <div key={r.label+"a"} style={{background:"var(--bg2)",padding:"7px 10px",fontSize:12,display:"flex",gap:6,alignItems:"center"}}><span>{r.icon}</span><span style={{color:r.color,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700}}>{r.label}</span></div>,
          <div key={r.label+"b"} style={{background:"var(--bg2)",padding:"7px 10px",fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:"var(--text)"}}>{r.minXP.toLocaleString()}–{r.maxXP.toLocaleString()}</div>,
          <div key={r.label+"c"} style={{background:"var(--bg2)",padding:"7px 10px",fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:"var(--muted2)"}}>{r.scoreRange}</div>,
          <div key={r.label+"d"} style={{background:"var(--bg2)",padding:"7px 10px",fontFamily:"'Share Tech Mono',monospace",fontSize:16,fontWeight:700,color:r.color}}>{r.grade}</div>,
          <div key={r.label+"e"} style={{background:"var(--bg2)",padding:"7px 10px",fontSize:12,color:"var(--muted2)"}}>{r.desc}</div>,
        ])}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// AIRDROP POPUP
// ─────────────────────────────────────────────
function AirdropPopup({airdrop,onClaim}){
  useEffect(()=>{playAirdropSound();},[]);
  return(
    <div className="overlay" style={{zIndex:2000}}>
      <div className="air-in" style={{textAlign:"center",maxWidth:380,width:"100%"}}>
        <div style={{position:"relative",display:"inline-block",marginBottom:16}}>
          {Array.from({length:8},(_,i)=>(
            <div key={i} style={{position:"absolute",top:"50%",left:"50%",width:2,height:80,
              background:`linear-gradient(to top,${airdrop.color},transparent)`,
              transform:`rotate(${i*45}deg) translateY(-100%)`,transformOrigin:"0 0",opacity:.5}}/>
          ))}
          <div style={{fontSize:84,position:"relative",zIndex:1,filter:`drop-shadow(0 0 30px ${airdrop.color})`}}>{airdrop.icon}</div>
        </div>
        <div className="cond" style={{fontSize:13,color:"var(--muted2)",letterSpacing:4,marginBottom:4}}>📦 AIRDROP INCOMING!</div>
        <div className="cond" style={{fontSize:38,fontWeight:900,color:airdrop.color,marginBottom:8,textShadow:`0 0 28px ${airdrop.color}`}}>{airdrop.name}</div>
        <div className="badge" style={{background:`${airdrop.color}20`,border:`1px solid ${airdrop.color}60`,color:airdrop.color,fontSize:13,padding:"5px 14px",marginBottom:16}}>★ {airdrop.rarity}</div>
        {airdrop.note&&<div style={{color:"var(--muted2)",fontSize:14,fontStyle:"italic",marginBottom:16}}>"{airdrop.note}"</div>}
        <button className="btn btn-gold" onClick={onClaim} style={{fontSize:18,padding:"14px 48px",animation:"glow 2s ease-in-out infinite"}}>✅ รับรางวัล</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────
function LoginScreen({students,onLogin}){
  const [mode,setMode]=useState("student");
  const [sel,setSel]=useState("");
  const [pw,setPw]=useState("");
  const [err,setErr]=useState("");
  function doLogin(){
    setErr("");
    if(mode==="teacher"){if(pw==="291241"){onLogin("teacher",null);return;}setErr("รหัสผ่านไม่ถูกต้อง");return;}
    const s=students.find(x=>x.id===sel);
    if(!s){setErr("กรุณาเลือกชื่อ");return;}
    if(s.password!==pw){setErr("รหัสผ่านไม่ถูกต้อง");return;}
    onLogin("student",s.id);
  }
  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24,position:"relative"}}>
      <VeniceBackground/>
      <div style={{position:"relative",zIndex:1,width:"100%",maxWidth:420}}>
        <div className="fade-up" style={{textAlign:"center",marginBottom:32}}>
          <div style={{display:"flex",gap:14,justifyContent:"center",fontSize:52,marginBottom:12,animation:"float 3s ease-in-out infinite"}}>
            <span>⚡</span><span>🔥</span><span>💧</span>
          </div>
          <div className="cond" style={{fontSize:56,fontWeight:900,letterSpacing:6,color:"var(--gold2)",lineHeight:1,textShadow:"0 0 40px rgba(232,188,85,.6)"}}>PHYSICS</div>
          <div className="cond" style={{fontSize:22,fontWeight:600,letterSpacing:14,color:"var(--muted2)",marginTop:2}}>BATTLEGROUND</div>
          <div className="mono" style={{fontSize:11,color:"var(--muted)",marginTop:8,letterSpacing:3}}>── VENICE SEASON 2568 ──</div>
        </div>
        <div className="card fade-up" style={{animationDelay:".1s",background:"rgba(18,36,62,.9)",backdropFilter:"blur(20px)",border:"1px solid rgba(232,188,85,.3)"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,marginBottom:22,background:"rgba(18,32,52,.8)",borderRadius:6,padding:4}}>
            {[["student","🧑‍🎓  นักเรียน"],["teacher","👩‍✈️  ครู"]].map(([m,l])=>(
              <button key={m} onClick={()=>{setMode(m);setErr("");setPw("");}} className="btn"
                style={{background:mode===m?"var(--bg3)":"transparent",border:mode===m?"1px solid rgba(232,188,85,.4)":"1px solid transparent",
                  color:mode===m?"var(--gold)":"var(--muted)",padding:"10px",borderRadius:4,fontSize:14,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>{l}</button>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {mode==="student"?(
              <div>
                <label className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:8}}>SELECT PLAYER</label>
                <select className="input" value={sel} onChange={e=>setSel(e.target.value)}>
                  <option value="">-- เลือกชื่อนักเรียน --</option>
                  {students.map(s=><option key={s.id} value={s.id}>{s.avatar} {s.name}</option>)}
                </select>
              </div>
            ):(
              <div>
                <label className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:8}}>COMMANDER ID</label>
                <input className="input" value="teacher" readOnly style={{opacity:.5}}/>
              </div>
            )}
            <div>
              <label className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:8}}>PASSWORD</label>
              <input className="input" type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
            </div>
            {err&&<div style={{background:"rgba(232,96,96,.14)",border:"1px solid rgba(232,96,96,.4)",borderRadius:5,padding:"9px 14px",color:"var(--red)",fontSize:13}}>{err}</div>}
            <button className="btn btn-gold" onClick={doLogin} style={{marginTop:4}}>▶  DEPLOY INTO ZONE</button>
          </div>
          <div style={{height:1,background:"var(--border)",margin:"14px 0"}}/>
          <div className="mono" style={{fontSize:10,color:"var(--muted)",textAlign:"center",letterSpacing:1}}>PHYSICS BATTLEGROUND © 2568 · VENICE EDITION</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TOP NAV
// ─────────────────────────────────────────────
function TopNav({user,role,page,setPage,onLogout}){
  const sTabs=[{id:"dashboard",label:"DASHBOARD"},{id:"resources",label:"เนื้อหา"},{id:"assignments",label:"ส่งงาน"},{id:"ranking",label:"TOP 3"},{id:"inventory",label:"AIRDROP"},{id:"settings",label:"ตั้งค่า"}];
  const tTabs=[{id:"overview",label:"OVERVIEW"},{id:"students",label:"STUDENTS"},{id:"t-assignments",label:"📋 งาน"},{id:"t-resources",label:"📁 ไฟล์"},{id:"t-scores",label:"⭐ XP"},{id:"t-exam",label:"📝 สอบ"},{id:"t-airdrop",label:"📦 AIRDROP"},{id:"ranking",label:"RANKING"}];
  const tabs=role==="teacher"?tTabs:sTabs;
  return(
    <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(12,24,42,.96)",backdropFilter:"blur(20px)",borderBottom:"1px solid var(--border)"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 16px",height:54,display:"flex",alignItems:"center",gap:4}}>
        <div className="cond" style={{fontSize:20,fontWeight:900,color:"var(--gold)",letterSpacing:3,marginRight:20,flexShrink:0,textShadow:"0 0 18px rgba(232,188,85,.5)"}}>⚡ PHYS·BG</div>
        <div style={{display:"flex",flex:1,overflowX:"auto",gap:0}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setPage(t.id)} className="btn"
              style={{background:page===t.id?"rgba(232,188,85,.1)":"transparent",padding:"0 14px",height:54,
                color:page===t.id?"var(--gold2)":"var(--muted2)",
                borderBottom:page===t.id?"2px solid var(--gold)":"2px solid transparent",
                borderRadius:0,fontSize:12,letterSpacing:1,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,flexShrink:0,whiteSpace:"nowrap"}}>
              {t.label}
            </button>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <span style={{fontSize:22}}>{user?.avatar||"👩‍✈️"}</span>
          <div style={{lineHeight:1.3}}>
            <div style={{fontSize:12,color:"var(--text)",maxWidth:100,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user?.name||"Commander"}</div>
            <div className="mono" style={{fontSize:9,color:"var(--muted)"}}>{role==="teacher"?"COMMANDER":getRank(user?.xp||0).label}</div>
          </div>
          <button className="btn-outline" onClick={onLogout} style={{padding:"6px 14px",fontSize:11}}>OUT</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PAGE HEADER
// ─────────────────────────────────────────────
const PAGE_META = {
  dashboard:      {label:"DASHBOARD",    back:null},
  resources:      {label:"เนื้อหา / สไลด์",back:"dashboard"},
  assignments:    {label:"ส่งงาน",        back:"dashboard"},
  ranking:        {label:"TOP 3 RANKING", back:"dashboard"},
  inventory:      {label:"AIRDROP รางวัล",back:"dashboard"},
  settings:       {label:"ตั้งค่า",        back:"dashboard"},
  overview:       {label:"OVERVIEW",      back:null},
  students:       {label:"STUDENTS",      back:"overview"},
  "t-assignments":{label:"จัดการงาน",     back:"overview"},
  "t-resources":  {label:"จัดการไฟล์",    back:"overview"},
  "t-scores":     {label:"จัดการ XP",     back:"overview"},
  "t-exam":       {label:"คะแนนสอบ",      back:"overview"},
  "t-airdrop":    {label:"AIRDROP",       back:"overview"},
};

function PageHeader({page,setPage}){
  const meta=PAGE_META[page]||{label:page,back:null};
  if(!meta.back)return null;
  return(
    <div style={{padding:"16px 20px 4px"}}>
      <div style={{display:"inline-flex",alignItems:"center",gap:10,
        background:"rgba(24,44,74,.94)",border:"1px solid var(--border2)",
        borderRadius:8,padding:"8px 18px",backdropFilter:"blur(8px)"}}>
        <button onClick={()=>setPage(meta.back)} className="btn"
          style={{background:"transparent",color:"var(--gold2)",fontSize:15,padding:0,letterSpacing:0,fontFamily:"'Noto Sans Thai',sans-serif",fontWeight:600}}>←</button>
        <span style={{width:1,height:16,background:"var(--border2)"}}/>
        <span className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2}}>{meta.back.toUpperCase()}</span>
        <span style={{color:"var(--muted)",fontSize:12}}>›</span>
        <span className="mono" style={{fontSize:10,color:"var(--gold)",letterSpacing:2,fontWeight:700}}>{meta.label.toUpperCase()}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SCORE BREAKDOWN
// ─────────────────────────────────────────────
function ScoreBreakdown({student, assignments}){
  const MAX_HALF=35, MAX_MID=15, MAX_FINAL=15;
  const half=Math.ceil((assignments||[]).length/2);
  const first=(assignments||[]).slice(0,half);
  const second=(assignments||[]).slice(half);
  function earnedXP(list){return list.reduce((s,a)=>{const sub=student.submissions?.[a.id];return s+(sub?sub.xpEarned||0:0);},0);}
  const score1=Math.min(MAX_HALF,Math.round(earnedXP(first)/25));
  const score2=Math.min(MAX_HALF,Math.round(earnedXP(second)/25));
  const scoreMid=student.midterm, scoreFinal=student.final;
  const totalAnnounced=score1+score2+(scoreMid!==null?scoreMid:0)+(scoreFinal!==null?scoreFinal:0);
  const maxAnnounced=MAX_HALF+MAX_HALF+(scoreMid!==null?MAX_MID:0)+(scoreFinal!==null?MAX_FINAL:0);
  const pct1=Math.round((score1/MAX_HALF)*100);
  const pct2=Math.round((score2/MAX_HALF)*100);
  const pctMid=scoreMid!==null?Math.round((scoreMid/MAX_MID)*100):null;
  function tip(){
    const w=[];
    if(pct1<60)w.push("คะแนนเก็บก่อนกลางภาค");
    if(pct2<60)w.push("คะแนนเก็บหลังกลางภาค");
    if(pctMid!==null&&pctMid<60)w.push("สอบกลางภาค");
    return w.length?`💡 ควรพัฒนา: ${w.join(", ")}`:null;
  }
  const segs=[
    {label:"เก็บ ก่อนกลางภาค",w:35,bg:"#d8b4fe",txt:"#3b0764",cbg:"rgba(216,180,254,.12)",cbr:"rgba(216,180,254,.35)",bar:"#a78bfa",score:score1,max:MAX_HALF,pct:pct1,ok:true},
    {label:"สอบกลางภาค",w:15,bg:"#93c5fd",txt:"#1e3a8a",cbg:"rgba(147,197,253,.12)",cbr:"rgba(147,197,253,.35)",bar:"#60a5fa",score:scoreMid,max:MAX_MID,pct:pctMid,ok:scoreMid!==null},
    {label:"เก็บ หลังกลางภาค",w:35,bg:"#f9a8d4",txt:"#500724",cbg:"rgba(249,168,212,.12)",cbr:"rgba(249,168,212,.35)",bar:"#f472b6",score:score2,max:MAX_HALF,pct:pct2,ok:true},
    {label:"สอบปลายภาค",w:15,bg:"#fde68a",txt:"#451a03",cbg:"rgba(253,230,138,.08)",cbr:"rgba(253,230,138,.3)",bar:"#fbbf24",score:scoreFinal,max:MAX_FINAL,pct:null,ok:scoreFinal!==null},
  ];
  return(
    <div className="card" style={{marginBottom:16}}>
      <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:3,marginBottom:10}}>📊 สัดส่วนคะแนน 100 คะแนน</div>
      <div style={{display:"flex",borderRadius:10,overflow:"hidden",height:30,marginBottom:10,gap:2}}>
        {segs.map((s,i)=>(
          <div key={i} style={{width:`${s.w}%`,background:s.bg,display:"flex",alignItems:"center",
            justifyContent:"center",fontSize:11,fontWeight:600,color:s.txt,
            borderRadius:i===0?"6px 0 0 6px":i===3?"0 6px 6px 0":"0"}}>{s.label}</div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:10}}>
        {segs.map((s,i)=>(
          <div key={i} style={{background:s.cbg,border:`0.5px solid ${s.cbr}`,borderRadius:8,padding:"10px 10px"}}>
            <div style={{fontSize:10,color:s.bg,fontWeight:600,marginBottom:6,lineHeight:1.3}}>{s.label}</div>
            <div style={{background:"rgba(0,0,0,.18)",borderRadius:4,overflow:"hidden",height:8,marginBottom:4}}>
              <div style={{width:`${s.ok&&s.pct!==null?s.pct:0}%`,height:"100%",background:s.bar,borderRadius:4,transition:"width .6s"}}/>
            </div>
            {s.ok&&s.score!==null
              ?<div style={{display:"flex",justifyContent:"space-between",fontSize:12}}>
                  <span style={{color:"var(--text)",fontWeight:600}}>{s.score}/{s.max}</span>
                  <span style={{color:s.bg,fontSize:11}}>{s.pct}%</span>
                </div>
              :<div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>ยังไม่ประกาศ</div>}
          </div>
        ))}
      </div>
      <div style={{background:"rgba(232,188,85,.09)",border:"0.5px solid rgba(232,188,85,.28)",borderRadius:8,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:13,color:"var(--muted2)"}}>คะแนนรวมที่ประกาศแล้ว</div>
        <div><span style={{fontSize:22,fontWeight:700,color:"var(--gold2)"}}>{totalAnnounced}</span><span style={{fontSize:12,color:"var(--muted)"}}> / {maxAnnounced} คะแนน</span></div>
      </div>
      {tip()&&<div style={{background:"rgba(251,191,36,.09)",border:"0.5px solid rgba(251,191,36,.35)",borderRadius:8,padding:"9px 14px",fontSize:12,color:"#fbbf24",marginTop:8}}>{tip()}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────
// STUDENT: DASHBOARD
// ─────────────────────────────────────────────
function StudentDashboard({student,students,assignments,setPage,setStudents}){
  const rank=getRank(student.xp);
  const submitted=Object.keys(student.submissions||{}).length;
  const [pwModal,setPwModal]=useState(false);
  const [oldPw,setOldPw]=useState("");const [newPw,setNewPw]=useState("");const [cnf,setCnf]=useState("");const [pwMsg,setPwMsg]=useState(null);
  function changePw(){
    if(oldPw!==student.password){setPwMsg({t:"err",text:"รหัสผ่านเดิมไม่ถูกต้อง"});return;}
    if(newPw.length<4){setPwMsg({t:"err",text:"รหัสผ่านใหม่ต้องมีอย่างน้อย 4 ตัว"});return;}
    if(newPw!==cnf){setPwMsg({t:"err",text:"รหัสผ่านใหม่ไม่ตรงกัน"});return;}
    setStudents(prev=>prev.map(s=>s.id===student.id?{...s,password:newPw}:s));
    setPwMsg({t:"ok",text:"เปลี่ยนรหัสผ่านสำเร็จ! ✅"});
    setTimeout(()=>{setPwModal(false);setPwMsg(null);setOldPw("");setNewPw("");setCnf("");},1500);
  }
  return(
    <div className="fade-up" style={{padding:20,maxWidth:1000,margin:"0 auto"}}>
      {pwModal&&(
        <div className="overlay">
          <div className="card card-gold" style={{width:"100%",maxWidth:420}}>
            <div className="cond" style={{fontSize:22,color:"var(--gold)",letterSpacing:2,marginBottom:20}}>🔐 เปลี่ยนรหัสผ่าน</div>
            {([["รหัสผ่านเดิม",oldPw,setOldPw],["รหัสผ่านใหม่",newPw,setNewPw],["ยืนยันรหัสผ่านใหม่",cnf,setCnf]] as [string,string,any][]).map(([l,v,s])=>(
              <div key={l} style={{marginBottom:14}}>
                <label className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:8}}>{l.toUpperCase()}</label>
                <input className="input" type="password" value={v} onChange={e=>s(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&changePw()}/>
              </div>
            ))}
            {pwMsg&&<div style={{background:pwMsg.t==="ok"?"rgba(94,200,126,.14)":"rgba(232,96,96,.14)",border:`1px solid ${pwMsg.t==="ok"?"rgba(94,200,126,.45)":"rgba(232,96,96,.45)"}`,borderRadius:5,padding:"9px 14px",color:pwMsg.t==="ok"?"var(--green)":"var(--red)",fontSize:13,marginBottom:12}}>{pwMsg.text}</div>}
            <div style={{display:"flex",gap:10}}>
              <button className="btn btn-gold" onClick={changePw} style={{flex:1}}>💾 บันทึก</button>
              <button className="btn-outline" onClick={()=>{setPwModal(false);setPwMsg(null);setOldPw("");setNewPw("");setCnf("");}} style={{flex:1}}>ยกเลิก</button>
            </div>
          </div>
        </div>
      )}
      <div className="card card-gold" style={{marginBottom:16,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-10,top:-10,fontSize:120,opacity:.05,userSelect:"none"}}>{student.avatar}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:20,alignItems:"center"}}>
          <div style={{fontSize:60}}>{student.avatar}</div>
          <div style={{flex:1,minWidth:180}}>
            <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:3,marginBottom:4}}>PLAYER PROFILE</div>
            <div className="cond" style={{fontSize:34,fontWeight:700,color:"#fff",lineHeight:1,marginBottom:10}}>{student.name}</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <span className="badge" style={{background:`${rank.color}20`,border:`1px solid ${rank.color}50`,color:rank.color}}>{rank.icon} {rank.label}</span>
              <span className="badge" style={{background:"rgba(94,200,126,.14)",border:"1px solid rgba(94,200,126,.4)",color:"var(--green)"}}>✓ {submitted}/{assignments.length} งาน</span>
            </div>
          </div>
          <GradeTag xp={student.xp} big={true}/>
        </div>
        <div style={{marginTop:20}}>
          <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,marginBottom:8}}>PROGRESS TO VICTORY</div>
          <ProgressFlag xp={student.xp}/>
          <div style={{marginTop:12}}><XPBar xp={student.xp}/></div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        <Top3Card students={students}/>
        <div>
          <div className="card" style={{marginBottom:10,textAlign:"center",padding:14}}>
            <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,marginBottom:6}}>YOUR XP</div>
            <div className="cond" style={{fontSize:48,fontWeight:900,color:rank.color,lineHeight:1}}>{student.xp.toLocaleString()}</div>
            <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>XP สะสมในเทอมนี้</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div className="card" style={{textAlign:"center",padding:12}}><div style={{fontSize:22,marginBottom:4}}>📋</div><div className="cond" style={{fontSize:28,fontWeight:700,color:"var(--cyan)"}}>{submitted}</div><div style={{fontSize:11,color:"var(--muted)"}}>ส่งแล้ว</div></div>
            <div className="card" style={{textAlign:"center",padding:12}}><div style={{fontSize:22,marginBottom:4}}>⏳</div><div className="cond" style={{fontSize:28,fontWeight:700,color:"var(--orange)"}}>{assignments.length-submitted}</div><div style={{fontSize:11,color:"var(--muted)"}}>ค้างส่ง</div></div>
          </div>
        </div>
      </div>
      <ScoreBreakdown student={student} assignments={assignments}/>
      {/* XP Activity Log */}
      {(student.xpLog||[]).length>0&&(
        <div className="card" style={{marginBottom:16}}>
          <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:3,marginBottom:14}}>⭐ ประวัติ XP ที่ได้รับ</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {[...(student.xpLog||[])].reverse().map((log,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",
                background:"rgba(232,188,85,.06)",border:"1px solid rgba(232,188,85,.2)",borderRadius:8}}>
                <div style={{fontSize:20}}>⭐</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:600,color:"var(--text)"}}>{log.activity}</div>
                  <div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>{log.date}</div>
                </div>
                <div className="mono" style={{fontSize:16,fontWeight:700,color:"var(--gold)"}}>+{log.xp} XP</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:12,padding:"10px 14px",background:"rgba(232,188,85,.08)",
            border:"1px solid rgba(232,188,85,.22)",borderRadius:8,
            display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:13,color:"var(--muted2)"}}>รวม XP จากกิจกรรมพิเศษ</span>
            <span className="mono" style={{fontSize:15,color:"var(--gold)",fontWeight:700}}>
              {(student.xpLog||[]).reduce((s,l)=>s+l.xp,0).toLocaleString()} XP
            </span>
          </div>
        </div>
      )}
      <GradeTable/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginTop:16}}>
        <button className="btn btn-cyan" onClick={()=>setPage("assignments")} style={{padding:14}}>📋 ดูงานทั้งหมด</button>
        <button className="btn-outline" onClick={()=>setPage("resources")} style={{padding:14}}>📚 เนื้อหา/สไลด์</button>
        <button className="btn-outline" onClick={()=>setPwModal(true)} style={{padding:14,borderColor:"rgba(232,188,85,.45)",color:"var(--gold)"}}>🔐 เปลี่ยนรหัสผ่าน</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STUDENT: ASSIGNMENTS
// ─────────────────────────────────────────────
function StudentAssignments({student,assignments,setStudents}){
  const [uploadModal,setUploadModal]=useState(null);
  const [driveLink,setDriveLink]=useState("");
  function openUpload(a){setUploadModal(a);setDriveLink("");}
  function submitWork(){
    if(!uploadModal)return;
    if(!driveLink.trim()){return;}
    const today=new Date().toLocaleDateString("th-TH",{day:"numeric",month:"short",year:"numeric"});
    // XP = 0 ก่อน จนกว่าครูจะตรวจและให้คะแนน
    setStudents(prev=>prev.map(s=>s.id===student.id?{...s,submissions:{...s.submissions,[uploadModal.id]:{file:driveLink,submittedAt:today,xpEarned:0,maxXp:uploadModal.xp,graded:false}}}:s));
    setUploadModal(null);
  }
  function removeSubmission(id){
    setStudents(prev=>prev.map(s=>{
      if(s.id!==student.id)return s;
      const sub=s.submissions[id];
      const{[id]:_,...rest}=s.submissions;
      // หักคะแนนเฉพาะที่ครูตรวจแล้วเท่านั้น
      return{...s,xp:s.xp-(sub?.graded?sub.xpEarned||0:0),submissions:rest};
    }));
  }
  function replaceFile(id){removeSubmission(id);const a=assignments.find(x=>x.id===id);if(a)setUploadModal(a);}
  return(
    <div className="fade-up" style={{padding:20,maxWidth:900,margin:"0 auto"}}>
      {uploadModal&&(
        <div className="overlay">
          <div className="card card-cyan" style={{width:"100%",maxWidth:480}}>
            <div className="cond" style={{fontSize:22,color:"var(--cyan)",letterSpacing:2,marginBottom:4}}>📎 ส่งงาน</div>
            <div style={{color:"var(--muted2)",fontSize:13,marginBottom:4}}>{uploadModal.title}</div>
            <div className="mono" style={{color:"var(--gold)",fontSize:13,marginBottom:20}}>+{uploadModal.xp} XP</div>
            <div style={{marginBottom:14}}>
              <label className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:8}}>🔗 ลิงก์ Google Drive</label>
              <input className="input" value={driveLink} onChange={e=>setDriveLink(e.target.value)}
                placeholder="https://drive.google.com/..."/>
              <div style={{fontSize:11,color:"var(--muted)",marginTop:6}}>
                💡 เปิด Drive → อัปโหลดไฟล์ → คลิกขวา → "Get link" → Copy มาวางที่นี่
              </div>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button className="btn btn-cyan" onClick={submitWork} disabled={!driveLink.trim()}
                style={{flex:1,opacity:driveLink.trim()?1:.4}}>✅ ส่งงาน (+{uploadModal.xp} XP)</button>
              <button className="btn-outline" onClick={()=>setUploadModal(null)} style={{flex:1}}>ยกเลิก</button>
            </div>
          </div>
        </div>
      )}
      <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:3,marginBottom:20}}>MISSION BOARD — {assignments.length} OBJECTIVES</div>
      {CHAPTERS.map(ch=>{
        const chA=assignments.filter(a=>a.chapterId===ch.id);if(!chA.length)return null;
        return(
          <div key={ch.id} style={{marginBottom:28}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12,paddingBottom:10,borderBottom:`1px solid ${ch.color}35`}}>
              <span style={{fontSize:24}}>{ch.icon}</span>
              <div><div className="mono" style={{fontSize:9,color:"var(--muted)",letterSpacing:2}}>{ch.label}</div><div className="cond" style={{fontSize:22,fontWeight:700,color:ch.color}}>{ch.title}</div></div>
            </div>
            {chA.map(a=>{
              const sub=student.submissions?.[a.id];const tm=TYPE_META[a.type]||{};
              return(
                <div key={a.id} className="card" style={{display:"flex",gap:16,alignItems:"center",marginBottom:8,borderColor:sub?`${ch.color}50`:"var(--border)",background:sub?`linear-gradient(135deg,var(--bg2),${ch.bg})`:"var(--bg2)"}}>
                  <div style={{fontSize:28,flexShrink:0}}>{tm.icon||"📄"}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",gap:8,marginBottom:6,flexWrap:"wrap"}}>
                      <span className="badge" style={{background:`${tm.color}20`,border:`1px solid ${tm.color}50`,color:tm.color}}>{tm.label}</span>
                      {sub?<span className="badge" style={{background:"rgba(94,200,126,.14)",border:"1px solid rgba(94,200,126,.4)",color:"var(--green)"}}>✓ ส่งแล้ว</span>
                         :<span className="badge" style={{background:"rgba(232,96,96,.1)",border:"1px solid rgba(232,96,96,.3)",color:"var(--red)"}}>⏳ ยังไม่ส่ง</span>}
                    </div>
                    <div style={{fontSize:14,fontWeight:600,color:"#fff",marginBottom:4}}>{a.title}</div>
                    <div style={{fontSize:12,color:"var(--muted)"}}>{a.desc} · ครบกำหนด {a.due}</div>
                    {sub&&<div style={{fontSize:12,marginTop:4}}>
                      <a href={sub.file} target="_blank" rel="noreferrer" style={{color:"var(--cyan)"}}>🔗 ดูไฟล์งาน</a>
                      <span style={{color:"var(--muted)"}}> · {sub.submittedAt}</span>
                      <span style={{marginLeft:8,color:sub.graded?"var(--gold)":"var(--muted)",fontFamily:"'Share Tech Mono',monospace",fontSize:11}}>
                        {sub.graded?`⭐ ${sub.xpEarned} / ${sub.maxXp||a.xp} XP`:"⏳ รอครูตรวจ"}
                      </span>
                    </div>}
                  </div>
                  <div style={{textAlign:"center",flexShrink:0}}><div className="mono" style={{fontSize:14,color:"var(--gold)",fontWeight:700}}>+{a.xp}</div><div style={{fontSize:10,color:"var(--muted)"}}>XP</div></div>
                  <div style={{display:"flex",flexDirection:"column",gap:6,flexShrink:0}}>
                    {!sub&&<button className="btn btn-cyan" onClick={()=>openUpload(a)} style={{padding:"8px 14px",fontSize:12}}>📎 แนบลิงก์</button>}
                    {sub&&<button className="btn-ghost" onClick={()=>replaceFile(a.id)} style={{fontSize:11}}>🔄 เปลี่ยน</button>}
                    {sub&&<button className="btn btn-red" onClick={()=>removeSubmission(a.id)} style={{padding:"6px 12px",fontSize:11}}>🗑 ลบ</button>}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// STUDENT: RESOURCES
// ─────────────────────────────────────────────
function StudentResources({resources}){
  const ti={pdf:"📄",ppt:"📊",doc:"📝",img:"🖼️",zip:"📦",link:"🔗"};
  return(
    <div className="fade-up" style={{padding:20,maxWidth:900,margin:"0 auto"}}>
      <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:3,marginBottom:20}}>📚 เนื้อหาและสไลด์</div>
      {CHAPTERS.map(ch=>{const chR=resources.filter(r=>r.chapterId===ch.id);return(
        <div key={ch.id} style={{marginBottom:24}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,paddingBottom:8,borderBottom:`1px solid ${ch.color}35`}}>
            <span style={{fontSize:20}}>{ch.icon}</span>
            <div className="cond" style={{fontSize:20,fontWeight:700,color:ch.color}}>{ch.title}</div>
            <span className="badge" style={{background:`${ch.color}20`,border:`1px solid ${ch.color}50`,color:ch.color}}>{chR.length} ไฟล์</span>
          </div>
          {chR.length===0&&<div style={{color:"var(--muted)",fontSize:13,padding:"10px 0"}}>ยังไม่มีไฟล์ในบทนี้</div>}
          {chR.map(r=>(
            <div key={r.id} className="card card-hover" style={{display:"flex",alignItems:"center",gap:14,marginBottom:8,borderColor:`${ch.color}25`}}>
              <div style={{fontSize:28}}>{ti[r.type]||"📄"}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:600,color:"#fff"}}>{r.title}</div>
                <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>{r.uploadedAt}</div>
              </div>
              {r.link
                ?<a href={r.link} target="_blank" rel="noreferrer" className="btn btn-cyan" style={{padding:"8px 18px",fontSize:13,textDecoration:"none"}}>📂 เปิดไฟล์</a>
                :<span style={{fontSize:12,color:"var(--muted)"}}>ไม่มีลิงก์</span>
              }
            </div>
          ))}
        </div>
      );})}
    </div>
  );
}

// ─────────────────────────────────────────────
// STUDENT: RANKING — เห็นแค่ TOP 3
// ─────────────────────────────────────────────
function RankingPage({students,myId,isTeacher=false}){
  const sorted=[...students].sort((a,b)=>b.xp-a.xp);
  const medals=["🥇","🥈","🥉"],mc=["#f5cc70","#c8c8c8","#cd7f32"];
  const myRank=sorted.findIndex(s=>s.id===myId)+1;
  const mySelf=sorted.find(s=>s.id===myId);

  // นักเรียนเห็นแค่ top3 + ตัวเอง
  if(!isTeacher){
    const top3=sorted.slice(0,3);
    return(
      <div className="fade-up" style={{padding:20,maxWidth:700,margin:"0 auto"}}>
        <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:3,marginBottom:20}}>🏆 TOP 3 LEADERBOARD</div>
        {top3.map((s,i)=>{const r=getRank(s.xp);const isMe=s.id===myId;return(
          <div key={s.id} className="card slide-r" style={{display:"flex",alignItems:"center",gap:16,marginBottom:12,
            borderColor:isMe?"rgba(232,188,85,.6)":i===0?"rgba(232,188,85,.28)":"var(--border)",
            background:isMe?"rgba(232,188,85,.07)":"var(--bg2)",animationDelay:`${i*.1}s`,
            boxShadow:i===0?"0 0 24px rgba(232,188,85,.12)":"none"}}>
            <div style={{width:54,textAlign:"center"}}><span style={{fontSize:34}}>{medals[i]}</span></div>
            <div style={{fontSize:40}}>{s.avatar}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6,flexWrap:"wrap"}}>
                <span style={{fontSize:16,fontWeight:600,color:isMe?"var(--gold)":"#fff"}}>{s.name}</span>
                {isMe&&<span className="badge" style={{background:"rgba(232,188,85,.18)",border:"1px solid rgba(232,188,85,.45)",color:"var(--gold)"}}>YOU</span>}
              </div>
              <div style={{maxWidth:280}}><XPBar xp={s.xp} showLabel={false}/></div>
            </div>
            <div style={{textAlign:"center"}}>
              <div className="cond" style={{fontSize:34,fontWeight:900,color:mc[i]}}>{s.xp.toLocaleString()}</div>
              <div style={{fontSize:10,color:"var(--muted)"}}>XP</div>
              <GradeTag xp={s.xp}/>
            </div>
          </div>
        );})}

        {/* ถ้าตัวเองไม่ได้ top3 แสดงอันดับตัวเอง */}
        {myId&&myRank>3&&mySelf&&(
          <div style={{marginTop:16}}>
            <div style={{height:1,background:"var(--border)",marginBottom:16}}/>
            <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,marginBottom:10}}>อันดับของคุณ</div>
            <div className="card" style={{display:"flex",alignItems:"center",gap:16,
              borderColor:"rgba(232,188,85,.5)",background:"rgba(232,188,85,.06)"}}>
              <div style={{width:54,textAlign:"center"}}>
                <span className="mono" style={{fontSize:24,color:"var(--muted)"}}>#{myRank}</span>
              </div>
              <div style={{fontSize:40}}>{mySelf.avatar}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:16,fontWeight:600,color:"var(--gold)",marginBottom:6}}>{mySelf.name}</div>
                <div style={{maxWidth:280}}><XPBar xp={mySelf.xp} showLabel={false}/></div>
              </div>
              <div style={{textAlign:"center"}}>
                <div className="cond" style={{fontSize:32,fontWeight:900,color:"var(--gold)"}}>{mySelf.xp.toLocaleString()}</div>
                <div style={{fontSize:10,color:"var(--muted)"}}>XP</div>
                <GradeTag xp={mySelf.xp}/>
              </div>
            </div>
            <div style={{textAlign:"center",marginTop:12,fontSize:13,color:"var(--muted)"}}>
              ห่างจากอันดับ 3 อีก <span style={{color:"var(--gold)",fontWeight:700}}>{(sorted[2]?.xp||0)-mySelf.xp} XP</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ครูเห็นทั้งหมด
  return(
    <div className="fade-up" style={{padding:20,maxWidth:900,margin:"0 auto"}}>
      <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:3,marginBottom:20}}>FULL LEADERBOARD</div>
      {sorted.map((s,i)=>{const r=getRank(s.xp);return(
        <div key={s.id} className="card slide-r" style={{display:"flex",alignItems:"center",gap:16,marginBottom:10,
          borderColor:i===0?"rgba(232,188,85,.28)":"var(--border)",animationDelay:`${i*.04}s`}}>
          <div style={{width:44,textAlign:"center"}}>{i<3?<span style={{fontSize:26}}>{medals[i]}</span>:<span className="mono" style={{fontSize:20,color:"var(--muted)"}}>#{i+1}</span>}</div>
          <div style={{fontSize:36}}>{s.avatar}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:15,fontWeight:600,color:"#fff",marginBottom:6}}>{s.name}</div>
            <div style={{maxWidth:300}}><XPBar xp={s.xp} showLabel={false}/></div>
          </div>
          <div style={{textAlign:"center"}}>
            <div className="cond" style={{fontSize:32,fontWeight:900,color:r.color}}>{s.xp.toLocaleString()}</div>
            <div style={{fontSize:10,color:"var(--muted)"}}>XP</div>
            <GradeTag xp={s.xp}/>
          </div>
        </div>
      );})}
    </div>
  );
}

// ─────────────────────────────────────────────
// STUDENT: INVENTORY
// ─────────────────────────────────────────────
function StudentInventory({student}){
  const rb={LEGENDARY:"rgba(240,192,96,.1)",EPIC:"rgba(155,127,232,.1)",RARE:"rgba(78,202,174,.1)",UNCOMMON:"rgba(125,232,160,.07)",CUSTOM:"rgba(232,140,74,.1)",COMMON:"rgba(100,100,100,.07)"};
  return(
    <div className="fade-up" style={{padding:20,maxWidth:900,margin:"0 auto"}}>
      <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:3,marginBottom:20}}>AIRDROP INVENTORY — {student.inventory.length} ITEMS</div>
      {student.inventory.length===0
        ?<div className="card" style={{textAlign:"center",padding:60}}><div style={{fontSize:48,marginBottom:12}}>📦</div><div className="cond" style={{fontSize:20,color:"var(--muted)"}}>ยังไม่มีรางวัล</div><div style={{fontSize:13,color:"var(--muted)",marginTop:8}}>รอครูส่ง Airdrop!</div></div>
        :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:16}}>
          {student.inventory.map((item,idx)=>(
            <div key={idx} className="card" style={{textAlign:"center",borderColor:`${item.color}50`,background:rb[item.rarity]}}>
              <div style={{fontSize:52,marginBottom:10,filter:`drop-shadow(0 0 16px ${item.color}70)`}}>{item.icon}</div>
              <div style={{color:item.color,fontWeight:600,fontSize:14,marginBottom:6}}>{item.name}</div>
              <div className="badge" style={{background:`${item.color}20`,border:`1px solid ${item.color}50`,color:item.color,marginBottom:10}}>★ {item.rarity}</div>
              {item.note&&<div style={{fontSize:12,color:"var(--muted2)",fontStyle:"italic",marginTop:4}}>"{item.note}"</div>}
              <div className="mono" style={{fontSize:10,color:"var(--muted)",marginTop:8}}>{item.receivedAt}</div>
            </div>
          ))}
        </div>}
    </div>
  );
}

// ─────────────────────────────────────────────
// STUDENT: SETTINGS
// ─────────────────────────────────────────────
function StudentSettings({student,setStudents}){
  const [oldPw,setOldPw]=useState("");const [newPw,setNewPw]=useState("");const [cnf,setCnf]=useState("");const [msg,setMsg]=useState(null);
  function change(){
    if(oldPw!==student.password){setMsg({t:"err",text:"รหัสผ่านเดิมไม่ถูกต้อง"});return;}
    if(newPw.length<4){setMsg({t:"err",text:"รหัสผ่านใหม่ต้องมีอย่างน้อย 4 ตัว"});return;}
    if(newPw!==cnf){setMsg({t:"err",text:"รหัสผ่านใหม่ไม่ตรงกัน"});return;}
    setStudents(prev=>prev.map(s=>s.id===student.id?{...s,password:newPw}:s));
    setMsg({t:"ok",text:"เปลี่ยนรหัสผ่านสำเร็จ! ✅"});setOldPw("");setNewPw("");setCnf("");
  }
  return(
    <div className="fade-up" style={{padding:20,maxWidth:480,margin:"0 auto"}}>
      <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:3,marginBottom:20}}>ACCOUNT SETTINGS</div>
      <div className="card">
        <div className="cond" style={{fontSize:20,color:"var(--gold)",letterSpacing:2,marginBottom:20}}>🔐 เปลี่ยนรหัสผ่าน</div>
        {([["รหัสผ่านเดิม",oldPw,setOldPw],["รหัสผ่านใหม่",newPw,setNewPw],["ยืนยันรหัสผ่านใหม่",cnf,setCnf]] as [string,string,any][]).map(([l,v,s])=>(
          <div key={l} style={{marginBottom:14}}><label className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:8}}>{l.toUpperCase()}</label><input className="input" type="password" value={v} onChange={e=>s(e.target.value)} placeholder="••••••••"/></div>
        ))}
        {msg&&<div style={{background:msg.t==="ok"?"rgba(94,200,126,.14)":"rgba(232,96,96,.14)",border:`1px solid ${msg.t==="ok"?"rgba(94,200,126,.45)":"rgba(232,96,96,.45)"}`,borderRadius:5,padding:"9px 14px",color:msg.t==="ok"?"var(--green)":"var(--red)",fontSize:13,marginBottom:12}}>{msg.text}</div>}
        <button className="btn btn-gold" onClick={change} style={{width:"100%"}}>💾 บันทึกรหัสผ่านใหม่</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TEACHER: EXAM SCORES
// ─────────────────────────────────────────────
function TeacherExamScores({students,setStudents}){
  const [midScores,setMidScores]=useState(()=>{const m={};students.forEach(s=>{m[s.id]=s.midterm!==null&&s.midterm!==undefined?String(s.midterm):"";});return m;});
  const [finalScores,setFinalScores]=useState(()=>{const m={};students.forEach(s=>{m[s.id]=s.final!==null&&s.final!==undefined?String(s.final):"";});return m;});
  const [saved,setSaved]=useState(false);
  function saveAll(){
    setStudents(prev=>prev.map(s=>({...s,
      midterm:midScores[s.id]!==""?Number(midScores[s.id]):null,
      final:finalScores[s.id]!==""?Number(finalScores[s.id]):null,
    })));
    setSaved(true);setTimeout(()=>setSaved(false),3000);
  }
  return(
    <div className="fade-up" style={{padding:20,maxWidth:800,margin:"0 auto"}}>
      <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:3,marginBottom:20}}>📝 ประกาศคะแนนสอบ</div>
      {saved&&<div style={{background:"rgba(94,200,126,.14)",border:"1px solid rgba(94,200,126,.4)",borderRadius:8,padding:"12px 18px",color:"var(--green)",fontSize:14,marginBottom:16,textAlign:"center"}}>✅ บันทึกแล้ว — คะแนนแสดงในหน้านักเรียนทันที!</div>}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        <div className="card" style={{borderColor:"rgba(147,197,253,.55)"}}>
          <div className="cond" style={{fontSize:18,color:"#93c5fd",letterSpacing:2,marginBottom:4}}>🔵 สอบกลางภาค</div>
          <div className="mono" style={{fontSize:10,color:"var(--muted)",marginBottom:14}}>คะแนนเต็ม 15 คะแนน</div>
          {students.map(s=>(
            <div key={s.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
              <span style={{fontSize:20,flexShrink:0}}>{s.avatar}</span>
              <span style={{flex:1,fontSize:13,color:"var(--text)"}}>{s.name}</span>
              <input type="number" min="0" max="15" value={midScores[s.id]||""} placeholder="—"
                onChange={e=>setMidScores(p=>({...p,[s.id]:e.target.value}))}
                style={{width:60,background:"rgba(14,26,43,.8)",border:"1px solid var(--border2)",color:"#93c5fd",borderRadius:5,padding:"6px 8px",fontFamily:"'Share Tech Mono',monospace",fontSize:15,textAlign:"center",outline:"none"}}/>
              <span style={{fontSize:11,color:"var(--muted)",flexShrink:0}}>/15</span>
            </div>
          ))}
        </div>
        <div className="card" style={{borderColor:"rgba(253,230,138,.55)"}}>
          <div className="cond" style={{fontSize:18,color:"#fde68a",letterSpacing:2,marginBottom:4}}>🟡 สอบปลายภาค</div>
          <div className="mono" style={{fontSize:10,color:"var(--muted)",marginBottom:14}}>คะแนนเต็ม 15 คะแนน</div>
          {students.map(s=>(
            <div key={s.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
              <span style={{fontSize:20,flexShrink:0}}>{s.avatar}</span>
              <span style={{flex:1,fontSize:13,color:"var(--text)"}}>{s.name}</span>
              <input type="number" min="0" max="15" value={finalScores[s.id]||""} placeholder="—"
                onChange={e=>setFinalScores(p=>({...p,[s.id]:e.target.value}))}
                style={{width:60,background:"rgba(14,26,43,.8)",border:"1px solid var(--border2)",color:"#fde68a",borderRadius:5,padding:"6px 8px",fontFamily:"'Share Tech Mono',monospace",fontSize:15,textAlign:"center",outline:"none"}}/>
              <span style={{fontSize:11,color:"var(--muted)",flexShrink:0}}>/15</span>
            </div>
          ))}
        </div>
      </div>
      <button className="btn btn-gold" onClick={saveAll} style={{width:"100%",padding:16,fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
        💾 บันทึกและประกาศคะแนน
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// GRADE CHART
// ─────────────────────────────────────────────
function useChartJS(){
  useEffect(()=>{
    if(typeof Chart!=="undefined")return;
    const s=document.createElement("script");
    s.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
    document.head.appendChild(s);
  },[]);
}

function GradeChart({students}){
  useChartJS();
  const chartRef=useRef<any>(null),pieRef=useRef(null);
  const barInst=useRef<any>(null),pieInst=useRef(null);
  const gradeMap={"4":0,"3.5":0,"3":0,"2.5":0,"2":0,"1.5":0,"1":0,"0":0};
  students.forEach(s=>{const r=getRank(s.xp);if(r.grade in gradeMap)gradeMap[r.grade]++;});
  const labels=Object.keys(gradeMap),data=Object.values(gradeMap);
  const colors=["#a78bfa","#818cf8","#60a5fa","#f472b6","#34d399","#fbbf24","#fb923c","#f87171"];
  const total=students.length;
  const passing=students.filter(s=>getRank(s.xp).grade!=="0").length;
  useEffect(()=>{
    if(typeof Chart==="undefined"||!chartRef.current)return;
    if(barInst.current)barInst.current.destroy();
    if(pieInst.current)pieInst.current.destroy();
    Chart.defaults.color="#9aacbf";
    barInst.current=new Chart(chartRef.current,{
      type:"bar",data:{labels,datasets:[{label:"จำนวน",data,backgroundColor:colors,borderRadius:6}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},
        scales:{y:{beginAtZero:true,ticks:{stepSize:1},grid:{color:"rgba(232,188,85,.08)"}},x:{grid:{display:false}}}}
    });
    const nz=labels.map((l,i)=>({l,d:data[i],c:colors[i]})).filter(x=>x.d>0);
    pieInst.current=new Chart(pieRef.current,{
      type:"doughnut",data:{labels:nz.map(x=>"เกรด "+x.l),datasets:[{data:nz.map(x=>x.d),backgroundColor:nz.map(x=>x.c),borderWidth:3,borderColor:"rgba(10,20,38,.9)"}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}}}
    });
  },[students]);
  return(
    <div className="card card-gold" style={{marginBottom:16}}>
      <div className="cond" style={{fontSize:20,color:"var(--gold2)",letterSpacing:2,marginBottom:12}}>📊 สรุปผลการเรียนทั้งห้อง</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
        {[{label:"นักเรียน",val:total,color:"var(--cyan)"},{label:"ผ่านเกณฑ์",val:passing,color:"var(--green)"},{label:"ไม่ผ่าน",val:total-passing,color:"var(--red)"}].map((s,i)=>(
          <div key={i} className="card" style={{textAlign:"center",padding:12,borderColor:`${s.color}38`}}>
            <div style={{fontSize:22,fontWeight:700,color:s.color}}>{s.val}</div>
            <div style={{fontSize:11,color:"var(--muted)",marginTop:3}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
        <div style={{position:"relative",height:200}}><canvas ref={chartRef}/></div>
        <div style={{position:"relative",height:200}}><canvas ref={pieRef}/></div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TEACHER: OVERVIEW
// ─────────────────────────────────────────────
function TeacherOverview({students,assignments,setPage}){
  const avgXP=Math.round(students.reduce((a,s)=>a+s.xp,0)/students.length);
  const passing=students.filter(s=>parseFloat(getRank(s.xp).grade)>0).length;
  return(
    <div className="fade-up" style={{padding:20,maxWidth:1000,margin:"0 auto"}}>
      <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:3,marginBottom:16}}>COMMANDER OVERVIEW</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:12,marginBottom:20}}>
        {[{icon:"👥",label:"นักเรียน",val:students.length,color:"var(--cyan)"},{icon:"✅",label:"ผ่านเกณฑ์",val:passing,color:"var(--green)"},{icon:"❌",label:"ไม่ผ่าน",val:students.length-passing,color:"var(--red)"},{icon:"⭐",label:"XP เฉลี่ย",val:avgXP.toLocaleString(),color:"var(--gold)"},{icon:"📋",label:"งาน",val:assignments.length,color:"var(--purple)"}].map((s,i)=>(
          <div key={i} className="card" style={{textAlign:"center",borderColor:`${s.color}38`}}>
            <div style={{fontSize:24,marginBottom:4}}>{s.icon}</div>
            <div className="cond" style={{fontSize:34,fontWeight:900,color:s.color}}>{s.val}</div>
            <div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
        {[
          {page:"t-assignments",icon:"📋",title:"เพิ่ม / จัดการงาน",color:"var(--cyan)",btn:"➕ เพิ่มงานใหม่"},
          {page:"t-resources",  icon:"📁",title:"อัปโหลดไฟล์ความรู้",color:"var(--gold)",btn:"⬆ อัปโหลดไฟล์"},
          {page:"t-scores",     icon:"⭐",title:"จัดการ XP / คะแนน",color:"#82e0aa",btn:"✏️ แก้ไข XP"},
          {page:"t-airdrop",    icon:"📦",title:"ส่ง Airdrop รางวัล",color:"var(--purple)",btn:"🎲 Roll Airdrop"},
        ].map(a=>(
          <div key={a.page} className="card card-hover" onClick={()=>setPage(a.page)}
            style={{borderColor:`${a.color}38`}}>
            <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:36}}>{a.icon}</div>
              <div className="cond" style={{fontSize:20,fontWeight:700,color:a.color}}>{a.title}</div>
            </div>
            <button className="btn btn-cyan" style={{width:"100%",padding:10,fontSize:14,
              background:`linear-gradient(135deg,${a.color}22,${a.color}44)`,
              border:`1px solid ${a.color}66`,color:a.color}}
              onClick={e=>{e.stopPropagation();setPage(a.page);}}>
              {a.btn}
            </button>
          </div>
        ))}
      </div>
      <GradeChart students={students}/>
      <Top3Card students={students}/>
    </div>
  );
}

// ─────────────────────────────────────────────
// TEACHER: STUDENTS
// ─────────────────────────────────────────────
function TeacherStudents({students,assignments}){
  const [sel,setSel]=useState(null);
  const s=sel?students.find(x=>x.id===sel):null;
  if(s)return(
    <div className="fade-up" style={{padding:20,maxWidth:900,margin:"0 auto"}}>
      <button className="btn-outline" onClick={()=>setSel(null)} style={{marginBottom:20}}>← กลับ</button>
      <div className="card card-gold" style={{marginBottom:16}}>
        <div style={{display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{fontSize:52}}>{s.avatar}</div>
          <div style={{flex:1}}><div className="cond" style={{fontSize:28,fontWeight:700,color:"#fff"}}>{s.name}</div></div>
          <GradeTag xp={s.xp} big={true}/>
        </div>
        <div style={{marginTop:16}}><XPBar xp={s.xp}/></div>
        <div style={{marginTop:10}}><ProgressFlag xp={s.xp}/></div>
      </div>
      <div className="card">
        <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,marginBottom:14}}>SUBMISSION STATUS</div>
        {assignments.map(a=>{const sub=s.submissions?.[a.id];const tm=TYPE_META[a.type]||{};return(
          <div key={a.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid var(--border)"}}>
            <span>{tm.icon||"📄"}</span><span style={{flex:1,fontSize:13}}>{a.title}</span>
            <span className="mono" style={{fontSize:11,color:"var(--gold)"}}>+{a.xp} XP</span>
            {sub?<>
              <a href={sub.file} target="_blank" rel="noreferrer" style={{fontSize:11,color:"var(--cyan)"}}>🔗 ดูงาน</a>
              <span className="badge" style={{background:"rgba(94,200,126,.12)",border:"1px solid rgba(94,200,126,.35)",color:"var(--green)"}}>✓ ส่งแล้ว</span>
            </>:<span className="badge" style={{background:"rgba(232,96,96,.1)",border:"1px solid rgba(232,96,96,.25)",color:"var(--red)"}}>⏳ ยังไม่ส่ง</span>}
          </div>
        );})}
      </div>
    </div>
  );
  return(
    <div className="fade-up" style={{padding:20,maxWidth:900,margin:"0 auto"}}>
      <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:3,marginBottom:20}}>PLAYER ROSTER</div>
      {[...students].sort((a,b)=>b.xp-a.xp).map((s,i)=>{const r=getRank(s.xp);return(
        <div key={s.id} className="card card-hover slide-r" onClick={()=>setSel(s.id)} style={{display:"flex",alignItems:"center",gap:16,marginBottom:10,animationDelay:`${i*.04}s`}}>
          <div style={{fontSize:40}}>{s.avatar}</div>
          <div style={{flex:1}}><div style={{fontSize:15,fontWeight:600,color:"#fff",marginBottom:6}}>{s.name}</div><div style={{maxWidth:280}}><XPBar xp={s.xp} showLabel={false}/></div></div>
          <div className="mono" style={{fontSize:20,color:r.color}}>{s.xp.toLocaleString()}</div>
          <GradeTag xp={s.xp}/>
          <div style={{color:"var(--muted)"}}>›</div>
        </div>
      );})}
    </div>
  );
}

// ─────────────────────────────────────────────
// TEACHER: ASSIGNMENTS
// ─────────────────────────────────────────────
function TeacherAssignments({assignments,setAssignments,students,setStudents}){
  const [modal,setModal]=useState(false);
  const [form,setForm]=useState({chapterId:"CH1",title:"",xp:200,due:"",desc:"",type:"worksheet"});
  const [checkModal,setCheckModal]=useState(null);
  const [editXp,setEditXp]=useState({});

  function save(){
    if(!form.title.trim())return;
    const today=new Date().toLocaleDateString("th-TH",{day:"numeric",month:"short",year:"numeric"});
    setAssignments(prev=>[...prev,{...form,id:"A"+Date.now(),xp:Number(form.xp),createdAt:today}]);
    setModal(false);setForm({chapterId:"CH1",title:"",xp:200,due:"",desc:"",type:"worksheet"});
  }
  function del(id){if(window.confirm("ลบงานนี้?"))setAssignments(prev=>prev.filter(a=>a.id!==id));}

  function openCheck(a){
    setCheckModal(a);
    const init={};
    students.forEach(s=>{const sub=s.submissions?.[a.id];init[s.id]=sub?.xpEarned??a.xp;});
    setEditXp(init);
  }

  function saveXp(studentId){
    const a=checkModal;
    const newXp=Number(editXp[studentId]||0);
    setStudents(prev=>prev.map(s=>{
      if(s.id!==studentId)return s;
      const sub=s.submissions?.[a.id];
      if(!sub)return s;
      const wasGraded=sub.graded||false;
      const oldXp=wasGraded?(sub.xpEarned||0):0;
      const diff=newXp-oldXp;
      return{...s,xp:s.xp+diff,submissions:{...s.submissions,[a.id]:{...sub,xpEarned:newXp,graded:true,maxXp:sub.maxXp||a.xp}}};
    }));
  }

  const submitted=checkModal?students.filter(s=>s.submissions?.[checkModal.id]):[];
  const notSubmitted=checkModal?students.filter(s=>!s.submissions?.[checkModal.id]):[];

  return(
    <div className="fade-up" style={{padding:20,maxWidth:900,margin:"0 auto"}}>
      {modal&&(
        <div className="overlay">
          <div className="card card-gold" style={{width:"100%",maxWidth:500}}>
            <div className="cond" style={{fontSize:24,color:"var(--gold)",letterSpacing:2,marginBottom:20}}>➕ เพิ่มงาน / ภารกิจ</div>
            {[["ชื่องาน","title","text"],["XP รางวัล","xp","number"],["วันครบกำหนด","due","text"],["รายละเอียด","desc","text"]].map(([l,k,t])=>(
              <div key={k} style={{marginBottom:14}}>
                <label className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:7}}>{l.toUpperCase()}</label>
                <input className="input" type={t} value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} placeholder={l}/>
              </div>
            ))}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
              <div><label className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:7}}>บทเรียน</label>
                <select className="input" value={form.chapterId} onChange={e=>setForm(p=>({...p,chapterId:e.target.value}))}>
                  {CHAPTERS.map(c=><option key={c.id} value={c.id}>{c.icon} {c.title}</option>)}
                </select>
              </div>
              <div><label className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:7}}>ประเภทงาน</label>
                <select className="input" value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))}>
                  {Object.entries(TYPE_META).map(([k,v])=><option key={k} value={k}>{v.icon} {v.label}</option>)}
                </select>
              </div>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button className="btn btn-gold" onClick={save} style={{flex:1,fontSize:16,padding:13}}>💾 บันทึก</button>
              <button className="btn-outline" onClick={()=>setModal(false)} style={{flex:1}}>ยกเลิก</button>
            </div>
          </div>
        </div>
      )}

      {checkModal&&(
        <div className="overlay">
          <div className="card" style={{width:"100%",maxWidth:580,maxHeight:"85vh",overflowY:"auto",
            borderColor:"rgba(78,202,174,.4)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
              <div>
                <div className="mono" style={{fontSize:9,color:"var(--muted)",letterSpacing:2,marginBottom:4}}>ตรวจงาน</div>
                <div className="cond" style={{fontSize:20,fontWeight:700,color:"#fff"}}>{checkModal.title}</div>
                <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap"}}>
                  <span className="badge" style={{background:"rgba(94,200,126,.14)",border:"1px solid rgba(94,200,126,.4)",color:"var(--green)"}}>✓ ส่งแล้ว {submitted.length} คน</span>
                  <span className="badge" style={{background:"rgba(232,96,96,.1)",border:"1px solid rgba(232,96,96,.28)",color:"var(--red)"}}>⏳ ยังไม่ส่ง {notSubmitted.length} คน</span>
                </div>
              </div>
              <button className="btn-outline" onClick={()=>setCheckModal(null)} style={{padding:"7px 14px"}}>✕</button>
            </div>
            {submitted.map(s=>{
              const sub=s.submissions[checkModal.id];
              return(
                <div key={s.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",marginBottom:8,
                  background:"rgba(94,200,126,.06)",border:"1px solid rgba(94,200,126,.22)",borderRadius:8}}>
                  <span style={{fontSize:26,flexShrink:0}}>{s.avatar}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{s.name}</div>
                    <a href={sub.file} target="_blank" rel="noreferrer" style={{fontSize:11,color:"var(--cyan)",marginTop:2,display:"block"}}>🔗 ดูงาน · {sub.submittedAt}</a>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                    <div>
                      <div className="mono" style={{fontSize:9,color:"var(--muted)",marginBottom:4}}>XP ที่ได้</div>
                      <input type="number" value={editXp[s.id]??sub.xpEarned} min={0} max={checkModal.xp*2}
                        onChange={e=>setEditXp(p=>({...p,[s.id]:e.target.value}))}
                        style={{width:72,background:"rgba(14,26,43,.8)",border:"1px solid var(--border2)",
                          color:"var(--gold)",borderRadius:5,padding:"6px 8px",
                          fontFamily:"'Share Tech Mono',monospace",fontSize:15,textAlign:"center",outline:"none"}}/>
                    </div>
                    <button className="btn btn-cyan" onClick={()=>saveXp(s.id)} style={{padding:"8px 14px",fontSize:12}}>💾</button>
                  </div>
                </div>
              );
            })}
            {notSubmitted.map(s=>(
              <div key={s.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",marginBottom:6,
                background:"rgba(232,96,96,.04)",border:"1px solid rgba(232,96,96,.18)",borderRadius:8,opacity:.7}}>
                <span style={{fontSize:24}}>{s.avatar}</span>
                <span style={{fontSize:13,color:"var(--muted2)"}}>{s.name}</span>
                <div style={{flex:1}}/>
                <span className="badge" style={{background:"rgba(232,96,96,.1)",border:"1px solid rgba(232,96,96,.25)",color:"var(--red)"}}>ยังไม่ส่ง</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:3}}>MISSION CONTROL</div>
          <div className="cond" style={{fontSize:22,color:"var(--text)",marginTop:2}}>{assignments.length} งาน</div>
        </div>
        <button className="btn btn-gold" onClick={()=>setModal(true)} style={{fontSize:16,padding:"12px 28px"}}>➕ เพิ่มงานใหม่</button>
      </div>

      {CHAPTERS.map(ch=>{
        const chA=assignments.filter(a=>a.chapterId===ch.id);
        return(
          <div key={ch.id} style={{marginBottom:24}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,paddingBottom:8,borderBottom:`1px solid ${ch.color}35`}}>
              <span style={{fontSize:20}}>{ch.icon}</span>
              <div className="cond" style={{fontSize:20,fontWeight:700,color:ch.color}}>{ch.title}</div>
              <span className="badge" style={{background:`${ch.color}20`,border:`1px solid ${ch.color}50`,color:ch.color}}>{chA.length} งาน</span>
            </div>
            {chA.length===0&&<div style={{color:"var(--muted)",fontSize:13,padding:"8px 0"}}>ยังไม่มีงาน</div>}
            {chA.map(a=>{
              const tm=TYPE_META[a.type]||{};
              const submittedCount=students.filter(s=>s.submissions?.[a.id]).length;
              return(
                <div key={a.id} className="card" style={{display:"flex",alignItems:"center",gap:14,marginBottom:8,borderColor:`${ch.color}25`}}>
                  <div style={{fontSize:24,flexShrink:0}}>{tm.icon||"📄"}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:600,color:"#fff"}}>{a.title}</div>
                    <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>{a.desc} · {a.due}</div>
                    <div style={{display:"flex",gap:6,marginTop:6}}>
                      <span className="badge" style={{background:"rgba(94,200,126,.12)",border:"1px solid rgba(94,200,126,.35)",color:"var(--green)"}}>✓ {submittedCount}/{students.length} คน</span>
                      {submittedCount<students.length&&<span className="badge" style={{background:"rgba(232,96,96,.1)",border:"1px solid rgba(232,96,96,.25)",color:"var(--red)"}}>⏳ ค้าง {students.length-submittedCount}</span>}
                    </div>
                  </div>
                  <div className="mono" style={{color:"var(--gold)",fontSize:13,flexShrink:0}}>+{a.xp} XP</div>
                  <button className="btn btn-cyan" onClick={()=>openCheck(a)} style={{padding:"8px 16px",fontSize:13,flexShrink:0}}>👁 ตรวจ</button>
                  <button className="btn btn-red" onClick={()=>del(a.id)} style={{padding:"7px 12px",fontSize:13,flexShrink:0}}>🗑</button>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// TEACHER: RESOURCES
// ─────────────────────────────────────────────
function TeacherResources({resources,setResources}){
  const [modal,setModal]=useState(false);
  const [form,setForm]=useState({chapterId:"CH1",title:"",type:"pdf",link:""});
  function save(){
    if(!form.title.trim())return;
    const today=new Date().toLocaleDateString("th-TH",{day:"numeric",month:"short",year:"numeric"});
    setResources(prev=>[...prev,{...form,id:"R"+Date.now(),uploadedAt:today}]);
    setModal(false);setForm({chapterId:"CH1",title:"",type:"pdf",link:""});
  }
  function del(id){if(window.confirm("ลบไฟล์นี้?"))setResources(prev=>prev.filter(r=>r.id!==id));}
  const ti={pdf:"📄",ppt:"📊",doc:"📝",img:"🖼️",zip:"📦",link:"🔗"};
  return(
    <div className="fade-up" style={{padding:20,maxWidth:900,margin:"0 auto"}}>
      {modal&&(
        <div className="overlay">
          <div className="card card-gold" style={{width:"100%",maxWidth:480}}>
            <div className="cond" style={{fontSize:24,color:"var(--gold)",letterSpacing:2,marginBottom:20}}>📁 เพิ่มไฟล์ความรู้</div>
            <div style={{marginBottom:14}}>
              <label className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:7}}>บทเรียน</label>
              <select className="input" value={form.chapterId} onChange={e=>setForm(p=>({...p,chapterId:e.target.value}))}>
                {CHAPTERS.map(c=><option key={c.id} value={c.id}>{c.icon} {c.title}</option>)}
              </select>
            </div>
            <div style={{marginBottom:14}}>
              <label className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:7}}>ชื่อไฟล์ / สไลด์</label>
              <input className="input" value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="เช่น สไลด์บทที่ 1"/>
            </div>
            <div style={{marginBottom:14}}>
              <label className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:7}}>ประเภท</label>
              <select className="input" value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))}>
                {Object.entries(ti).map(([k,v])=><option key={k} value={k}>{v} {k.toUpperCase()}</option>)}
              </select>
            </div>
            <div style={{marginBottom:20}}>
              <label className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:7}}>🔗 Google Drive Link</label>
              <input className="input" value={form.link} onChange={e=>setForm(p=>({...p,link:e.target.value}))} placeholder="https://drive.google.com/..."/>
              <div style={{fontSize:11,color:"var(--muted)",marginTop:5}}>💡 Drive → คลิกขวาไฟล์ → "Get link" → วางที่นี่</div>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button className="btn btn-gold" onClick={save} style={{flex:1,fontSize:15,padding:13}}>✅ บันทึก</button>
              <button className="btn-outline" onClick={()=>setModal(false)} style={{flex:1}}>ยกเลิก</button>
            </div>
          </div>
        </div>
      )}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:3}}>KNOWLEDGE FILES</div>
          <div className="cond" style={{fontSize:22,color:"var(--text)",marginTop:2}}>{resources.length} ไฟล์</div>
        </div>
        <button className="btn btn-gold" onClick={()=>setModal(true)} style={{fontSize:15,padding:"12px 24px"}}>➕ เพิ่มไฟล์ใหม่</button>
      </div>
      {CHAPTERS.map(ch=>{const chR=resources.filter(r=>r.chapterId===ch.id);return(
        <div key={ch.id} style={{marginBottom:24}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,paddingBottom:8,borderBottom:`1px solid ${ch.color}35`}}>
            <span style={{fontSize:20}}>{ch.icon}</span>
            <div className="cond" style={{fontSize:20,fontWeight:700,color:ch.color}}>{ch.title}</div>
            <span className="badge" style={{background:`${ch.color}20`,border:`1px solid ${ch.color}50`,color:ch.color}}>{chR.length} ไฟล์</span>
          </div>
          {chR.length===0&&<div style={{color:"var(--muted)",fontSize:13}}>ยังไม่มีไฟล์</div>}
          {chR.map(r=>(
            <div key={r.id} className="card" style={{display:"flex",alignItems:"center",gap:14,marginBottom:8,borderColor:`${ch.color}25`}}>
              <div style={{fontSize:28}}>{ti[r.type]||"📄"}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:600,color:"#fff"}}>{r.title}</div>
                <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>{r.uploadedAt}</div>
                {r.link&&<a href={r.link} target="_blank" rel="noreferrer" style={{fontSize:11,color:"var(--cyan)",marginTop:2,display:"block"}}>🔗 เปิดไฟล์</a>}
              </div>
              <button className="btn btn-red" onClick={()=>del(r.id)} style={{padding:"7px 14px",fontSize:13}}>🗑</button>
            </div>
          ))}
        </div>
      );})}
    </div>
  );
}

// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// TEACHER: XP MANAGEMENT (อัปเกรด)
// ─────────────────────────────────────────────
function TeacherScores({students,setStudents}){
  const [tab,setTab]=useState("add");
  const [targetMode,setTargetMode]=useState("single"); // "single" | "multi" | "all"
  const [selStu,setSelStu]=useState("");
  const [selMulti,setSelMulti]=useState([]); // หลายคน
  const [xpAmt,setXpAmt]=useState("");
  const [activityName,setActivityName]=useState("");
  const [msg,setMsg]=useState(null);

  function toast(t,isErr=false){setMsg({text:t,err:isErr});setTimeout(()=>setMsg(null),3500);}

  function toggleMulti(id){
    setSelMulti(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  }

  function doAdd(){
    if(!xpAmt||Number(xpAmt)<=0){toast("กรุณาใส่จำนวน XP",true);return;}
    if(!activityName.trim()){toast("กรุณาใส่ชื่องาน/กิจกรรม",true);return;}
    if(targetMode==="single"&&!selStu){toast("กรุณาเลือกนักเรียน",true);return;}
    if(targetMode==="multi"&&selMulti.length===0){toast("กรุณาเลือกนักเรียนอย่างน้อย 1 คน",true);return;}
    const today=new Date().toLocaleDateString("th-TH",{day:"numeric",month:"short",year:"numeric"});
    const logEntry={activity:activityName.trim(),xp:Number(xpAmt),date:today};
    if(targetMode==="all"){
      setStudents(prev=>prev.map(s=>({...s,xp:s.xp+Number(xpAmt),xpLog:[...(s.xpLog||[]),logEntry]})));
      toast(`✅ เพิ่ม ${xpAmt} XP จาก "${activityName}" ให้ทุกคน ${students.length} คน!`);
    } else if(targetMode==="multi"){
      setStudents(prev=>prev.map(s=>selMulti.includes(s.id)?{...s,xp:s.xp+Number(xpAmt),xpLog:[...(s.xpLog||[]),logEntry]}:s));
      toast(`✅ เพิ่ม ${xpAmt} XP จาก "${activityName}" ให้ ${selMulti.length} คน!`);
      setSelMulti([]);
    } else {
      const name=students.find(s=>s.id===selStu)?.name||"";
      setStudents(prev=>prev.map(s=>s.id===selStu?{...s,xp:s.xp+Number(xpAmt),xpLog:[...(s.xpLog||[]),logEntry]}:s));
      toast(`✅ เพิ่ม ${xpAmt} XP จาก "${activityName}" ให้ ${name}!`);
    }
    setXpAmt("");setActivityName("");setSelStu("");
  }

  const allActivities=useMemo(()=>{
    const map={};
    students.forEach(s=>{
      (s.xpLog||[]).forEach(log=>{
        if(!map[log.activity])map[log.activity]={name:log.activity,entries:{}};
        map[log.activity].entries[s.id]={xp:log.xp,date:log.date};
      });
    });
    return Object.values(map);
  },[students]);

  const tabStyle=(t)=>({
    background:tab===t?"rgba(232,188,85,.12)":"transparent",
    border:"none",borderBottom:tab===t?"2px solid var(--gold)":"2px solid transparent",
    color:tab===t?"var(--gold2)":"var(--muted2)",
    padding:"10px 22px",cursor:"pointer",
    fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,letterSpacing:1,
    transition:"all .2s"
  });

  return(
    <div className="fade-up" style={{padding:20,maxWidth:960,margin:"0 auto"}}>
      <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:3,marginBottom:16}}>XP MANAGEMENT</div>
      <div style={{display:"flex",borderBottom:"1px solid var(--border)",marginBottom:20}}>
        <button style={tabStyle("add")} onClick={()=>setTab("add")}>⭐ เพิ่ม XP</button>
        <button style={tabStyle("summary")} onClick={()=>setTab("summary")}>📊 สรุปรายงาน</button>
      </div>
      {msg&&<div style={{background:msg.err?"rgba(232,96,96,.14)":"rgba(94,200,126,.14)",
        border:`1px solid ${msg.err?"rgba(232,96,96,.4)":"rgba(94,200,126,.4)"}`,
        borderRadius:7,padding:"13px 18px",color:msg.err?"var(--red)":"var(--green)",
        fontSize:14,marginBottom:16,textAlign:"center"}}>{msg.text}</div>}

      {tab==="add"&&(
        <>
          <div className="card card-gold" style={{marginBottom:20}}>
            <div className="cond" style={{fontSize:22,color:"var(--gold)",letterSpacing:2,marginBottom:18}}>⭐ เพิ่ม XP จากกิจกรรม</div>
            <div style={{marginBottom:14}}>
              <label className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:8}}>ชื่องาน / กิจกรรม</label>
              <input className="input" value={activityName} onChange={e=>setActivityName(e.target.value)}
                placeholder="เช่น แบบทดสอบบทที่ 1, ใบงาน 2.3, ตอบคำถามในชั้นเรียน"/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
              <div>
                <label className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:8}}>จำนวน XP</label>
                <input className="input" type="number" value={xpAmt} onChange={e=>setXpAmt(e.target.value)} placeholder="เช่น 200"/>
              </div>
              <div>
                <label className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:8}}>ให้คะแนน</label>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
                  {[["single","👤 รายบุคคล"],["multi","☑️ เลือกหลายคน"],["all","👥 ทั้งห้อง"]].map(([m,l])=>(
                    <button key={m} onClick={()=>{setTargetMode(m);setSelStu("");setSelMulti([]);}} className="btn"
                      style={{background:targetMode===m?"rgba(232,188,85,.18)":"rgba(255,255,255,.05)",
                        border:`1px solid ${targetMode===m?"rgba(232,188,85,.6)":"var(--border)"}`,
                        color:targetMode===m?"var(--gold)":"var(--muted2)",
                        borderRadius:6,padding:"10px 6px",fontSize:12,
                        fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:.5}}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* เลือกรายบุคคล */}
            {targetMode==="single"&&(
              <div style={{marginBottom:16}}>
                <label className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:8}}>เลือกนักเรียน</label>
                <select className="input" value={selStu} onChange={e=>setSelStu(e.target.value)}>
                  <option value="">-- เลือกนักเรียน --</option>
                  {students.map(s=><option key={s.id} value={s.id}>{s.avatar} {s.name} · {s.xp.toLocaleString()} XP</option>)}
                </select>
              </div>
            )}

            {/* เลือกหลายคน */}
            {targetMode==="multi"&&(
              <div style={{marginBottom:16}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <label className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2}}>เลือกนักเรียน ({selMulti.length} คน)</label>
                  <div style={{display:"flex",gap:8}}>
                    <button className="btn-ghost" onClick={()=>setSelMulti(students.map(s=>s.id))} style={{fontSize:11,padding:"4px 12px"}}>เลือกทั้งหมด</button>
                    <button className="btn-ghost" onClick={()=>setSelMulti([])} style={{fontSize:11,padding:"4px 12px"}}>ล้าง</button>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:6,maxHeight:260,overflowY:"auto",padding:4}}>
                  {students.map(s=>{
                    const selected=selMulti.includes(s.id);
                    return(
                      <div key={s.id} onClick={()=>toggleMulti(s.id)}
                        style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",
                          background:selected?"rgba(232,188,85,.15)":"rgba(255,255,255,.04)",
                          border:`1px solid ${selected?"rgba(232,188,85,.5)":"var(--border)"}`,
                          borderRadius:7,cursor:"pointer",transition:"all .15s"}}>
                        <div style={{width:18,height:18,borderRadius:4,
                          background:selected?"var(--gold)":"transparent",
                          border:`2px solid ${selected?"var(--gold)":"var(--muted)"}`,
                          display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          {selected&&<span style={{fontSize:12,color:"#000",lineHeight:1}}>✓</span>}
                        </div>
                        <span style={{fontSize:18,flexShrink:0}}>{s.avatar}</span>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:12,color:selected?"var(--gold)":"var(--text)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.name}</div>
                          <div className="mono" style={{fontSize:10,color:"var(--muted)"}}>{s.xp.toLocaleString()} XP</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {targetMode==="all"&&(
              <div style={{background:"rgba(94,200,126,.08)",border:"1px solid rgba(94,200,126,.3)",
                borderRadius:8,padding:"10px 14px",marginBottom:16,fontSize:13,color:"var(--green)"}}>
                👥 จะเพิ่ม XP ให้นักเรียนทั้งหมด <strong>{students.length} คน</strong> พร้อมกัน
              </div>
            )}

            <button className="btn btn-gold" onClick={doAdd}
              style={{width:"100%",fontSize:17,padding:"15px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
              <span>➕</span>
              {targetMode==="all"?`เพิ่ม XP ให้ทุกคน (${students.length} คน)`:
               targetMode==="multi"?`เพิ่ม XP ให้ ${selMulti.length} คนที่เลือก`:
               "เพิ่ม XP"}
            </button>
          </div>

          <div className="card">
            <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:2,marginBottom:14}}>XP ทุกนักเรียน</div>
            {[...students].sort((a,b)=>b.xp-a.xp).map((s,i)=>{const r=getRank(s.xp);return(
              <div key={s.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid var(--border)"}}>
                <span style={{width:28,textAlign:"center",fontSize:14,color:"var(--muted)"}}>{i+1}</span>
                <span style={{fontSize:28}}>{s.avatar}</span>
                <span style={{flex:1,fontSize:14}}>{s.name}</span>
                <div style={{width:110}}><XPBar xp={s.xp} showLabel={false}/></div>
                <div className="mono" style={{width:70,textAlign:"right",color:r.color}}>{s.xp.toLocaleString()}</div>
                <GradeTag xp={s.xp}/>
              </div>
            );})}
          </div>
        </>
      )}

      {tab==="summary"&&(
        <div>
          {allActivities.length===0?(
            <div className="card" style={{textAlign:"center",padding:48}}>
              <div style={{fontSize:40,marginBottom:12}}>📊</div>
              <div className="cond" style={{fontSize:20,color:"var(--muted)"}}>ยังไม่มีการให้คะแนน</div>
            </div>
          ):(
            allActivities.map((act,ai)=>{
              const sortedStudents=[...students].sort((a,b)=>b.xp-a.xp);
              const totalGiven=Object.values(act.entries).reduce((s,e)=>s+(e.xp||0),0);
              const receivedCount=Object.keys(act.entries).length;
              return(
                <div key={ai} className="card" style={{marginBottom:16,borderColor:"rgba(232,188,85,.35)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,flexWrap:"wrap",gap:8}}>
                    <div>
                      <div className="cond" style={{fontSize:20,fontWeight:700,color:"var(--gold2)"}}>{act.name}</div>
                      <div style={{display:"flex",gap:8,marginTop:6}}>
                        <span className="badge" style={{background:"rgba(94,200,126,.14)",border:"1px solid rgba(94,200,126,.4)",color:"var(--green)"}}>✓ ได้รับ {receivedCount} คน</span>
                        <span className="badge" style={{background:"rgba(232,96,96,.1)",border:"1px solid rgba(232,96,96,.28)",color:"var(--red)"}}>— ยังไม่ได้ {students.length-receivedCount} คน</span>
                        <span className="mono" style={{fontSize:11,color:"var(--gold)",padding:"3px 8px"}}>รวม {totalGiven.toLocaleString()} XP</span>
                      </div>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:8}}>
                    {sortedStudents.map(s=>{
                      const entry=act.entries[s.id];
                      return(
                        <div key={s.id} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",
                          background:entry?"rgba(94,200,126,.07)":"rgba(232,96,96,.05)",
                          border:`1px solid ${entry?"rgba(94,200,126,.25)":"rgba(232,96,96,.15)"}`,
                          borderRadius:7}}>
                          <span style={{fontSize:20,flexShrink:0}}>{s.avatar}</span>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:12,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.name.split(" ").slice(1).join(" ")}</div>
                            {entry?<div className="mono" style={{fontSize:13,color:"var(--gold)",fontWeight:700}}>+{entry.xp} XP</div>
                                  :<div style={{fontSize:11,color:"var(--muted)"}}>ยังไม่ได้รับ</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// TEACHER: AIRDROP
// ─────────────────────────────────────────────
function TeacherAirdrop({students,setPendingAirdrop}){
  const DEFAULT_POOL=[
    {id:"r1",name:"AWM Sniper Rifle",icon:"🔫",rarity:"LEGENDARY",color:"#f5cc70"},
    {id:"r2",name:"Level 3 Helmet",icon:"⛑️",rarity:"EPIC",color:"#a569bd"},
    {id:"r3",name:"Ghillie Suit",icon:"🥷",rarity:"EPIC",color:"#a569bd"},
    {id:"r4",name:"Adrenaline Syringe",icon:"💉",rarity:"RARE",color:"#4ecaae"},
    {id:"r5",name:"First Aid Kit",icon:"🩺",rarity:"RARE",color:"#4ecaae"},
    {id:"r6",name:"Scope 4x",icon:"🔭",rarity:"UNCOMMON",color:"#7de8a0"},
    {id:"r7",name:"Energy Drink",icon:"🥤",rarity:"COMMON",color:"#7b8fe0"},
    {id:"r8",name:"Bandage Pack",icon:"🩹",rarity:"COMMON",color:"#7b8fe0"},
  ];
  const RARITY_COLORS={LEGENDARY:"#f5cc70",EPIC:"#a569bd",RARE:"#4ecaae",UNCOMMON:"#7de8a0",CUSTOM:"#e88c4a",COMMON:"#7b8fe0"};
  const [pool,setPool]=useState(DEFAULT_POOL);
  const [showPoolEditor,setShowPoolEditor]=useState(false);
  const [addForm,setAddForm]=useState({name:"",icon:"🎁",rarity:"CUSTOM"});
  const [poolMsg,setPoolMsg]=useState(null);
  const [eventFilter,setEventFilter]=useState("all");
  const [selStu,setSelStu]=useState("");
  const [rolling,setRolling]=useState(false);
  const [rollIdx,setRollIdx]=useState(0);
  const [result,setResult]=useState(null);
  const [note,setNote]=useState("");
  const [sent,setSent]=useState(null);
  const timerRef=useRef<any>(null);

  const EVENT_FILTERS=[
    {id:"all",label:"👥",title:"ทุกคน",desc:"สุ่มให้ใครก็ได้"},
    {id:"no_drop",label:"📦",title:"ยังไม่เคยได้",desc:"inventory ว่าง"},
    {id:"low_xp",label:"⬇️",title:"XP ต่ำสุด",desc:"XP น้อยสุด"},
    {id:"top",label:"👑",title:"XP สูงสุด",desc:"อันดับ 1"},
  ];

  function getFiltered(){
    switch(eventFilter){
      case "no_drop": return students.filter(s=>s.inventory.length===0);
      case "low_xp":  {const mn=Math.min(...students.map(s=>s.xp));return students.filter(s=>s.xp===mn);}
      case "top":     {const mx=Math.max(...students.map(s=>s.xp));return students.filter(s=>s.xp===mx);}
      default:        return students;
    }
  }
  const filtered=getFiltered();

  function addReward(){
    if(!addForm.name.trim()){setPoolMsg("กรุณาใส่ชื่อรางวัล");return;}
    const color=RARITY_COLORS[addForm.rarity]||"#7b8fe0";
    setPool(p=>[...p,{id:"c"+Date.now(),name:addForm.name.trim(),icon:addForm.icon||"🎁",rarity:addForm.rarity,color}]);
    setAddForm({name:"",icon:"🎁",rarity:"CUSTOM"});
    setPoolMsg("✅ เพิ่มสำเร็จ!");setTimeout(()=>setPoolMsg(null),2000);
  }

  function startRoll(){
    if(!selStu||pool.length===0)return;
    setResult(null);setRolling(true);setNote("");
    let c=0;timerRef.current=setInterval(()=>{
      setRollIdx(Math.floor(Math.random()*pool.length));c++;
      if(c>=28){clearInterval(timerRef.current);setResult(pool[Math.floor(Math.random()*pool.length)]);setRolling(false);}
    },70);
  }
  function send(){
    if(!selStu||!result)return;
    const today=new Date().toLocaleDateString("th-TH",{day:"numeric",month:"short",year:"numeric"});
    setPendingAirdrop({...result,targetStudentId:selStu,receivedAt:today,note});
    const s=students.find(x=>x.id===selStu);
    setSent(`📦 ส่ง "${result.name}" ให้ ${s?.name} แล้ว!`);
    setTimeout(()=>setSent(null),4000);setResult(null);setSelStu("");setNote("");
  }

  return(
    <div className="fade-up" style={{padding:20,maxWidth:900,margin:"0 auto"}}>
      <div className="mono" style={{fontSize:10,color:"var(--muted)",letterSpacing:3,marginBottom:16}}>📦 AIRDROP LAUNCHER</div>
      {sent&&<div className="air-in" style={{background:"rgba(232,188,85,.12)",border:"1px solid rgba(232,188,85,.5)",borderRadius:8,padding:"13px 20px",marginBottom:14,color:"var(--gold2)",fontSize:14,textAlign:"center"}}>{sent}</div>}
      <div className="card card-gold" style={{marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:showPoolEditor?16:0}}>
          <div><div className="cond" style={{fontSize:18,color:"var(--gold)",letterSpacing:2}}>🎁 Reward Pool ({pool.length})</div></div>
          <button className="btn btn-gold" onClick={()=>setShowPoolEditor(p=>!p)} style={{fontSize:13,padding:"9px 20px"}}>
            {showPoolEditor?"▲ ซ่อน":"▼ จัดการ"}
          </button>
        </div>
        {showPoolEditor&&(
          <>
            <div style={{background:"rgba(14,26,43,.7)",borderRadius:8,padding:16,marginBottom:14,border:"1px solid var(--border)"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr auto",gap:10,alignItems:"end"}}>
                <div><label className="mono" style={{fontSize:9,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:6}}>ชื่อรางวัล</label>
                  <input className="input" value={addForm.name} onChange={e=>setAddForm(p=>({...p,name:e.target.value}))} placeholder="ชื่อรางวัล"/></div>
                <div><label className="mono" style={{fontSize:9,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:6}}>ไอคอน</label>
                  <input className="input" value={addForm.icon} onChange={e=>setAddForm(p=>({...p,icon:e.target.value}))} style={{width:64,textAlign:"center",fontSize:22,padding:"6px"}}/></div>
                <div><label className="mono" style={{fontSize:9,color:"var(--muted)",letterSpacing:2,display:"block",marginBottom:6}}>ระดับ</label>
                  <select className="input" value={addForm.rarity} onChange={e=>setAddForm(p=>({...p,rarity:e.target.value}))}>
                    {Object.keys(RARITY_COLORS).map(r=><option key={r} value={r}>{r}</option>)}
                  </select></div>
                <button className="btn btn-gold" onClick={addReward} style={{padding:"11px 18px"}}>➕</button>
              </div>
              {poolMsg&&<div style={{marginTop:8,fontSize:12,color:poolMsg.startsWith("✅")?"var(--green)":"var(--red)"}}>{poolMsg}</div>}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:8}}>
              {pool.map(r=>(
                <div key={r.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",
                  background:"rgba(14,26,43,.5)",borderRadius:7,border:`1px solid ${r.color}50`}}>
                  <div style={{fontSize:22,flexShrink:0}}>{r.icon}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:600,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.name}</div>
                    <div style={{fontSize:9,color:r.color,marginTop:2}}>★ {r.rarity}</div>
                  </div>
                  <button onClick={()=>setPool(p=>p.filter(x=>x.id!==r.id))} style={{background:"rgba(232,96,96,.18)",border:"1px solid rgba(232,96,96,.35)",borderRadius:4,color:"var(--red)",fontSize:11,cursor:"pointer",padding:"3px 8px",flexShrink:0}}>🗑</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div className="card">
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
              {EVENT_FILTERS.map(ef=>(
                <button key={ef.id} onClick={()=>{setEventFilter(ef.id);setSelStu("");}} className="btn"
                  style={{background:eventFilter===ef.id?"rgba(170,143,240,.2)":"rgba(255,255,255,.04)",
                    border:`1px solid ${eventFilter===ef.id?"rgba(170,143,240,.6)":"var(--border)"}`,
                    color:eventFilter===ef.id?"#c4aaff":"var(--muted2)",borderRadius:7,padding:"8px 12px",
                    fontFamily:"'Noto Sans Thai',sans-serif",fontSize:12}}>
                  {ef.label} {ef.title}
                </button>
              ))}
            </div>
            <select className="input" value={selStu} onChange={e=>setSelStu(e.target.value)}>
              <option value="">-- เลือกผู้รับ --</option>
              {filtered.map(s=><option key={s.id} value={s.id}>{s.avatar} {s.name}</option>)}
            </select>
          </div>
          <button className="btn btn-gold" onClick={startRoll} disabled={!selStu||rolling||pool.length===0}
            style={{padding:18,fontSize:18,opacity:(!selStu||rolling||pool.length===0)?.4:1}}>
            {rolling?<><span style={{animation:"spin .3s linear infinite",display:"inline-block"}}>🎲</span> ROLLING...</>:<>🎲 ROLL AIRDROP</>}
          </button>
          {result&&!rolling&&(
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <input className="input" value={note} onChange={e=>setNote(e.target.value)} placeholder="ข้อความถึงนักเรียน เช่น ทำได้ดีมาก! 🎉"/>
              <button className="btn btn-cyan" onClick={send} style={{padding:16,fontSize:16}}>📦 ส่ง Airdrop!</button>
            </div>
          )}
        </div>
        <div className="card card-gold" style={{textAlign:"center",minHeight:220,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          {!rolling&&!result&&<div><div style={{fontSize:56,opacity:.25,marginBottom:8}}>📦</div><div className="mono" style={{fontSize:11,color:"var(--muted)"}}>กด ROLL เพื่อสุ่ม</div></div>}
          {rolling&&pool[rollIdx]&&<div><div style={{fontSize:72,animation:"spin .18s linear infinite"}}>{pool[rollIdx].icon}</div><div className="mono" style={{fontSize:12,color:"var(--gold)",marginTop:10,animation:"blink .4s linear infinite"}}>ROLLING...</div></div>}
          {result&&!rolling&&(
            <div className="air-in">
              <div style={{fontSize:72,marginBottom:10,filter:`drop-shadow(0 0 22px ${result.color})`}}>{result.icon}</div>
              <div style={{color:result.color,fontWeight:700,fontSize:18,marginBottom:6}}>{result.name}</div>
              <div className="badge" style={{background:`${result.color}20`,border:`1px solid ${result.color}60`,color:result.color,fontSize:12,padding:"4px 14px"}}>★ {result.rarity}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// GOOGLE APPS SCRIPT API — แก้ไขแล้ว
// ─────────────────────────────────────────────
const GAS_URL = "https://script.google.com/macros/s/AKfycbwtupEmRpb10monRLjykWA--xKFLHrk-s4cOvPuJbcpG6yH2l3d6ac68vn-3jjsX0G4WA/exec";

async function gasGet(){
  try{
    // GET ไม่ต้องใช้ no-cors — GAS อนุญาต GET ปกติ
    const r=await fetch(GAS_URL+"?action=getAll");
    return await r.json();
  }catch(e){
    console.error("gasGet error:",e);
    return null;
  }
}

async function gasSave(action,data){
  try{
    // POST ต้องใช้ no-cors + Content-Type: text/plain
    await fetch(GAS_URL,{
      method:"POST",
      mode:"no-cors",
      headers:{"Content-Type":"text/plain"},
      body:JSON.stringify({action,data:JSON.stringify(data)})
    });
  }catch(e){
    console.error("gasSave error:",e);
  }
}

// ─────────────────────────────────────────────
// SYNC TO SHEET — รูปแบบที่อ่านง่ายขึ้น
// ─────────────────────────────────────────────
async function syncStudentsToSheet(students,assignments){
  // ส่งข้อมูลที่ structured สำหรับ sheet rows
  const rows=students.map(s=>{
    const submissionLinks={};
    assignments.forEach(a=>{
      const sub=s.submissions?.[a.id];
      submissionLinks[a.id]={
        title:a.title,
        submitted:sub?true:false,
        link:sub?.file||"",
        xpEarned:sub?.xpEarned||0,
        submittedAt:sub?.submittedAt||""
      };
    });
    return{
      id:s.id,
      name:s.name,
      originalPassword:INIT_STUDENTS.find(x=>x.id===s.id)?.password||s.password,
      currentPassword:s.password,
      xp:s.xp,
      grade:getRank(s.xp).grade,
      rank:getRank(s.xp).label,
      midterm:s.midterm,
      final:s.final,
      submissionLinks
    };
  });
  await gasSave("saveStudentsDetailed",rows);
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function App(){
  const [students,setStudents]=useState(INIT_STUDENTS);
  const [assignments,setAssignments]=useState(INIT_ASSIGNMENTS);
  const [resources,setResources]=useState(INIT_RESOURCES);
  const [auth,setAuth]=useState(null);
  const [loaded,setLoaded]=useState(false);
  const saveTimer=useRef<any>(null);

  // โหลดข้อมูลตอนเริ่ม
  useEffect(()=>{
    gasGet().then(data=>{
      if(data){
        if(data.students&&data.students.length>0)setStudents(data.students);
        if(data.assignments&&data.assignments.length>0)setAssignments(data.assignments);
        if(data.resources&&data.resources.length>0)setResources(data.resources);
      }
      setLoaded(true);
    });
  },[]);

  // debounce save — รอ 1 วินาทีหลังเปลี่ยนค่า
  useEffect(()=>{
    if(!loaded)return;
    clearTimeout(saveTimer.current);
    saveTimer.current=setTimeout(async()=>{
      await gasSave("saveStudents",students);
      await syncStudentsToSheet(students,assignments);
    },1000);
  },[students,loaded]);

  useEffect(()=>{
    if(!loaded)return;
    clearTimeout(saveTimer.current);
    saveTimer.current=setTimeout(()=>{
      gasSave("saveAssignments",assignments);
    },1000);
  },[assignments,loaded]);

  useEffect(()=>{
    if(!loaded)return;
    clearTimeout(saveTimer.current);
    saveTimer.current=setTimeout(()=>{
      gasSave("saveResources",resources);
    },1000);
  },[resources,loaded]);

  const [page,setPage]=useState("dashboard");
  const [pendingAirdrop,setPendingAirdrop]=useState(null);
  const [activePopup,setActivePopup]=useState(null);

  function handleLogin(role,userId){setAuth({role,userId});setPage(role==="teacher"?"overview":"dashboard");}
  function handleLogout(){setAuth(null);}

  useEffect(()=>{
    if(!pendingAirdrop)return;
    const{targetStudentId,...item}=pendingAirdrop;
    setStudents(prev=>prev.map(s=>s.id===targetStudentId?{...s,inventory:[...s.inventory,item]}:s));
    if(auth?.role==="student"&&auth?.userId===targetStudentId)setActivePopup({...item});
    setPendingAirdrop(null);
  },[pendingAirdrop]);

  const{role,userId}=auth||{};
  const currentStudent=students.find(s=>s.id===userId);
  const navUser=role==="teacher"?{name:"ครูผู้สอน",avatar:"👩‍✈️",xp:9999}:currentStudent;

  if(!auth)return(<><style>{G}</style><LoginScreen students={students} onLogin={handleLogin}/></>);

  return(
    <>
      <style>{G}</style>
      <VeniceBackground/>
      {activePopup&&role==="student"&&<AirdropPopup airdrop={activePopup} onClaim={()=>setActivePopup(null)}/>}
      <div style={{position:"relative",zIndex:1,minHeight:"100vh"}}>
        <TopNav user={navUser} role={role} page={page} setPage={setPage} onLogout={handleLogout}/>
        <main>
          <PageHeader page={page} setPage={setPage}/>
          {role==="student"&&page==="dashboard"    &&currentStudent&&<StudentDashboard student={currentStudent} students={students} assignments={assignments} setPage={setPage} setStudents={setStudents}/>}
          {role==="student"&&page==="assignments"  &&currentStudent&&<StudentAssignments student={currentStudent} assignments={assignments} setStudents={setStudents}/>}
          {role==="student"&&page==="resources"    &&<StudentResources resources={resources}/>}
          {role==="student"&&page==="ranking"      &&<RankingPage students={students} myId={userId} isTeacher={false}/>}
          {role==="student"&&page==="inventory"    &&currentStudent&&<StudentInventory student={currentStudent}/>}
          {role==="student"&&page==="settings"     &&currentStudent&&<StudentSettings student={currentStudent} setStudents={setStudents}/>}
          {role==="teacher"&&page==="overview"     &&<TeacherOverview students={students} assignments={assignments} setPage={setPage}/>}
          {role==="teacher"&&page==="students"     &&<TeacherStudents students={students} assignments={assignments}/>}
          {role==="teacher"&&page==="t-assignments"&&<TeacherAssignments assignments={assignments} setAssignments={setAssignments} students={students} setStudents={setStudents}/>}
          {role==="teacher"&&page==="t-resources"  &&<TeacherResources resources={resources} setResources={setResources}/>}
          {role==="teacher"&&page==="t-scores"     &&<TeacherScores students={students} setStudents={setStudents}/>}
          {role==="teacher"&&page==="t-exam"       &&<TeacherExamScores students={students} setStudents={setStudents}/>}
          {role==="teacher"&&page==="t-airdrop"    &&<TeacherAirdrop students={students} setPendingAirdrop={setPendingAirdrop}/>}
          {role==="teacher"&&page==="ranking"      &&<RankingPage students={students} myId={undefined} isTeacher={true}/>}
        </main>
      </div>
    </>
  );
}

