/* Socialfix · Practice quiz renderer
 * Reads <div id="quizList" data-cat="study|family|life"> from the host page,
 * filters window.SCENES by that cat and renders collapsible questions. */
(function(){
  const list = document.getElementById('quizList');
  if(!list) return;
  const cat = list.dataset.cat;
  const scenes = (window.SCENES || []).filter(function(s){ return s.cat === cat; });
  if(!scenes.length) return;

  const letters = ['A','B','C','D'];
  const icons = { good:'🌟', mid:'💭', bad:'⚠️' };
  const labels = { good:'非常好的选择', mid:'可以再想想', bad:'这样的话' };

  scenes.forEach(function(s, i){
    const el = document.createElement('details');
    el.className = 'quiz';
    if(i === 0) el.open = true;

    const summary = document.createElement('summary');
    summary.innerHTML =
      '<span class="quiz-index">'+String(i+1).padStart(2,'0')+'</span>' +
      '<span class="quiz-title">'+s.title+'</span>' +
      '<span class="quiz-toggle">+</span>';
    el.appendChild(summary);

    const body = document.createElement('div');
    body.className = 'quiz-body';
    body.innerHTML =
      '<div class="p-scene">'+s.scene+'</div>' +
      '<div class="p-quote">'+s.quote+'</div>' +
      '<div class="p-choices-label">你会怎么回？</div>' +
      '<div class="p-choices"></div>' +
      '<div class="p-feedback-wrap"></div>';
    el.appendChild(body);

    const choicesEl = body.querySelector('.p-choices');
    const fbWrap = body.querySelector('.p-feedback-wrap');
    let answered = false;

    s.choices.forEach(function(c, idx){
      const btn = document.createElement('button');
      btn.className = 'p-choice';
      btn.type = 'button';
      btn.innerHTML =
        '<span class="p-choice-letter">'+letters[idx]+'</span>' +
        '<span>'+c.text+'</span>';
      btn.addEventListener('click', function(){
        if(answered) return;
        answered = true;
        el.querySelectorAll('.p-choice').forEach(function(b, j){
          if(j === idx) b.classList.add('selected');
          else b.classList.add('disabled');
        });
        const fb = document.createElement('div');
        fb.className = 'p-feedback ' + c.kind;
        fb.innerHTML =
          '<div class="p-feedback-top">' +
            '<div class="p-feedback-icon">'+icons[c.kind]+'</div>' +
            '<div>' +
              '<div class="p-feedback-label">'+labels[c.kind]+'</div>' +
              '<div class="p-feedback-title">'+c.head+'</div>' +
            '</div>' +
          '</div>' +
          '<div class="p-feedback-body">'+c.body+'</div>' +
          '<div class="p-feedback-tip">'+c.tip+'</div>';
        fbWrap.appendChild(fb);
      });
      choicesEl.appendChild(btn);
    });

    list.appendChild(el);
  });
})();
