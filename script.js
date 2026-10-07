/* Lalit Patil portfolio — all content renders from data.json */
(function(){
'use strict';
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function el(id){return document.getElementById(id)}
/* ---- static chrome (runs instantly, before JSON) ---- */
(function preloader(){var p=0,bar=el('preloaderBar'),pct=el('preloaderPct'),pre=el('preloader');var t=setInterval(function(){p=Math.min(100,p+Math.random()*16);if(bar)bar.style.width=p+'%';if(pct)pct.textContent=Math.floor(p)+'%';if(p>=100){clearInterval(t);setTimeout(function(){if(pre)pre.classList.add('hide')},350)}},120)})();
(function particles(){var c=el('particles');if(!c)return;var x=c.getContext('2d');var W,H,pts=[];function size(){var r=c.parentElement.getBoundingClientRect();W=c.width=r.width;H=c.height=r.height}size();window.addEventListener('resize',size);
for(var i=0;i<90;i++)pts.push({x:Math.random()*1600,y:Math.random()*1000,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5,r:Math.random()*2.2+.6,h:Math.random()<.5?'0,229,255':'124,92,255'});
(function loop(){x.clearRect(0,0,W,H);for(var k=0;k<pts.length;k++){var p=pts[k];p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;x.beginPath();x.arc(p.x%W,p.y%H,p.r,0,7);x.fillStyle='rgba('+p.h+',.8)';x.fill()}requestAnimationFrame(loop)})()})();
(function nav(){var ham=el('hamburger'),links=el('navLinks'),bar=el('scrollProgressBar'),top=el('toTop');if(!ham||!links)return;
ham.addEventListener('click',function(){links.classList.toggle('open')});links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){links.classList.remove('open')})});
window.addEventListener('scroll',function(){var y=window.scrollY;var h=document.documentElement.scrollHeight-window.innerHeight;if(bar)bar.style.width=(h>0?(y/h*100):0)+'%';if(top)top.classList.toggle('show',y>700);
var secs=['home','about','experience','skills','lowcode','education','certifications','awards','contact'];var cur='home';secs.forEach(function(id){var s=document.getElementById(id);if(s&&s.getBoundingClientRect().top<160)cur=id});
links.querySelectorAll('a').forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+cur)})},{passive:true});
if(top)top.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})})})();
(function cursor(){var dot=el('cursorDot'),glow=el('cursorGlow');if(!dot||!glow)return;if(matchMedia('(pointer:coarse)').matches){dot.style.display='none';glow.style.display='none';return}
var mx=innerWidth/2,my=200,gx=mx,gy=my;window.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});(function f(){gx+=(mx-gx)*.14;gy+=(my-gy)*.14;glow.style.left=gx+'px';glow.style.top=gy+'px';requestAnimationFrame(f)})()})();
(function tilt(){var card=el('tiltCard');if(!card)return;var img=card.querySelector('.profile-img');if(!img)return;
card.addEventListener('mousemove',function(e){var r=card.getBoundingClientRect();var px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;img.style.transform='rotateY('+(px*14)+'deg) rotateX('+(-py*14)+'deg) scale(1.03)'});card.addEventListener('mouseleave',function(){img.style.transform='rotateY(0) rotateX(0) scale(1)'})})();
/* ---- dynamic render from data.json ---- */
function barHTML(s){return '<div class="bar"><div class="bar-head"><span>'+esc(s.name)+'</span><b>'+s.pct+'%</b></div><div class="bar-track"><span style="--w:'+s.pct+'%"></span></div></div>'}
function render(d){
var P=d.profile||{};
if(el('heroName'))el('heroName').textContent=(P.name||'').toUpperCase();
if(el('heroSummary'))el('heroSummary').innerHTML='Self-motivated IT professional with <strong>10+ years of expertise</strong> in <strong>Angular, ReactJS, TypeScript, JavaScript, HTML/CSS</strong> and responsive web development. Proven leader with strong client interaction, code review and team-building skills.';
if(el('pillText'))el('pillText').textContent='Available for opportunities • '+P.locationShort+' • 12+ yrs';
if(el('heroMeta'))el('heroMeta').innerHTML='<div><span>📧</span><a href="mailto:'+esc(P.email)+'">'+esc(P.email)+'</a></div><div><span>📞</span><a href="tel:'+esc(P.phoneLink)+'">'+esc(P.phoneDisplay)+'</a></div><div><span>💬</span><a href="'+esc(P.whatsapp)+'" target="_blank" rel="noopener">WhatsApp: '+esc(P.phoneDisplay)+'</a></div><div><span>📍</span>'+esc(P.locationShort)+'</div>';
if(el('heroStats'))el('heroStats').innerHTML=(d.stats||[]).map(function(s){return '<div class="stat"><strong><span class="counter" data-target="'+s.value+'">0</span>'+esc(s.suffix||'')+'</strong><small>'+esc(s.label)+'</small></div>'}).join('');
if(el('profileBadge'))el('profileBadge').innerHTML='<strong>'+esc(P.title)+'</strong><span>'+esc(P.currentShort)+'</span>';
if(el('marqueeTrack')){var items=(d.marquee||[]).map(esc).join(' • ')+' • &nbsp;';el('marqueeTrack').innerHTML='<span>'+items+'</span><span>'+items+'</span>'}
if(el('aboutSnapshot'))el('aboutSnapshot').innerHTML='<strong>'+esc(P.name)+'</strong> — '+esc(d.about&&d.about.snapshot||P.snapshot||'');
if(el('aboutInfo'))el('aboutInfo').innerHTML=(d.about.info||[]).map(function(r){var v=r.href?'<a href="'+esc(r.href)+'" target="_blank" rel="noopener">'+esc(r.v)+'</a>':esc(r.v);return '<li><strong>'+esc(r.k)+'</strong><span>'+v+'</span></li>'}).join('');
if(el('aboutTags'))el('aboutTags').innerHTML=(d.about.tags||[]).map(function(t){return '<span>'+esc(t)+'</span>'}).join('');
if(el('aboutStrengths'))el('aboutStrengths').innerHTML=(d.about.strengths||[]).map(function(s){return '<div><i>'+esc(s.icon)+'</i><strong>'+esc(s.t)+'</strong><p>'+esc(s.d)+'</p></div>'}).join('');
if(el('aboutToolbox'))el('aboutToolbox').textContent=d.about.toolbox||'';
if(el('timeline'))el('timeline').innerHTML=(d.experience||[]).map(function(j){return '<article class="t-item reveal"><div class="t-dot"></div><div class="t-card glass"><div class="t-top"><span class="t-date">'+esc(j.date)+'</span>'+(j.badge?'<span class="t-badge now">'+esc(j.badge)+'</span>':'')+'</div><h3>'+esc(j.title)+'</h3><p class="t-company">'+esc(j.company)+'</p><ul>'+j.points.map(function(p){return '<li>'+esc(p)+'</li>'}).join('')+'</ul><div class="tag-row">'+j.tags.map(function(t){return '<span>'+esc(t)+'</span>'}).join('')+'</div></div></article>'}).join('');
if(el('skillsFrameworks'))el('skillsFrameworks').innerHTML=(d.skills.frameworks||[]).map(barHTML).join('');
if(el('skillsLanguages'))el('skillsLanguages').innerHTML=(d.skills.languages||[]).map(barHTML).join('');
if(el('skillsWorkflow'))el('skillsWorkflow').innerHTML=(d.skills.workflow||[]).map(function(w){return '<span>'+esc(w)+'</span>'}).join('');
if(el('skillsAi'))el('skillsAi').textContent=d.skills.aiEdge||'';
if(el('lowcodeEyebrow'))el('lowcodeEyebrow').textContent=d.lowcode.eyebrow||'';
if(el('lowcodeTitle'))el('lowcodeTitle').innerHTML=esc(d.lowcode.title||'')+' <span class="gradient-text">superpower.</span>';
if(el('lowcodeGrid'))el('lowcodeGrid').innerHTML=(d.lowcode.points||[]).map(function(p){return '<div class="card glass lowcode-card reveal"><div class="lc-icon">'+esc(p.icon)+'</div><h3>'+esc(p.t)+'</h3><p style="color:var(--muted);font-size:.9rem">'+esc(p.d)+'</p></div>'}).join('');
if(el('eduGrid'))el('eduGrid').innerHTML=(d.education||[]).map(function(e){return '<div class="card glass edu-card reveal"><div class="edu-icon">'+esc(e.icon)+'</div><span class="t-date">'+esc(e.date)+'</span><h3>'+esc(e.title)+'</h3><p>'+esc(e.place)+'</p></div>'}).join('');
function certHTML(c){return '<div class="card glass cert reveal"><span class="cert-year">'+esc(c.year)+'</span><div class="cert-icon">'+esc(c.icon)+'</div><h3>'+esc(c.title)+'</h3><p>'+esc(c.org)+'</p></div>'}
if(el('certGridExt'))el('certGridExt').innerHTML=(d.certificationsExternal||[]).map(certHTML).join('');
if(el('certGridInt'))el('certGridInt').innerHTML=(d.certificationsInternal||[]).map(certHTML).join('');
if(el('extCount'))el('extCount').textContent='('+(d.certificationsExternal||[]).length+')';
if(el('intCount'))el('intCount').textContent='('+(d.certificationsInternal||[]).length+')';
if(el('certEyebrow'))el('certEyebrow').textContent='Certifications — '+((d.certificationsExternal||[]).length+(d.certificationsInternal||[]).length)+' credentials';
if(el('awardsRow'))el('awardsRow').innerHTML=(d.awards||[]).map(function(a){return '<div class="card glass award reveal"><div class="award-icon">'+esc(a.icon)+'</div><h3>'+esc(a.title)+'</h3><p>'+esc(a.org)+'</p></div>'}).join('');
if(el('contactRows'))el('contactRows').innerHTML='<a class="contact-row" href="mailto:'+esc(P.email)+'"><i>✉</i><div><strong>Email</strong><span>'+esc(P.email)+'</span></div></a><a class="contact-row" href="tel:'+esc(P.phoneLink)+'"><i>📞</i><div><strong>Phone</strong><span>'+esc(P.phoneDisplay)+'</span></div></a><a class="contact-row" href="'+esc(P.whatsapp)+'" target="_blank" rel="noopener"><i>💬</i><div><strong>WhatsApp</strong><span>'+esc(P.phoneDisplay)+' — chat now</span></div></a><a class="contact-row" href="'+esc(P.linkedin)+'" target="_blank" rel="noopener"><i>💼</i><div><strong>LinkedIn</strong><span>'+esc(P.linkedinShort)+' — connect with me</span></div></a><div class="contact-row"><i>📍</i><div><strong>Location</strong><span>'+esc(P.location)+'</span></div></div><div class="contact-row"><i>🎂</i><div><strong>Date of Birth</strong><span>'+esc(P.dob)+'</span></div></div><div class="contact-row"><i>🟢</i><div><strong>Availability</strong><span>'+esc(P.availability)+'</span></div></div>';
if(el('footerCopy'))el('footerCopy').textContent=d.footer||'';
var wa=el('waFloat');if(wa&&P.whatsapp)wa.href=P.whatsapp;
var hw=el('heroWa');if(hw&&P.whatsapp)hw.href=P.whatsapp;
startTyped(d.typedRoles||[]);observeReveals();wireForm(d,P);
}
function startTyped(roles){var t=el('typed');if(!t||!roles.length)return;var ri=0,ci=0,del=false;
(function tick(){var w=roles[ri];t.textContent=w.slice(0,ci);if(!del){ci++;if(ci>w.length){del=true;return setTimeout(tick,1600)}}else{ci--;if(ci===0){del=false;ri=(ri+1)%roles.length}}setTimeout(tick,del?38:72)})()}
function runCounter(node){if(node.dataset.done)return;node.dataset.done='1';var target=+node.dataset.target,start=null;
(function step(ts){if(!start)start=ts;var p=Math.min(1,(ts-start)/1400);node.textContent=Math.floor(target*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step);else node.textContent=target})(performance.now())}

