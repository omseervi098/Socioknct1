if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>a(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/543-2371d3f0201dba6d.js",revision:"2371d3f0201dba6d"},{url:"/_next/static/chunks/555-afc258c77d586dfe.js",revision:"afc258c77d586dfe"},{url:"/_next/static/chunks/633-baeda455d95dfd20.js",revision:"baeda455d95dfd20"},{url:"/_next/static/chunks/763-0d91072be2b24524.js",revision:"0d91072be2b24524"},{url:"/_next/static/chunks/framework-5429a50ba5373c56.js",revision:"5429a50ba5373c56"},{url:"/_next/static/chunks/main-10ab4a7bcabe4d6a.js",revision:"10ab4a7bcabe4d6a"},{url:"/_next/static/chunks/pages/_app-590c8a71a49743f5.js",revision:"590c8a71a49743f5"},{url:"/_next/static/chunks/pages/_error-5a00309fd5f4b49e.js",revision:"5a00309fd5f4b49e"},{url:"/_next/static/chunks/pages/bookmarks-391d7d65db41a9ee.js",revision:"391d7d65db41a9ee"},{url:"/_next/static/chunks/pages/chat-30426dba15e6b42e.js",revision:"30426dba15e6b42e"},{url:"/_next/static/chunks/pages/feed-0df1b4e5e3f8382a.js",revision:"0df1b4e5e3f8382a"},{url:"/_next/static/chunks/pages/index-3257467b679d4683.js",revision:"3257467b679d4683"},{url:"/_next/static/chunks/pages/login-c5069de1a7c83bcb.js",revision:"c5069de1a7c83bcb"},{url:"/_next/static/chunks/pages/notification-7bc98b54d23f1f18.js",revision:"7bc98b54d23f1f18"},{url:"/_next/static/chunks/pages/post-6b2ed08ca70151a5.js",revision:"6b2ed08ca70151a5"},{url:"/_next/static/chunks/pages/profile-97c6788c59cbe750.js",revision:"97c6788c59cbe750"},{url:"/_next/static/chunks/pages/settings-3e73eb91a5c90736.js",revision:"3e73eb91a5c90736"},{url:"/_next/static/chunks/pages/signup-3e5cec3a3a32fd2e.js",revision:"3e5cec3a3a32fd2e"},{url:"/_next/static/chunks/pages/verify-dbf04fb45af163b9.js",revision:"dbf04fb45af163b9"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-6be5ec85d3b45345.js",revision:"6be5ec85d3b45345"},{url:"/_next/static/css/88cc4b2e18cfea85.css",revision:"88cc4b2e18cfea85"},{url:"/_next/static/css/bab7addd01b7b167.css",revision:"bab7addd01b7b167"},{url:"/_next/static/eJhQNt-0Qupm1p7XXoytB/_buildManifest.js",revision:"9b47ff639a13879d01a256721e9498d1"},{url:"/_next/static/eJhQNt-0Qupm1p7XXoytB/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/0484562807a97172-s.p.woff2",revision:"b550bca8934bd86812d1f5e28c9cc1de"},{url:"/_next/static/media/0a03a6d30c07af2e-s.woff2",revision:"79da53ebaf3308c806394df4882b343d"},{url:"/_next/static/media/30cd8f99d32fa6e8-s.woff2",revision:"e5c1b944d9e3380a062bf911e26728a3"},{url:"/_next/static/media/46c21389e888bf13-s.woff2",revision:"272930c09ba14c81bb294be1fe18b049"},{url:"/_next/static/media/8888a3826f4a3af4-s.p.woff2",revision:"792477d09826b11d1e5a611162c9797a"},{url:"/_next/static/media/b957ea75a84b6ea7-s.p.woff2",revision:"0bd523f6049956faaf43c254a719d06a"},{url:"/_next/static/media/eafabf029ad39a43-s.p.woff2",revision:"43751174b6b810eb169101a20d8c26f8"},{url:"/_next/static/media/f5767adec246cdc1-s.woff2",revision:"7a1c6501aa2b3327c1cf556362a851cb"},{url:"/_next/static/media/pdf.worker.min.71d103d1.js",revision:"71d103d1"},{url:"/favicon.ico",revision:"3d7da54e7d959bc106bad01a04ea6c59"},{url:"/icons/article.png",revision:"872b9c46de51b065dfe4fd60e014cc35"},{url:"/icons/document.png",revision:"3374a9c30d0b8f894370c39a49e707fc"},{url:"/icons/music.png",revision:"3db6012bfbdf05d03c0ed42cabea3e77"},{url:"/icons/musicanimation.gif",revision:"95b8b41b149a4a816d7ba352ceba187f"},{url:"/icons/musicanimationstop.png",revision:"79be4e2d97cb8d42080d2bfc8e571079"},{url:"/icons/output-onlinegiftools.png",revision:"137f632197efc2d5329970b486e8c010"},{url:"/icons/photo.png",revision:"8d470781cd5308603721bed5db4f099d"},{url:"/icons/poll.png",revision:"380b63481b8547b29515c0b017099404"},{url:"/icons/speakericon.gif",revision:"f1d6c749bd7374cb0a7fbe2758e3e088"},{url:"/icons/video.png",revision:"7cceb66b7423df3f9c09d9d839f8883d"},{url:"/login.jpg",revision:"506c1853e357d16720f3a579645ec55a"},{url:"/logo128.png",revision:"c601eb41839aa132328c74c6898c685b"},{url:"/logo192.png",revision:"cccf674b7081c4afb2fb55e4c900fad1"},{url:"/logo2.png",revision:"68eeb6a55bd1226c02954c37ea76a1e3"},{url:"/logo2_bg.png",revision:"59e1f33e83d493bbed49c195e2610d48"},{url:"/logo500.png",revision:"48a83ae89dfcf7232335db2226b13164"},{url:"/manifest.json",revision:"2027925d134a506076f583772626b322"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
