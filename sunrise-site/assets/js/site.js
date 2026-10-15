(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // scroll reveal
  var revealEls = document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(function(){ entry.target.classList.add('in'); }, delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function(el){ io.observe(el); });
    setTimeout(function(){
      revealEls.forEach(function(el){ el.classList.add('in'); });
    }, 4000);
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  // count-up stats
  function countUp(el, target){
    if(reduceMotion){ el.textContent = target.toLocaleString(); return; }
    var start = null, duration = 1800;
    function step(ts){
      if(!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var statEls = document.querySelectorAll('[data-count]');
  if('IntersectionObserver' in window){
    var statIo = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          countUp(entry.target, parseInt(entry.target.getAttribute('data-count'), 10));
          statIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statEls.forEach(function(el){ statIo.observe(el); });
  }

  // schools progress bar
  var bar = document.getElementById('progress-bar');
  if(bar && 'IntersectionObserver' in window){
    var barIo = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          requestAnimationFrame(function(){ bar.classList.add('go'); });
          barIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    barIo.observe(bar);
  }

  // hero word rotator
  var words = ['Lagos', 'Abuja', 'Owerri', 'Dallas', 'Plano', 'Addison', 'Richardson', 'Uptown', 'Downtown', 'Enugu', 'Anambra'];
  var colors = ['var(--orange)', 'var(--orange)', 'var(--orange)', 'var(--teal)', 'var(--teal)', 'var(--teal)', 'var(--teal)', 'var(--teal)', 'var(--teal)', 'var(--orange)', 'var(--orange)'];
  var wi = 0;
  var rotatorEl = document.getElementById('rotator-word');
  if(rotatorEl && !reduceMotion){
    setInterval(function(){
      rotatorEl.classList.add('leaving');
      setTimeout(function(){
        wi = (wi + 1) % words.length;
        rotatorEl.textContent = words[wi];
        rotatorEl.style.borderBottomColor = colors[wi];
        rotatorEl.classList.remove('leaving');
      }, 300);
    }, 2200);
  }

  // hero parallax
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  if(!reduceMotion && parallaxEls.length){
    window.addEventListener('scroll', function(){
      var y = window.scrollY;
      parallaxEls.forEach(function(el){
        var factor = parseFloat(el.getAttribute('data-parallax'));
        el.style.transform = 'translateY(' + (y * factor) + 'px)';
      });
    }, { passive: true });
  }

  // donation widget
  var freq = 'Monthly', fund = 'Where needed most', amt = 50;
  var impactMap = {
    25: 'buys school supplies for a student',
    50: 'stocks a family resource kit',
    100: 'funds desks for a new classroom',
    250: 'moves a student closer to a full scholarship'
  };
  function renderDonate(){
    var impactEl = document.getElementById('impact-line');
    var giveBtn = document.getElementById('give-btn');
    if(!impactEl || !giveBtn) return;
    var line = '$' + amt + (freq === 'Monthly' ? '/month' : '') + ' ' + impactMap[amt] + '. Going to: ' + fund + '.';
    impactEl.textContent = line;
    giveBtn.textContent = 'Give $' + amt + (freq === 'Monthly' ? ' monthly' : '') + ' →';
  }
  document.querySelectorAll('#freq-toggle button').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('#freq-toggle button').forEach(function(b){ b.classList.remove('on'); b.setAttribute('aria-pressed','false'); });
      btn.classList.add('on'); btn.setAttribute('aria-pressed','true');
      freq = btn.getAttribute('data-freq');
      var tm = document.getElementById('thanks-msg'); if(tm) tm.style.display = 'none';
      renderDonate();
    });
  });
  document.querySelectorAll('#fund-row .chip').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('#fund-row .chip').forEach(function(b){ b.classList.remove('on'); b.setAttribute('aria-pressed','false'); });
      btn.classList.add('on'); btn.setAttribute('aria-pressed','true');
      fund = btn.getAttribute('data-fund');
      var tm = document.getElementById('thanks-msg'); if(tm) tm.style.display = 'none';
      renderDonate();
    });
  });
  document.querySelectorAll('#amt-row button').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('#amt-row button').forEach(function(b){ b.classList.remove('on'); b.setAttribute('aria-pressed','false'); });
      btn.classList.add('on'); btn.setAttribute('aria-pressed','true');
      amt = parseInt(btn.getAttribute('data-amt'), 10);
      var tm = document.getElementById('thanks-msg'); if(tm) tm.style.display = 'none';
      renderDonate();
    });
  });
  var giveBtnEl = document.getElementById('give-btn');
  if(giveBtnEl){
    giveBtnEl.addEventListener('click', function(){
      document.getElementById('thanks-msg').style.display = 'block';
    });
  }
  document.querySelectorAll('[data-fund="Schools in Africa"]').forEach(function(el){
    if(el.tagName === 'A'){
      el.addEventListener('click', function(){
        var chip = document.querySelector('#fund-row .chip[data-fund="Schools in Africa"]');
        if(chip) chip.click();
      });
    }
  });
  renderDonate();

  // volunteer form
  var interests = [];
  document.querySelectorAll('#interest-row .chip').forEach(function(btn){
    btn.addEventListener('click', function(){
      var val = btn.getAttribute('data-interest');
      var idx = interests.indexOf(val);
      if(idx > -1){ interests.splice(idx, 1); btn.classList.remove('on'); btn.setAttribute('aria-pressed','false'); }
      else { interests.push(val); btn.classList.add('on'); btn.setAttribute('aria-pressed','true'); }
    });
  });
  var volSubmit = document.getElementById('vol-submit');
  if(volSubmit){
    volSubmit.addEventListener('click', function(){
      var nameEl = document.getElementById('vol-name');
      var emailEl = document.getElementById('vol-email');
      if(nameEl && !nameEl.value.trim()){ nameEl.focus(); return; }
      if(emailEl && !emailEl.value.trim()){ emailEl.focus(); return; }
      document.getElementById('vol-form').style.display = 'none';
      document.getElementById('vol-success').style.display = 'block';
      document.getElementById('vol-success').setAttribute('tabindex','-1');
      document.getElementById('vol-success').focus();
    });
  }

  // partner contact form (if present)
  var partnerSubmit = document.getElementById('partner-submit');
  if(partnerSubmit){
    partnerSubmit.addEventListener('click', function(){
      var nameEl = document.getElementById('partner-name');
      var emailEl = document.getElementById('partner-email');
      if(nameEl && !nameEl.value.trim()){ nameEl.focus(); return; }
      if(emailEl && !emailEl.value.trim()){ emailEl.focus(); return; }
      var subject = encodeURIComponent('Partnership inquiry: ' + (document.getElementById('partner-org') ? document.getElementById('partner-org').value : ''));
      var body = encodeURIComponent(
        'Name: ' + (nameEl ? nameEl.value : '') + '\n' +
        'Email: ' + (emailEl ? emailEl.value : '') + '\n' +
        'Message: ' + (document.getElementById('partner-message') ? document.getElementById('partner-message').value : '')
      );
      window.location.href = 'mailto:partners@bigafoundation.org?subject=' + subject + '&body=' + body;
    });
  }

  // mobile nav toggle
  var toggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');
  if(toggle && navLinks){
    toggle.addEventListener('click', function(){
      var open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // christmas party countdown
  var xmasTarget = new Date('2026-12-06T15:00:00-06:00').getTime();
  function updateCountdown(){
    var diff = xmasTarget - Date.now();
    var d = document.getElementById('cd-days'), h = document.getElementById('cd-hours'), m = document.getElementById('cd-mins');
    if(!d) return;
    if(diff <= 0){ d.textContent = '0'; h.textContent = '0'; m.textContent = '0'; return; }
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var mins = Math.floor((diff % 3600000) / 60000);
    d.textContent = days; h.textContent = hours; m.textContent = mins;
  }
  if(document.getElementById('cd-days')){
    updateCountdown();
    setInterval(updateCountdown, 60000);
  }

  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
})();