function observeReveals(){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;e.target.classList.add('visible');e.target.querySelectorAll('.bar-track span').forEach(function(s){s.style.width=s.style.getPropertyValue('--w')});e.target.querySelectorAll('.counter').forEach(runCounter);if(e.target.classList.contains('counter'))runCounter(e.target);io.unobserve(e.target)})},{threshold:.12});
document.querySelectorAll('.reveal,.hero-stats').forEach(function(n){io.observe(n)});document.querySelectorAll('.bar-track').forEach(function(n){io.observe(n)})}
function wireForm(d,P){var f=el('contactForm');if(!f||f.dataset.wired)return;f.dataset.wired='1';var btn=el('sendBtn'),note=el('formNote');var endpoint=(d.contact&&d.contact.formEndpoint)||'';
f.addEventListener('submit',function(e){e.preventDefault();
var n=f.name.value.trim(),em=f.email.value.trim(),m=f.message.value.trim();
if(!n||!em||!m){note.textContent='Please fill name, email and message first.';note.className='form-note err';return}
btn.disabled=true;btn.textContent='Sending…';note.textContent='Sending your message…';note.className='form-note';
fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({name:n,email:em,message:m,_subject:'Portfolio Visited - New opportunity is waiting..',_template:'table'})}).then(function(r){return r.json().catch(function(){return{}})}).then(function(){note.textContent='Message sent! Thanks '+n+' — I reply fast at '+P.email+' / '+P.phoneDisplay+'.';note.className='form-note ok';f.reset()}).catch(function(){window.location.href='mailto:'+P.email+'?subject='+encodeURIComponent('Portfolio Visited - New opportunity is waiting..')+'&body='+encodeURIComponent(m+'\n\n— '+n+' ('+em+')');note.textContent='Direct send hiccup — opened your mail app instead. Or WhatsApp me at '+P.phoneDisplay+'.';note.className='form-note err'}).finally(function(){btn.disabled=false;btn.textContent='Send Message'})})}
fetch('data.json').then(function(r){if(!r.ok)throw new Error('json');return r.json()}).then(render).catch(function(){if(el('formNote'))el('formNote').textContent='Could not load data.json — please serve over http (npx serve .) or open via a local server.'});
})();

