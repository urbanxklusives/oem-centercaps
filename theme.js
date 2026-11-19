(function(){
  var KEY='oem-theme';
  function apply(t){document.documentElement.setAttribute('data-theme',t);
    var b=document.getElementById('themeToggle');
    if(b){b.textContent=(t==='light')?'\u{1F319} Dark':'\u2600\uFE0F Light';b.setAttribute('aria-label','Switch colour theme');}}
  var saved='dark';
  try{saved=localStorage.getItem(KEY)||'dark';}catch(e){}
  apply(saved);
  document.addEventListener('DOMContentLoaded',function(){
    apply(saved);
    var b=document.getElementById('themeToggle');
    if(b){b.addEventListener('click',function(){
      var cur=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';
      try{localStorage.setItem(KEY,cur);}catch(e){}
      apply(cur);
    });}
  });
})();
