(function(){function r(e,r){return[].slice.call((r||document).querySelectorAll(e))};if(window.addEventListener){var e=window.StyleFix={link:function(r){var i=r.href||r.getAttribute('data-href');try{if(!i||'stylesheet'!==r.rel||r.hasAttribute('data-noprefix'))return}catch(p){return};var n=i.replace(/[^\/]+$/,''),o=(/^[a-z]{3,10}:/.exec(n)||[''])[0],s=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(n)||[''])[0],u=/^([^?]*)\??/.exec(i)[1],l=r.parentNode,t=new XMLHttpRequest,a;t.onreadystatechange=function(){4===t.readyState&&a()};a=function(){var a=t.responseText;if(a&&r.parentNode&&(!t.status||400>t.status||600<t.status)){if((a=e.fix(a,!0,r))&&n)var a=a.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(e,t,r){return/^([a-z]{3,10}:|#)/i.test(r)?e:/^\/\//.test(r)?'url("'+o+r+'")':/^\//.test(r)?'url("'+s+r+'")':/^\?/.test(r)?'url("'+u+r+'")':'url("'+n+r+'")'}),i=n.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,'\\$1'),a=a.replace(RegExp('\\b(behavior:\\s*?url\\(\'?"?)'+i,'gi'),'$1');i=document.createElement('style');i.textContent='/*# sourceURL='+r.getAttribute('href')+' */\n/*@ sourceURL='+r.getAttribute('href')+' */\n'+a;i.media=r.media;i.disabled=r.disabled;i.setAttribute('data-href',r.getAttribute('href'));r.id&&(i.id=r.id);l.insertBefore(i,r);l.removeChild(r);i.media=r.media}};try{t.open('GET',i),t.send(null)}catch(p){'undefined'!=typeof XDomainRequest&&(t=new XDomainRequest,t.onerror=t.onprogress=function(){},t.onload=a,t.open('GET',i),t.send(null))};r.setAttribute('data-inprogress','')},styleElement:function(r){if(!r.hasAttribute('data-noprefix')){var t=r.disabled;r.textContent=e.fix(r.textContent,!0,r);r.disabled=t}},styleAttribute:function(r){var t=r.getAttribute('style'),t=e.fix(t,!1,r);r.setAttribute('style',t)},process:function(){r('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);r('style').forEach(StyleFix.styleElement);r('[style]').forEach(StyleFix.styleAttribute)},register:function(r,t){(e.fixers=e.fixers||[]).splice(void 0===t?e.fixers.length:t,0,r)},fix:function(r,t,n){if(e.fixers)for(var i=0;i<e.fixers.length;i++)r=e.fixers[i](r,t,n)||r;return r},camelCase:function(e){return e.replace(/-([a-z])/g,function(e,r){return r.toUpperCase()}).replace('-','')},deCamelCase:function(e){return e.replace(/[A-Z]/g,function(e){return'-'+e.toLowerCase()})}};(function(){setTimeout(function(){r('link[rel="stylesheet"]').forEach(StyleFix.link)},10);document.addEventListener('DOMContentLoaded',StyleFix.process,!1)})()}})();(function(r){function t(r,t,n,a,i){r=e[r];r.length&&(r=RegExp(t+'('+r.join('|')+')'+n,'gi'),i=i.replace(r,a));return i};if(window.StyleFix&&window.getComputedStyle){var e=window.PrefixFree={prefixCSS:function(r,n,a){var i=e.prefix;-1<e.functions.indexOf('linear-gradient')&&(r=r.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig,function(e,r,t,n){return r+(t||'')+'linear-gradient('+(90-n)+'deg'}));r=t('functions','(\\s|:|,)','\\s*\\(','$1'+i+'$2(',r);r=t('keywords','(\\s|:)','(\\s|;|\\}|$)','$1'+i+'$2$3',r);r=t('properties','(^|\\{|\\s|;)','\\s*:','$1'+i+'$2:',r);if(e.properties.length){var l=RegExp('\\b('+e.properties.join('|')+')(?!:)','gi');r=t('valueProperties','\\b',':(.+?);',function(e){return e.replace(l,i+'$1')},r)};n&&(r=t('selectors','','\\b',e.prefixSelector,r),r=t('atrules','@','\\b','@'+i+'$1',r));r=r.replace(RegExp('-'+i,'g'),'-');return r=r.replace(/-\*-(?=[a-z]+)/gi,e.prefix)},property:function(r){return(0<=e.properties.indexOf(r)?e.prefix:'')+r},value:function(r,n){r=t('functions','(^|\\s|,)','\\s*\\(','$1'+e.prefix+'$2(',r);r=t('keywords','(^|\\s)','(\\s|$)','$1'+e.prefix+'$2$3',r);0<=e.valueProperties.indexOf(n)&&(r=t('properties','(^|\\s|,)','($|\\s|,)','$1'+e.prefix+'$2$3',r));return r},prefixSelector:function(r){return e.selectorMap[r]||r},prefixProperty:function(r,t){var n=e.prefix+r;return t?StyleFix.camelCase(n):n}};(function(){var o={},i=[],t=getComputedStyle(document.documentElement,null),a=document.createElement('div').style,u=function(e){if('-'===e.charAt(0)){i.push(e);e=e.split('-');var r=e[1];for(o[r]=++o[r]||1;3<e.length;)e.pop(),r=e.join('-'),StyleFix.camelCase(r)in a&&-1===i.indexOf(r)&&i.push(r)}};if(t&&0<t.length)for(var r=0;r<t.length;r++)u(t[r]);else for(var l in t)u(StyleFix.deCamelCase(l));var r=0,n,s;for(s in o)t=o[s],r<t&&(n=s,r=t);e.prefix='-'+n+'-';e.Prefix=StyleFix.camelCase(e.prefix);e.properties=[];for(r=0;r<i.length;r++)l=i[r],0===l.indexOf(e.prefix)&&(n=l.slice(e.prefix.length),StyleFix.camelCase(n)in a||e.properties.push(n));!('Ms'!=e.Prefix||'transform'in a||'MsTransform'in a)&&'msTransform'in a&&e.properties.push('transform','transform-origin');e.properties.sort()})();(function(){function l(e,r){o[r]='';o[r]=e;return!!o[r]};var r={'linear-gradient':{property:'backgroundImage',params:'red, teal'},calc:{property:'width',params:'1px + 5%'},element:{property:'backgroundImage',params:'#foo'},'cross-fade':{property:'backgroundImage',params:'url(a.png), url(b.png), 50%'},'image-set':{property:'backgroundImage',params:'url(a.png) 1x, url(b.png) 2x'}};r['repeating-linear-gradient']=r['repeating-radial-gradient']=r['radial-gradient']=r['linear-gradient'];var s={initial:'color',grab:'cursor',grabbing:'cursor','zoom-in':'cursor','zoom-out':'cursor',box:'display',flexbox:'display','inline-flexbox':'display',flex:'display','inline-flex':'display',grid:'display','inline-grid':'display','max-content':'width','min-content':'width','fit-content':'width','fill-available':'width','contain-floats':'width'};e.functions=[];e.keywords=[];var o=document.createElement('div').style,a;for(a in r){var t=r[a],n=t.property,t=a+'('+t.params+')';!l(t,n)&&l(e.prefix+t,n)&&e.functions.push(a)};for(var i in s)n=s[i],!l(i,n)&&l(e.prefix+i,n)&&e.keywords.push(i)})();(function(){function i(e){o.textContent=e+'{}';return!!o.sheet.cssRules.length};var t={':any-link':null,'::backdrop':null,':fullscreen':null,':full-screen':':fullscreen','::placeholder':null,':placeholder':'::placeholder','::input-placeholder':'::placeholder',':input-placeholder':'::placeholder',':read-only':null,':read-write':null,'::selection':null},u={keyframes:'name',viewport:null,document:'regexp(".")'};e.selectors=[];e.selectorMap={};e.atrules=[];var o=r.appendChild(document.createElement('style')),n;for(n in t){var l=t[n]||n,s=n.replace(/::?/,function(r){return r+e.prefix});!i(l)&&i(s)&&(e.selectors.push(l),e.selectorMap[l]=s)};for(var a in u)t=a+' '+(u[a]||''),!i('@'+t)&&i('@'+e.prefix+t)&&e.atrules.push(a);r.removeChild(o)})();e.valueProperties=['transition','transition-property','will-change'];r.className+=' '+e.prefix;StyleFix.register(e.prefixCSS)}})(document.documentElement);