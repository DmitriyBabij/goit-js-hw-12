import{a as L,S as b,i as c}from"./assets/vendor-D0cagnvz.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function r(t){if(t.ep)return;t.ep=!0;const e=n(t);fetch(t.href,e)}})();const v="47491725-6916c20f65c7c72c223d91484",w="https://pixabay.com/api/";let m=1;async function l(s){const o=`${w}?key=${v}&q=${s}&image_type=photo&orientation=horizontal&safesearch=true&page=${m}&per_page=15`;try{return(await L.get(o)).data}catch(n){throw console.error("Error fetching images:",n),n}}function d(){m+=1}function q(){m=1}const S=new b(".gallery a");function u(s){const o=document.querySelector(".gallery"),n=s.map(({webformatURL:r,largeImageURL:t,tags:e,likes:i,views:y,comments:g,downloads:p})=>`
        <a href="${t}" class="gallery-item">
          <img src="${r}" alt="${e}" />
          <div class="info">
            <p class="info-item"><b>Likes:</b> ${i}</p>
            <p class="info-item"><b>Views:</b> ${y}</p>
            <p class="info-item"><b>Comments:</b> ${g}</p>
            <p class="info-item"><b>Downloads:</b> ${p}</p>
          </div>
        </a>
      `).join("");o.insertAdjacentHTML("beforeend",n),S.refresh()}function a(){const s=document.querySelector(".gallery");s.innerHTML="",c.error({title:"Sorry",message:"There are no images matching your search query. Please try again!"})}function h(){document.querySelector(".loader").classList.remove("hidden")}function f(){document.querySelector(".loader").classList.add("hidden")}document.addEventListener("DOMContentLoaded",()=>{const s=document.querySelector(".search-form"),o=document.querySelector(".search-input"),n=document.querySelector(".gallery"),r=document.createElement("button");r.textContent="Load more",r.classList.add("load-more","hidden"),document.body.appendChild(r),r.addEventListener("click",async()=>{const t=o.value.trim();h();try{const e=await l(t);if(e.hits.length===0){a();return}u(e.hits),d(),e.totalHits<=n.children.length&&(r.classList.add("hidden"),c.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})),window.scrollBy({top:document.querySelector(".gallery").getBoundingClientRect().height*2,behavior:"smooth"})}catch{a()}finally{f()}}),s.addEventListener("submit",async t=>{t.preventDefault();const e=o.value.trim();if(e===""){c.warning({title:"Warning",message:"Please enter a search term."});return}n.innerHTML="",q(),r.classList.add("hidden"),h();try{const i=await l(e);if(i.hits.length===0){a();return}u(i.hits),d(),r.classList.remove("hidden"),i.totalHits<=15&&(r.classList.add("hidden"),c.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}))}catch{a()}finally{f(),o.focus()}}),r.addEventListener("click",async()=>{const t=o.value.trim();h();try{const e=await l(t);if(e.hits.length===0){a();return}u(e.hits),d(),e.totalHits<=n.children.length&&(r.classList.add("hidden"),c.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})),window.scrollBy({top:document.querySelector(".gallery").getBoundingClientRect().height*2,behavior:"smooth"})}catch{a()}finally{f(),o.focus()}})});
//# sourceMappingURL=index.js.map
