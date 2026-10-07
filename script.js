// Preloader
(function(){var p=0,bar=document.getElementById('preloaderBar'),pct=document.getElementById('preloaderPct'),pre=document.getElementById('preloader');var t=setInterval(function(){p=Math.min(100,p+Math.random()*16);bar.style.width=p+'%';pct.textContent=Math.floor(p)+'%';if(p>=100){clearInterval(t);setTimeout(function(){pre.classList.add('hide')},350)}},120)})();
// Typed roles
(function(){var roles=['UI / Front-End Developer','Senior Engineering Lead','ReactJS Specialist','Angular Expert','TypeScript Craftsman','Responsive UI Magician'];var el=document.getElementById('typed');var ri=0,ci=0,del=false;function tick(){var word=roles[ri];el.textContent=word.slice(0,ci);if(!del){ci++;if(ci>word.length){del=true;return setTimeout(tick,1600)}}else{ci--;if(ci===0){del=false;ri=(ri+1)%roles.length}}setTimeout(tick,del?38:72)}tick()})();
// Reveal on scroll + skill bars + counters
(function(){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');e.target.querySelectorAll('.bar-track span').forEach(function(s){s.style.width=s.style.getPropertyValue('--w')});e.target.querySelectorAll('.counter').forEach(runCounter);if(e.target.classList.contains('counter'))runCounter(e.target);io.unobserve(e.target)}})},{threshold:.15});document.querySelectorAll('.reveal,.bar-track,.hero-stats').forEach(function(el){io.observe(el)});
// Particles canvas
(function(){var c=document.getElementById('particles');if(!c)return;var x=c.getContext('2d');var W,H,pts=[];function size(){var r=c.parentElement.getBoundingClientRect();W=c.width=r.width;H=c.height=r.height}size();window.addEventListener('resize',size);
for(var i=0;i<90;i++)pts.push({x:Math.random()*2000,y:Math.random()*1200,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5,r:Math.random()*2.2+.6,h:Math.random()<.5?'0,229,255':'124,92,255'});
(function loop(){x.clearRect(0,0,W,H);pts.forEach(function(p){p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;var sx=p.x*(W/2000)||p.x%W,sy=p.y*(H/1200)||p.y%H;x.beginPath();x.arc(p.x%W,p.y%H,p.r,0,7);x.fillStyle='rgba('+p.h+',.8)';x.fill()});requestAnimationFrame(loop)})})();

// Nav: scroll state, hamburger, active link, progress, to-top
(function(){var nav=document.getElementById('nav'),ham=document.getElementById('hamburger'),links=document.getElementById('navLinks'),bar=document.getElementById('scrollProgressBar'),top=document.getElementById('toTop');
ham.addEventListener('click',function(){links.classList.toggle('open')});links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){links.classList.remove('open')})});
window.addEventListener('scroll',function(){var y=window.scrollY;var h=document.documentElement.scrollHeight-window.innerHeight;bar.style.width=(h>0?(y/h*100):0)+'%';top.classList.toggle('show',y>700);
var secs=['home','about','experience','skills','education','certifications','awards','contact'];var cur='home';secs.forEach(function(id){var s=document.getElementById(id);if(s&&s.getBoundingClientRect().top<160)cur=id});
links.querySelectorAll('a').forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+cur)})},{passive:true});
top.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})})})();
// Cursor + 3D tilt on profile
(function(){var dot=document.getElementById('cursorDot'),glow=document.getElementById('cursorGlow');if(matchMedia('(pointer:coarse)').matches){dot.style.display='none';glow.style.display='none';return}
var mx=0,my=0,gx=0,gy=0;window.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});(function f(){gx+=(mx-gx)*.14;gy+=(my-gy)*.14;glow.style.left=gx+'px';glow.style.top=gy+'px';requestAnimationFrame(f)})();
var card=document.getElementById('tiltCard'),img=card?card.querySelector('.profile-img'):null;if(!card||!img)return;
card.addEventListener('mousemove',function(e){var r=card.getBoundingClientRect();var px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;img.style.transform='rotateY('+(px*14)+'deg) rotateX('+(-py*14)+'deg) scale(1.03)'});card.addEventListener('mouseleave',function(){img.style.transform='rotateY(0) rotateX(0) scale(1)'})})();
// Contact form -> mailto
(function(){var f=document.getElementById('contactForm');if(!f)return;f.addEventListener('submit',function(e){e.preventDefault();var n=f.name.value.trim(),em=f.email.value.trim(),m=f.message.value.trim();
window.location.href='mailto:lalitpatil80@gmail.com?subject='+encodeURIComponent('Portfolio enquiry from '+n)+'&body='+encodeURIComponent(m+'\n\n— '+n+' ('+em+')');document.getElementById('formNote').textContent='Opening your mail app... thanks '+ (n||'friend') +'! I reply fast at lalitpatil80@gmail.com / +91 97309 03411.'})})();

function runCounter(el){if(el.dataset.done)return;el.dataset.done='1';var target=+el.dataset.target;var start=null;function step(ts){if(!start)start=ts;var p=Math.min(1,(ts-start)/1400);el.textContent=Math.floor(target*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step);else el.textContent=target}requestAnimationFrame(step)}})();
