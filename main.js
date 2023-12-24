(()=>{"use strict";var n={426:(n,e,t)=>{t.d(e,{Z:()=>s});var o=t(81),r=t.n(o),i=t(645),a=t.n(i)()(r());a.push([n.id,"* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  scroll-behavior: smooth;\n}\nhtml {\n  font-family: Inter, arial, san-sarif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  transition: all 0.5s ease-in-out;\n  overflow: hidden;\n}\n\n#weather {\n  width: 75rem;\n  height: 40rem;\n}\n\nimg {\n  width: 200px;\n  height: 200px;\n}\n.right {\n  background-color: rgba(33, 40, 50, 255);\n  color: #fff;\n  width: 55%;\n  height: 40rem;\n  float: right;\n  padding: 4rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  border-radius: 0 2rem 2rem 0;\n  position: relative;\n}\n.right-top > div {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n  font-size: 2rem;\n  font-weight: bold;\n}\n.value {\n  font-weight: normal;\n}\n.other-days {\n  display: flex;\n  box-shadow: 19px 19px 38px #171a20;\n  border-radius: 1.5rem;\n}\n.choose {\n  border-radius: 1rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  align-items: center;\n  justify-content: flex-end;\n  height: 15rem;\n  width: 100%;\n  font-size: 1.5rem;\n  background-color: #252933;\n  position: relative;\n  margin: 0.1rem;\n  border: 1px solid #252933;\n}\n\n.choosen {\n  background-color: #fff;\n  color: black;\n}\n\n.choose:hover {\n  background-color: #fff;\n  color: black;\n  cursor: pointer;\n  transform: scale(1.1);\n  transition: 0.3s ease-in-out;\n  z-index: 2;\n}\n\n.right-icon {\n  position: absolute;\n  top: 2rem;\n  height: 80px;\n  width: 80px;\n}\n\n.temp {\n  margin: 1rem 0;\n  font-size: 1.5rem;\n  font-weight: bold;\n}\n\n.form {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n#city {\n  position: absolute;\n  width: 100%;\n  padding: 0.6rem;\n  padding-left: 1rem;\n  border-radius: 1.5rem;\n  font-size: 1.5rem;\n  z-index: 0;\n  box-shadow: 19px 19px 38px #171a20;\n  border: 1px solid #ebb462;\n}\n\n#city:focus {\n  outline: 2px solid #ebb462;\n}\n\n.right-btn {\n  color: #fff;\n  width: 33.3rem;\n  border-radius: 1.5rem;\n  text-align: center;\n  padding: 0.6rem;\n  font-size: 1.5rem;\n  background-image: linear-gradient(\n    90deg,\n    #f0d471 0%,\n    #ebb462 35%,\n    #e79f57 100%\n  );\n\n  position: fixed;\n  transition: all 0.3s ease-in-out;\n  border: none;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n.right-btn:hover {\n  cursor: pointer;\n}\n\n.right-btn-after-click {\n  width: 4rem;\n}\n\n.search-icon {\n  visibility: hidden;\n}\n\n.left {\n  color: #fff;\n  height: 100%;\n  padding: 3rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  font-size: 1.5rem;\n  border-radius: 2rem;\n  transform: scale(1.03);\n  background-image: linear-gradient(\n    45deg,\n    #f0d471 0%,\n    #ebb462 35%,\n    #e79f57 100%\n  );\n  box-shadow: 25px 5px 20px -10px #171a20;\n}\n.dayDate {\n  margin-bottom: 1rem;\n}\n.day {\n  font-size: 2rem;\n  font-weight: bold;\n}\n.left-temp {\n  font-size: 4rem;\n  font-weight: bold;\n  margin-bottom: 1rem;\n}\n.condition {\n  font-size: 2rem;\n  font-weight: bold;\n}\n.left-top {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.location {\n  margin-top: 1rem;\n}\n.icon {\n  width: 110px;\n  height: 110px;\n  background-color: rgba(33, 40, 50, 255);\n  border-radius: 1rem;\n}\n.loading {\n  display: none;\n  color: white;\n  /* Add your styling for the loading component here */\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(33, 40, 50, 255);\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 999;\n  transition: all 0.5s ease-in-out;\n}\n\n\n.spinner {\n  --red: #d62d20;\n  --blue: #0057e7;\n  --green: #008744;\n  --yellow: #ffa700;\n  position: relative;\n  width: 110px;\n  margin: auto auto;\n  height: 100%;\n}\n\n.spinner:before {\n  content: '';\n  display: block;\n  padding-top: 100%;\n}\n\n.circular {\n  animation: rotate73451 2s linear infinite;\n  height: 100%;\n  transform-origin: center center;\n  width: 100%;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n}\n\n.path {\n  stroke-dasharray: 1, 200;\n  stroke-dashoffset: 0;\n  animation: dash0175 1.5s ease-in-out infinite,\n    color7123 6s ease-in-out infinite;\n  stroke-linecap: round;\n}\n\n@keyframes rotate73451 {\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes dash0175 {\n  0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n  }\n\n  50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35px;\n  }\n\n  100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124px;\n  }\n}\n\n@keyframes color7123 {\n  100%,\n  0% {\n    stroke: var(--red);\n  }\n\n  40% {\n    stroke: var(--blue);\n  }\n\n  66% {\n    stroke: var(--green);\n  }\n\n  80%,\n  90% {\n    stroke: var(--yellow);\n  }\n}\n",""]);const s=a},645:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",o=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),o&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),o&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,o,r,i){"string"==typeof n&&(n=[[null,n,void 0]]);var a={};if(o)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(a[c]=!0)}for(var d=0;d<n.length;d++){var l=[].concat(n[d]);o&&a[l[0]]||(void 0!==i&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=i),t&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=t):l[2]=t),r&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=r):l[4]="".concat(r)),e.push(l))}},e}},81:n=>{n.exports=function(n){return n[1]}},379:n=>{var e=[];function t(n){for(var t=-1,o=0;o<e.length;o++)if(e[o].identifier===n){t=o;break}return t}function o(n,o){for(var i={},a=[],s=0;s<n.length;s++){var c=n[s],d=o.base?c[0]+o.base:c[0],l=i[d]||0,f="".concat(d," ").concat(l);i[d]=l+1;var u=t(f),p={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==u)e[u].references++,e[u].updater(p);else{var m=r(p,o);o.byIndex=s,e.splice(s,0,{identifier:f,updater:m,references:1})}a.push(f)}return a}function r(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,r){var i=o(n=n||[],r=r||{});return function(n){n=n||[];for(var a=0;a<i.length;a++){var s=t(i[a]);e[s].references--}for(var c=o(n,r),d=0;d<i.length;d++){var l=t(i[d]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}i=c}}},569:n=>{var e={};n.exports=function(n,t){var o=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},216:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},565:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},795:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,r&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var i=t.sourceMap;i&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleTagTransform(o,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},589:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(o){var r=e[o];if(void 0!==r)return r.exports;var i=e[o]={id:o,exports:{}};return n[o](i,i.exports,t),i.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.nc=void 0,(()=>{var n=t(379),e=t.n(n),o=t(795),r=t.n(o),i=t(569),a=t.n(i),s=t(565),c=t.n(s),d=t(216),l=t.n(d),f=t(589),u=t.n(f),p=t(426),m={};m.styleTagTransform=u(),m.setAttributes=c(),m.insert=a().bind(null,"head"),m.domAPI=r(),m.insertStyleElement=l(),e()(p.Z,m),p.Z&&p.Z.locals&&p.Z.locals;const h=document.querySelector(".other-days"),g=document.querySelector(".right-top"),y=document.querySelector(".button"),v=document.getElementById("city"),b=document.querySelector(".left"),x=document.getElementById("loading"),w="weather.list",k="weather.selectedListId",C="weather.location";let L=JSON.parse(localStorage.getItem(w)||"[]"),E=localStorage.getItem(k),T=localStorage.getItem(C);const S=(new Date).getHours();E=0;let I=0;function j(n){return new Date(n).toLocaleDateString("en-US",{weekday:"long"})}async function M(n){x.style.display="block";try{const o=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=455bdd01213a436b9d195824230111&q=${n}&days=4&hour=${S}`,{mode:"cors"}),r=await o.json();for(let n=0;n<3;n+=1){const o={id:t=n,icon:(e=r).forecast.forecastday[t].hour[0].condition.icon,date:e.forecast.forecastday[t].date,temp:e.forecast.forecastday[t].hour[0].temp_c,full:{}},i=z(r,n);o.full=i,L.push(o)}L=L.slice(-3),q(),setTimeout((()=>$()),Math.floor(1201*Math.random())+300)}catch(n){alert("City not found"),setTimeout((()=>$()),Math.floor(1201*Math.random())+300)}var e,t}function $(){x.style.display="none"}function z(n,e){return{id:Date.now().toString(),humidity:n.forecast.forecastday[e].hour[0].humidity,wind:n.forecast.forecastday[e].hour[0].wind_kph,feelslike:n.forecast.forecastday[e].hour[0].feelslike_c,date:n.forecast.forecastday[e].date,city:n.location.name,country:n.location.country,icon:n.forecast.forecastday[e].hour[0].condition.icon,temp:n.forecast.forecastday[e].hour[0].temp_c,condition:n.forecast.forecastday[e].hour[0].condition.text}}function D(n){for(;n.firstChild;)n.removeChild(n.firstChild)}function q(){localStorage.setItem(w,JSON.stringify(L)),localStorage.setItem(k,E),localStorage.setItem(C,T),function(){D(h),L.forEach((n=>{const e=document.createElement("div");e.id=n.id,e.classList.add("choose"),e.innerText=j(n.date).slice(0,3);const t=document.createElement("img");t.src=n.icon,t.classList.add("right-icon"),t.id=n.id;const o=document.createElement("div");o.classList.add("temp"),o.innerText=`${n.temp}°C`,n.id===+E&&e.classList.add("choosen"),e.appendChild(t),e.appendChild(o),h.append(e)}));const n=L.find((n=>n.id===+E));(function(n){D(g);const e=document.createElement("div");e.classList.add("humidity"),e.innerText="Humidity";const t=document.createElement("div");t.classList.add("value"),t.innerText=`${n.humidity}%`;const o=document.createElement("div");o.innerText="Wind",o.classList.add("wind");const r=document.createElement("div");r.classList.add("value"),r.innerText=`${n.wind} km/h`;const i=document.createElement("div");i.innerText="Feels like",i.classList.add("feelslike");const a=document.createElement("div");a.classList.add("value"),a.innerText=`${n.feelslike}°C`,e.appendChild(t),o.appendChild(r),i.appendChild(a),g.appendChild(e),g.appendChild(o),g.appendChild(i)})(n.full),function(n){D(b);const e=document.createElement("div");e.classList.add("left-top");const t=document.createElement("div");t.classList.add("dayDate");const o=document.createElement("div");o.classList.add("day"),o.innerText=j(n.date);const r=document.createElement("div");r.classList.add("date"),r.innerText=function(n){const e=new Date(n);return`${e.getDate().toString().padStart(2,"0")} ${new Intl.DateTimeFormat("en-US",{month:"short"}).format(e)} ${e.getFullYear()}`}(n.date);const i=document.createElement("img");i.src=n.icon,i.classList.add("icon");const a=document.createElement("div");a.classList.add("left-temp"),a.innerText=`${n.temp}°C`;const s=document.createElement("div");s.classList.add("condition"),s.innerText=n.condition;const c=document.createElement("div");c.classList.add("location"),c.innerText=`${n.city}, ${n.country}`;const d=document.createElement("div");d.classList.add("left-bottom"),t.appendChild(o),t.appendChild(r),t.appendChild(c),e.appendChild(t),d.appendChild(a),d.appendChild(s),b.appendChild(e),b.appendChild(d)}(n.full)}()}y.addEventListener("click",(n=>{if(n.preventDefault(),I){if(""===v.value)return;T=v.value,M(T),I=0,v.value="",y.classList.toggle("right-btn-after-click"),y.innerHTML="Choose location",E=0}else y.classList.toggle("right-btn-after-click"),y.innerHTML='<i class="fi fi-rr-search"></i>',I=1})),h.addEventListener("click",(n=>{E=n.target.id,q()})),navigator.geolocation.getCurrentPosition((async n=>{const e=await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${n.coords.latitude}&lon=${n.coords.longitude}&format=json`),t=(await e.json()).address.city;T||(T=t,localStorage.setItem(C,T),M(T),console.log("succsec"))}),(n=>{alert("Can't find your location",n)})),M(T)})()})();