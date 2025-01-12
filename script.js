function setmodalContent() {
  var modalContent = document.getElementById('modal-content');

  modalContent.innerHTML = `
    <button id="concours">concoursirat.</button>
    <h3>Disclaimer.</h3>
    <p>Ce site web est créé dans le seul but de regrouper des exemples de concours IRAT et d'aider les candidat(e)s dans leur préparation.</p>
    <p><strong>Aucune affiliation :</strong></p>
    <p>Ce site n'est affilié à aucun organisme, institution ou état spécifique. </p>
    <p><strong>Responsabilité Limitée :</strong></p>
    <p>L'auteur de ce site ne peut être tenu responsable de toute perte, dommage ou préjudice résultant de l'utilisation des informations fournies sur ce site.</p>
    <p><strong>Changements Possibles :</strong></p>
    <p>L'auteur se réserve le droit de modifier le contenu du site à tout moment sans préavis. Il est de la responsabilité des utilisateurs de vérifier régulièrement les mises à jour.</p>
    <p>En utilisant ce site, vous acceptez les termes.</p>
    <button id="notacceptButton" onclick="doNotAccept()">Ne pas Accepter</button>
    <button id="acceptButton" onclick="acceptAndContinue()" disabled>Accepter et Continuer <span id="countdown"></span></button>
  `;
}
  
setmodalContent();

var acceptButton = document.getElementById('acceptButton');
var concours = document.getElementById('concours');
var countdown = 10;

window.onload = function() {
  showModal();
};

function showModal() {
  var modalContainer = document.getElementById('modal-container');
  modalContainer.style.display = 'flex';

  var countdownInterval = setInterval(function() {
    if (countdown <= 1) {
      clearInterval(countdownInterval);
      acceptButton.removeAttribute('disabled');
      acceptButton.style.backgroundColor = '#27ae60';
      concours.style.backgroundColor = '#27ae60';
      document.getElementById('countdown').textContent = '';
    } else {
      countdown--;
      document.getElementById('countdown').textContent = ` ${countdown}`;
    }
  }, 1000); 
}

function acceptAndContinue() {
  hideModal();
}

function doNotAccept() {
  history.back(); 
}
function hideModal() {
  var modalContainer = document.getElementById('modal-container');
  modalContainer.style.display = 'none';
}


function setpsContent() {
  var psContainer = document.getElementById('container-ps');

  psContainer.innerHTML = `
    <div class="block">
      <h2>الشهادة العلمية (60%)</h2>
      <div class="sub-block">
        <label id="label" for="educationLevel">مستوى الشهادة العلمية (30%) </label>
        <select  id="educationLevel" class="required-select">
            <option value="" disabled selected>- اختر مستوى الشهادة -</option>
            <option value="4"> الماستر أو مايعادله بميزة مستحسن فما فوق</option>
            <option value="2"> الماستر أو مايعادله بميزة بميزة مقبول</option>
            <option value="2"> الإجازة أو مايعادلها بميزة مستحسن فما فوق</option>
            <option value="0"> الإجازة أو مايعادلها بميزة بميزة مقبول</option>
        </select>
        <div id="educationLevelMessage" class="error-message"></div>
      </div>
      <div class="sub-block">
        <label id="label" for="major">المسلك (30%) </label>
        <select  id="major" class="required-select">
            <option value="" disabled selected>- اختر المسلك -</option>
            <option value="4"> القانون</option>
            <option value="2"> الاقتصاد</option>
            <option value="1"> باقي التخصصات</option>
        </select>
        <div id="majorMessage" class="error-message"></div>
      </div>
    </div>

    <div class="block">
      <h2>التجربة المهنية (30%)</h2>
      <label id="label" for="experience">التجربة بوزارة الداخلية أو بالجماعات الترابية</label>
      <select  id="experience" class="required-select">
          <option value="" disabled selected>- اختر التجربة المهنية -</option>
          <option value="4"> من سنة إلى 3 سنوات</option>
          <option value="2"> أكثر من 3 سنوات إلى 6 سنوات</option>
          <option value="0"> غير ذلك</option>
      </select>
      <div id="experienceMessage" class="error-message"></div>
    </div>

    <div class="block">
      <h2>السن (10%)</h2>
      <label id="label" for="age">الفئات العمرية</label>
      <select  id="age" class="required-select">
          <option value="" disabled selected>- اختر الفئة العمرية -</option>
          <option value="4"> مابين 25 و 29</option>
          <option value="2"> مابين 30 و 35</option>
          <option value="0"> أقل من 25 سنة</option>
      </select>
      <div id="ageMessage" class="error-message"></div>
    </div>
    <button class="calculate" onclick="calculateScore()">احسب النقاط</button>
    <p id="result"></p>
  `;
}

setpsContent();

function calculateScore() {
  var educationLevelValue = document.getElementById("educationLevel").value.trim();
  var majorValue = document.getElementById("major").value.trim();
  var experienceValue = document.getElementById("experience").value.trim();
  var ageValue = document.getElementById("age").value.trim();

  if (educationLevelValue === "") {
      document.getElementById("educationLevelMessage").innerText = "الرجاء اختيار مستوى الشهادة";
      return;
  } else {
      document.getElementById("educationLevelMessage").innerText = "";
  }

  if (majorValue === "") {
      document.getElementById("majorMessage").innerText = "الرجاء اختيار المسلك";
      return;
  } else {
      document.getElementById("majorMessage").innerText = "";
  }

  if (experienceValue === "") {
      document.getElementById("experienceMessage").innerText = "الرجاء اختيار التجربة المهنية";
      return;
  } else {
      document.getElementById("experienceMessage").innerText = "";
  }

  if (ageValue === "") {
      document.getElementById("ageMessage").innerText = "الرجاء  اختيارالفئة العمرية";
      return;
  } else {
      document.getElementById("ageMessage").innerText = "";
  }

  var educationLevelWeight = 0.3;    
  var majorWeight = 0.3;
  var experienceWeight = 0.3;
  var ageWeight = 0.1;

  var weightedSum = educationLevelValue * educationLevelWeight + majorValue * majorWeight + experienceValue * experienceWeight + ageValue * ageWeight;

  var totalPoints = 4;

  const resultContainer =  document.getElementById("result");
  resultContainer.innerText = "";
  resultContainer.innerHTML = `<span>${weightedSum.toFixed(2)}</span> / ${totalPoints}`;
}


function settimerdalContent() {
  var timerdalContent = document.getElementById('timer-dal');

  timerdalContent.innerHTML = `
    <h1><i class="fas fa-file-alt"></i> Dissertation en Langue Arabe</h1>
    <div class="timer-controls" id="timer-controls-dal">
      <button class="startPauseButton" onclick="startPause('dal')">
        <i class="fas fa-play"></i>
      </button>
      <div class="timer-display" id="timer-dal-display">03:00:00</div>
      <button class="resetButton" onclick="resetTimer('dal')">
        <i class="fas fa-undo"></i>
      </button>
    </div>
  `;
}

settimerdalContent();


function settimerdflContent() {
  var timerdflContent = document.getElementById('timer-dfl');

  timerdflContent.innerHTML = `
    <h1><i class="fas fa-file-alt"></i> Dissertation en Langue Étrangère</h1>
    <div class="timer-controls" id="timer-controls-dfl">
      <button class="startPauseButton" onclick="startPause('dfl')">
        <i class="fas fa-play"></i>
      </button>
      <div class="timer-display" id="timer-dfl-display">03:00:00</div>
      <button class="resetButton" onclick="resetTimer('dfl')">
        <i class="fas fa-undo"></i>
      </button>
    </div>
  `;
}

settimerdflContent();

function settimerqcmContent() {
  var timerqcmContent = document.getElementById('timer-qcm');

  timerqcmContent.innerHTML = `
    <h1><i class="fas fa-clipboard-check"></i> Questionnaire à choix multiples</h1>
    <div class="timer-controls" id="timer-controls-qcm">
      <button class="startPauseButton" onclick="startPause('qcm')">
        <i class="fas fa-play"></i>
      </button>
      <div class="timer-display" id="timer-qcm-display">00:30:00</div>
      <button class="resetButton" onclick="resetTimer('qcm')">
        <i class="fas fa-undo"></i>
      </button>
    </div>
  `;
}

settimerqcmContent();


var timers = {
  'dal': { totalTime: 3 * 60 * 60, timeLeft: 3 * 60 * 60, isPaused: true, timer: null },
  'dfl': { totalTime: 3 * 60 * 60, timeLeft: 3 * 60 * 60, isPaused: true, timer: null },
  'qcm': { totalTime: 30 * 60, timeLeft: 30 * 60, isPaused: true, timer: null }
};

function startPause(timerKey) {
  var timerObj = timers[timerKey];
  var button = document.querySelector(`#timer-controls-${timerKey} .startPauseButton`);

  if (timerObj.isPaused) {
    timerObj.isPaused = false;
    button.innerHTML = '<i class="fas fa-pause"></i>';
    timerObj.timer = setInterval(function() { updateTimer(timerKey); }, 1000);
  } else {
    timerObj.isPaused = true;
    button.innerHTML = '<i class="fas fa-play"></i>';
    clearInterval(timerObj.timer);
  }
}

function resetTimer(timerKey) {
  var timerObj = timers[timerKey];
  timerObj.timeLeft = timerObj.totalTime;
  updateTimerDisplay(timerKey);
  timerObj.isPaused = true;
  clearInterval(timerObj.timer);
  document.querySelector(`#timer-controls-${timerKey} .startPauseButton`).innerHTML = '<i class="fas fa-play"></i>';
}

function updateTimer(timerKey) {
  var timerObj = timers[timerKey];
  if (timerObj.timeLeft > 0) {
    timerObj.timeLeft--;
    updateTimerDisplay(timerKey);
  } else {
    resetTimer(timerKey);
    openModal();
  }
}

function updateTimerDisplay(timerKey) {
  var timerObj = timers[timerKey];
  var hours = Math.floor(timerObj.timeLeft / 3600);
  var minutes = Math.floor((timerObj.timeLeft % 3600) / 60);
  var seconds = timerObj.timeLeft % 60;

  document.querySelector(`#timer-controls-${timerKey} .timer-display`).textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
  return time < 10 ? '0' + time : time;
}

function openModal() {
  var modal = document.getElementById('timerModal');
  modal.style.display = 'block';
}

function closeModal() {
  var modal = document.getElementById('timerModal');
  modal.style.display = 'none';
}


function setdalContent(yearIndex, contentObject) {
  //document.querySelectorAll('.year-content').forEach(function (content) {content.style.display = 'none';});
  const year = Object.keys(contentObject)[yearIndex];
  const content = contentObject[year];
  const selectedContent = document.getElementById('container-dal');
  if (selectedContent) {
    selectedContent.innerHTML = content;
    selectedContent.style.display = 'block';
  }
}


const switchButtondal2024 = document.getElementById("switchdal2024");
switchButtondal2024.addEventListener("click", () => setdalContent(0, dalContent2024));

const switchButtondal2023 = document.getElementById("switchdal2023");
switchButtondal2023.addEventListener("click", () => setdalContent(0, dalContent2023));

const switchButtondal2022 = document.getElementById("switchdal2022");
switchButtondal2022.addEventListener("click", () => setdalContent(0, dalContent2022));

const switchButtondal2021 = document.getElementById("switchdal2021");
switchButtondal2021.addEventListener("click", () => setdalContent(0, dalContent2021));

const switchButtondal2020 = document.getElementById("switchdal2020");
switchButtondal2020.addEventListener("click", () => setdalContent(0, dalContent2020));

const switchButtondal2019 = document.getElementById("switchdal2019");
switchButtondal2019.addEventListener("click", () => setdalContent(0, dalContent2019));

const switchButtondal2018 = document.getElementById("switchdal2018");
switchButtondal2018.addEventListener("click", () => setdalContent(0, dalContent2018));

const switchButtondal2017 = document.getElementById("switchdal2017");
switchButtondal2017.addEventListener("click", () => setdalContent(0, dalContent2017));

const switchButtondal2016 = document.getElementById("switchdal2016");
switchButtondal2016.addEventListener("click", () => setdalContent(0, dalContent2016));

const switchButtondal2015 = document.getElementById("switchdal2015");
switchButtondal2015.addEventListener("click", () => setdalContent(0, dalContent2015));

const switchButtondal2014 = document.getElementById("switchdal2014");
switchButtondal2014.addEventListener("click", () => setdalContent(0, dalContent2014));

const switchButtondal2013 = document.getElementById("switchdal2013");
switchButtondal2013.addEventListener("click", () => setdalContent(0, dalContent2013));


var dalContent2024 = {
  2024: `
    <h2>مباراة ولوج السلك العادي <br>للمعهد الملكي للإدارة الترابية <br>(18 فبراير 2024)</h2>
    <p class="subjects">أجب على <u>أحد</u> الموضوعين التاليين:</p>
    <p class="subject ar bold">الموضوع الاختياري الأول:</p>
    <p class="noindent">تعكس الإصلاحات التي جرى إطلاقها في إطار ورش الجهوية المتقدمة بالمملكة المغربية إرادة السلطات العمومية في تمكين البلاد من تنظيم ترابي قادر على رفع التحديات الجديدة في مجال التنمية، وعلى الاستجابة بفعالية لإنتظارات المواطنات والمواطنين. وبعد البدء في تنزيل هذا الورش الملكي مند سنوات، جرى تحقيق تقدم مهم في مجال اللامركزية وتحديث هياكل الدولة وعلى مستوى التنمية السوسيو-اقتصادية والرأسمال البشري وحجم البنيات التحتية الأساسية والاستثمارات.</p>
    <p class="noindent">انطلاقا من المنجزات والمكتسبات، الى أي حد تمكن نموذج الحكامة الترابية المعتمد حاليا، من تحقيق الطموح المتمثل في جعل المجالات الترابية الفضاء الأمثل لإرساء وتكريس التنمية وتحقيق النتائج المرجوة، سواء على مستوى تقليص التفاوتات المجالية والاجتماعية، أو فيما يتعلق بمساهمة الجهات في خلق الثروة الوطنية؟</p>
    <p class="subject ar bold">الموضوع الاختياري الثاني:</p>
    <p class="noindent">تَختبر القدرة على تدبير الوقائع الكارثية مدى نجاعة المؤسسات المتدخلة في الاستجابة لرهان التدخل السريع والناجع من أجل الحد من آثار الكوارث الطبيعية، مما يسائل القدرات الاستباقية لتدبير المخاطر وإمكانيات الحد من آثارها في إطار استراتيجية وطنية لتدبير الكوارث الطبيعية.</p>
    <p class="noindent">حلل وناقش انطلاقا من تجربة تدبير السلطات العمومية لآثار زلزال الحوز.</p>
    <p class="duration ar xxivar bold">مدة الإنجاز 3 ساعات</p>
  `
};

var dalContent2023 = {
  2023: `
    <h2>مباراة ولوج السلك العادي <br>للمعهد الملكي للإدارة الترابية <br>(26 فبراير 2023)</h2>
    <p class="subjects">أجب على <u>أحد</u> الموضوعين التاليين:</p>
    <p class="subject ar bold">الموضوع الاختياري الأول:</p>
    <p>تحتل المسألة الاجتماعية مكانة أساسية في التوجه الجديد للتدبير العمومي، حيث دشن المغرب انطلاق جيل جديد من السياسات الاجتماعية التي تنبني على التشخيص الترابي الذي يجعل التدخلات العمومية أكثر قدرة على الاستهداف الجيد، وإشراك مختلف الفاعلين في خلق مشاريع للتنمية الاجتماعية.</p>
    <p class="analyze bold">حلل وناقش</p>
    <p class="subject ar bold">الموضوع الاختياري الثاني:</p>
    <p>تعتبر استراتيجية النهوض بالاستثمار التي انخرط فيها المغرب ركيزة أساسية في المسار التنموي لبلادنا، علما أن من بين أهدافها تقليص الفوارق بين الأقاليم والعمالات في جلب الاستثمارات، وتوجيه الاستثمار نحو القطاعات الإنتاجية ذات القيمة المضافة العالية، مع الرفع من مساهمة الاستثمار الخاص الوطني، وتحسين مناخ الأعمال، وخلق فرص الشغل القار، وتعزيز جاذبية المملكة وجعلها قطبا قاريا ودوليا في مجال الاستثمارات الأجنبية المباشرة...</p>
    <p class="analyze bold">حلل وناقش</p>
    <p class="duration ar xxiiiar bold">مدة الإنجاز 3 ساعات</p>
  `
};

var dalContent2022 = {
  2022: `
    <h2>مباراة ولوج السلك العادي <br>للمعهد الملكي للإدارة الترابية <br>(06 مارس 2022)</h2>
    <p class="subjects">أجب على <u>أحد</u> الموضوعين التاليين:</p>
    <p class="subject ar bold">الموضوع الاختياري الأول:</p>
    <p>تعزز الإدارة الرقمية من إمكانية التواصل بين المركز والوحدات الإدارية للمصالح اللاممركزة، وهو الأمر الذي يسهل عملية التوجيه والتشاور واتخاد القرارات السليمة، وتسريع وثيرة تنفيذ السياسات العمومية وتنزيلها على المستوى المحلي.</p>
    <p>فإلى أي حد تساهم تكنولوجيا المعلومات والاتصال في تقوية اللاتمركز الإداري؟</p>
    <p class="subject ar bold">الموضوع الاختياري الثاني:</p>
    <p>رغم الإكراهات والتحديات، تسير بلادنا بثبات في اتجاه تحقيق التنمية المستدامة التي تنشدها جهويا ووطنيا، من خلال مواصلة الإصلاحات الهيكلية، وتنزيل الأوراش الاستراتيجية، من قبيل النموذج التنموي الجديد، والجهوية المتقدمة، وتعميم الحماية الاجتماعية والصحية، وتصنيع اللقاحات بهدف ضمان السيادة اللقاحية للمملكة، والأمن الصحي للمغاربة.</p>
    <p> ما رأيكم في ذلك؟</p>
    <p class="duration ar xxiiar bold">مدة الإنجاز 3 ساعات</p>
  `
};

var dalContent2021 = {
  2021: `
    <h2>مباراة ولوج السلك العادي <br>للمعهد الملكي للإدارة الترابية <br>(21 مارس 2021)</h2>
    <p class="subjects">أجب على <u>أحد</u> الموضوعين التاليين:</p>
    <p class="subject ar bold">الموضوع الاختياري الأول:</p>
    <p>إن تحقيق الحكامة الترابية الجيدة في ظل الجهوية المتقدمة يتطلب استحضار وتفعيل مجموعة من الآليات والأدوات اللازمة لمواكبة ومساندة الجهة لبلوغ مرامي التدبير الجيد لشؤونها وممارسة الاختصاصات الموكولة إليها بكل فعالية واحترافية. فالركيزة الأساسية الأولى التي تقوم عليها الحكامة الجيدة للإدارات الترابية الجهوية هي أجرأة أسسها من أجل تحسين أداء الفاعلين المنتخبين والمستخدمين على المستوى الجهوي بشكل يتماشى مع طموحات واحتياجات المواطنين ومتطلبات التنمية الترابية.</p> 
    <p>في أفق الاستحقاقات الانتخابية التي ستعرفها بلادنا سنة 2021 لتجديد كافة المؤسسات الترابية المنتخبة، كيف يمكن في نظرك بلوغ أهداف هذه الحكامة؟</p>
    <p class="subject ar bold">الموضوع الاختياري الثاني:</p>
    <p>يرتبط الحق في الولوج الى المعلومة بتكريس مفهوم الإدارة المواطنة في تجلياتها المتعددة.</p>
    <p>كيف يمكن أن يساهم تعزيز الحق في الولوج إلى المعلومة في انفتاح الإدارة وفعاليتها؟</p>
    <p class="duration ar xxiar bold">مدة الإنجاز 3 ساعات</p>
  `
};

var dalContent2020 = {
  2020: `
    <h2>مباراة ولوج السلك العادي <br>للمعهد الملكي للإدارة الترابية <br>(19 يوليوز 2020)</h2>
    <p class="subjects">أجب على <u>أحد</u> الموضوعين التاليين:</p>
    <p class="subject ar bold">الموضوع الاختياري الأول:</p>
    <p>خلقت إعادة النظر في نموذجنا التنموي لمواكبة التطورات التي تعرفها المملكة المغربية دينامية جديدة انخرطت فيها جميع القوى الحية ببلادنا، وهي دينامية إيجابية في حد ذاتها وحبلى بالآمال. كما أنها أظهرت أن المغاربة مقتنعون بأن بمقدور بلادهم تحقيق مستوى عال من التنمية، خاصة وأن المغرب بلد يمتلك العديد من المؤهلات ويمكنه أن يتطلع إلى الطموح التنموي.</p>
    <p>ما هي في تقديرك الخيارات الكبرى التي يمكن على أساسها بناء نموذج تنموي جديد يعتمد على المقاربة الترابية؟</p>
    <p class="subject ar bold">الموضوع الاختياري الثاني:</p>
    <p>دور الإدارة الإلكترونية في إطار سياسة تبسيط المساطر الإدارية.</p>
    <p class="duration ar xxar bold">مدة الإنجاز 3 ساعات</p>
  `
};

var dalContent2019 = {
  2019: `
    <h2>مباراة ولوج السلك العادي <br>للمعهد الملكي للإدارة الترابية <br>(28 أبريل 2019)</h2>
    <p class="subjects">أجب على <u>أحد</u> الموضوعين التاليين:</p>
    <p class="subject ar bold">الموضوع الاختياري الأول:</p>
    <p>رغم جهودها الحثيثة وما راكمته من مكتسبات في شتى المجالات، خاصة من أجل إرساء أسس الجهوية المتقدمة ومحاربة الهشاشة والنهوض بالحقوق الاقتصادية والاجتماعية، مازالت بلادنا في حاجة إلى تعبئة كافة المؤهلات والإمكانيات المتوفرة ومباشرة المزيد من الإصلاحات الهيكلية وتنفيذ استراتيجيات طموحة من خلال اعتماد نموذج تنموي جديد وفق مقاربة تشاركية، باعتباره السبيل الأمثل لمواجهة الإكراهات والتحديات وتحقيق التنمية المستدامة المنشودة.</p>
    <p class="analyzediscuss">حلل وناقش.</p>
    <p class="subject ar bold">الموضوع الاختياري الثاني:</p>
    <p>يقصد باللاتمركز الإداري عدم تركيز السلطة وتوزيعها بين البيئات والمستويات الإدارية المختلفة في التنظيم الإداري على مستوى الدولة.</p>
    <p>وتتمثل مهمتها في:</p>
    <ol>
      <li>نقل اختصاصات الإدارة المركزية الى الإدارات البعيدة عنها جغرافيا للقيام بمهام معينة عهدت اليها؛</li>
      <li>تخويل المصالح الجهوية والإقليمية صلاحيات اتخاد القرارات.</li>
    </ol>
    <p>إلى أي حد يمكن لللاتمركز الإداري أن يكون رافعة لورش الجهوية المتقدمة؟</p>
    <p class="duration ar xixar bold">مدة الإنجاز 3 ساعات</p>
  `
};

var dalContent2018 = {
  2018: `
    <h2>مباراة ولوج السلك العادي <br>للمعهد الملكي للإدارة الترابية <br>(24 يونيو 2018)</h2>
    <p class="subjects">أجب على <u>أحد</u> الموضوعين التاليين:</p>
    <p class="subject ar bold">الموضوع الاختياري الأول:</p>
    <p>رغم الإكراهات والتحديات، تعمل بلادنا بثبات على إعطاء دفعة قوية للتنمية الجهوية باعتبارها رافدا أساسيا من روافد التنمية الوطنية المستدامة، وخاصة من خلال ترسيخ الديمقراطية المحلية وسياسة القرب، وتدعيم المقاربة التشاركية والحكامة الجيدة في تدبير الشؤون المحلية.</p>
    <p class="analyzediscuss bold">حلل وناقش.</p>

    <p class="subject ar bold">الموضوع الاختياري الثاني:</p>
    <p>الحكامة الجيدة وعلاقتها بمبدأ ربط المسؤولية بالمحاسبة.</p>
    <p class="duration ar xviiiar bold">مدة الإنجاز 3 ساعات</p>
  `
};

var dalContent2017 = {
  2017: `
    <h2>مباراة ولوج السلك العادي <br>للمعهد الملكي للإدارة الترابية <br>(13 ماي 2017)</h2>
    <p class="content">تمكنت المملكة المغربية على مدار السنوات السابقة من القيام بإصلاحات دستورية جوهرية وتدعيم المسار الديموقراطي عبر انتخابات حرة ونزيهة، وإطلاق أوراش كبرى، وهيكلة البنيات التحتية، وبلورة سياسات قطاعية مكنت بلادنا من تحقيق تنمية اقتصادية واجتماعية مهمة.</p>
    <p>ما هي تجليات أهم هذه الإصلاحات والأوراش والبنيات والسياسات العمومية؟</p>
    <p class="duration ar xviiar bold">مدة الإنجاز 3 ساعات</p>
  `
};
  
var dalContent2016 = {
  2016: `
    <h2>مباراة ولوج السلك العادي <br>للمعهد الملكي للإدارة الترابية <br>(21 أبريل 2016)</h2>
    <p class="content">من المعلوم أن المشاركة السياسية حق مكفول بموجب مقتضيات الدستور والمعاهدات الدولية المتعلقة بحقوق الانسان والقوانين الوطنية الجاري بها العمل، وتتجسد أساسا في مساهمات المواطنات والمواطنين في العمل السياسي وتحمل المسؤولية والترشح والتصويت في الاستحقاقات الانتخابية وتتبع عملياتها ونتائجها.</p>
    <p>ما هو تصورك لهذا الحق، وكيف ترى أهميته وأبعاده المختلفة؟</p>
    <p class="duration ar right xviar bold">مدة الإنجاز 3 ساعات</p>
  `
};

var dalContent2015 = {
  2015: `
    <h2>مباراة ولوج السلك العادي <br>للمعهد الملكي للإدارة الترابية <br>(13 ماي 2015)</h2>
    <p class="content center">كيف يمكن استثمار الرأسمال البشري اللامادي في تحرير الطاقات التنموية في ظل الجهوية المتقدمة.</p>
    <p class="discuss bold">حلل وناقش</p>
    <p class="duration ar right xvar bold">مدة الإنجاز 3 ساعات</p>
  `
};

var dalContent2014 = {
  2014: `
    <h2>مباراة ولوج السلك العادي <br>للمعهد الملكي للإدارة الترابية <br>(11 مارس 2014)</h2>
    <p class="content center bold">إن ترسيخ الديمقراطية المحلية وتطوير نجاعة الإدارة ودعم المقاربة التشاركية عوامل تساهم في تحقيق النمو الاقتصادي.</p>
    <p class="discuss bold">حلل وناقش</p>
    <p class="duration ar right xivar bold">مدة الإنجاز 3 ساعات</p>
  `
};

var dalContent2013 = {
  2013: `
    <h2>مباراة ولوج السلك العادي <br>للمعهد الملكي للإدارة الترابية <br>(09 ماي 2013)</h2>
    <p class="content center bold">إن التنمية المستدامة لا تعني فقط توفير الشروط الضرورية لإقلاع إقتصادي يكفل الرفع المضطرد لمعدل النمو، بل أيضا تحقيق كافة المتطلبات الكفيلة بضمان حياة كريمة للمواطنين والمتمثلة بالأساس في إصلاح العدالة، وتكريس الديموقراطية وحقوق الإنسان، وتحسين الخدمات الاجتماعية، والحفاظ على البيئة.</p>
    <p class="discuss bold">حلل وناقش</p>
    <p class="duration ar right xiiiar bold">مدة الإنجاز 3 ساعات</p>
  `
};


setdalContent(0, dalContent2024);



function setdflContent(yearIndex, contentObject) {
  //document.querySelectorAll('.year-content').forEach(function (content) {content.style.display = 'none';});

  const year = Object.keys(contentObject)[yearIndex];
  const content = contentObject[year];
  const selectedContent = document.getElementById('container-dfl');
  if (selectedContent) {
    selectedContent.innerHTML = content;
    selectedContent.style.display = 'block';
  }
}


const switchButtondfl2024 = document.getElementById("switchdfl2024");
switchButtondfl2024.addEventListener("click", () => setdflContent(0, dflContent2024));

const switchButtondfl2023 = document.getElementById("switchdfl2023");
switchButtondfl2023.addEventListener("click", () => setdflContent(0, dflContent2023));

const switchButtondfl2022 = document.getElementById("switchdfl2022");
switchButtondfl2022.addEventListener("click", () => setdflContent(0, dflContent2022));

const switchButtondfl2021 = document.getElementById("switchdfl2021");
switchButtondfl2021.addEventListener("click", () => setdflContent(0, dflContent2021));

const switchButtondfl2020 = document.getElementById("switchdfl2020");
switchButtondfl2020.addEventListener("click", () => setdflContent(0, dflContent2020));

const switchButtondfl2019 = document.getElementById("switchdfl2019");
switchButtondfl2019.addEventListener("click", () => setdflContent(0, dflContent2019));

const switchButtondfl2018 = document.getElementById("switchdfl2018");
switchButtondfl2018.addEventListener("click", () => setdflContent(0, dflContent2018));

const switchButtondfl2017 = document.getElementById("switchdfl2017");
switchButtondfl2017.addEventListener("click", () => setdflContent(0, dflContent2017));

const switchButtondfl2016 = document.getElementById("switchdfl2016");
switchButtondfl2016.addEventListener("click", () => setdflContent(0, dflContent2016));

const switchButtondfl2015 = document.getElementById("switchdfl2015");
switchButtondfl2015.addEventListener("click", () => setdflContent(0, dflContent2015));

const switchButtondfl2014 = document.getElementById("switchdfl2014");
switchButtondfl2014.addEventListener("click", () => setdflContent(0, dflContent2014));

const switchButtondfl2013 = document.getElementById("switchdfl2013");
switchButtondfl2013.addEventListener("click", () => setdflContent(0, dflContent2013));


var dflContent2024 = {
  2024: `
    <h2>CONCOURS D’ACCES AU CYCLE NORMAL <br>DE L’INSTITUT ROYAL DE L’ADMINISTRATION TERRITORIALE <br>(18 février 2024)</h2>
    <p class="subjects">Répondez, <u>au choix</u>, à <u>l’un</u> des sujets suivants :</p>
    <p class="subject bold">Sujet 1 : </p>
    <p class="size 2024 noindent">Le Royaume du Maroc engage constamment des chantiers et des réformes   de différentes natures pour assurer le développement et le bien être des marocains tout en plaçant le citoyen au cœur du processus de développement et en faisant de lui la finalité essentielle des politiques publiques.</p>
    <p class="size 2024 noindent">Quelles sont les principaux chantiers et réformes lancés et réalisés par le Maroc depuis l’intronisation de Sa Majesté Le Roi Mohammed VI, que Dieu L’Assiste, et quel est leur impact sur les citoyens et la société ?</p>

    <p class="subject bold">Sujet 2 :</p> 
    <p class="size 2024 noindent">L’Initiative internationale de Sa Majesté Le Roi Mohammed VI, que Dieu L’Assiste, visant à favoriser l’accès des pays du Sahel à l’Océan Atlantique, stimulera le commerce et favorisera une intégration plus étroite des économies de la région, en générant un environnement propice à la croissance, à la création d’emplois et au développement durable. Elle développera en même temps les perspectives prometteuses de renforcement des liens économiques et stratégiques entre le Royaume du Maroc et les pays du Sahel. En plus de ses avantages économiques, ce projet vise à renforcer   la stabilité et la sécurité dans la région.</p>
    <p class="size 2024 noindent">Comment est-ce que cette initiative peut renforcer le rayonnement régional   et international du Maroc et dans quelle mesure peut-elle affermir le positionnement stratégique et consolider la place de notre pays en tant que pôle régional d’intégration, de stabilité et de partenariat solidaire ?</p>
    <p class="duration xxivfr bold">(Durée : 3 heures)</p>
  `
};

var dflContent2023 = {
  2023: `
    <h2>CONCOURS D’ACCES AU CYCLE NORMAL <br>DE L’INSTITUT ROYAL DE L’ADMINISTRATION TERRITORIALE <br>(26 février 2023)</h2>
    <p class="subjects">Répondez, <u>au choix</u>, à <u>l’un</u> des sujets suivants :</p>
    <p class="subject bold">Sujet 1 : </p>
    <p class="size 2023">La demande en eau au Maroc est aujourd'hui supérieure à la quantité disponible en ressources annuelles renouvelables. La sécurité hydrique devient, par conséquent, une priorité pour le Maroc d'aujourd'hui et pour les années à venir. Elle nécessite une réponse urgente et devrait être considérée comme l'un des principaux garants de la paix sociale et un facteur de soutenabilité et de résilience du nouveau modèle de développement. Cette réponse doit émaner d'une politique à la fois protectrice et valorisante de la ressource, mais également novatrice et inspirée des meilleures pratiques en matière de gouvernance.</p>
    <p class="size 2023">Quelles sont, à votre avis, les principales orientations de cette politique, les mesures prises ou à prendre et le mode de gouvernance mis ou à mettre en œuvre pour pouvoir satisfaire rationnellement et convenablement les besoins de notre pays en eau ?</p>

    <p class="subject bold">Sujet 2 :</p> 
    <p class="size 2023">Le Maroc et le nouvel équilibre géostratégique.</p>
    <p class="duration xxiiifr bold">(Durée : 3 heures)</p>
  `
};

var dflContent2022 = {
  2022: `
      <h2>CONCOURS D’ACCES AU CYCLE NORMAL <br>DE L’INSTITUT ROYAL DE L’ADMINISTRATION TERRITORIALE <br>(06 MARS 2022)</h2>
      <p class="subjects">Répondez, <u>au choix</u>, à <u>l’un</u> des sujets suivants :</p>
      <p class="subject bold">Sujet 1 : </p>
      <p class="size 2022">Le Nouveau Modèle de Développement devrait créer des ruptures positives permettant au Maroc de soutenir une trajectoire de croissance annuelle du PIB de 6%.</p>
      <p class="size 2022">Dans ce sens, 4 axes de transformation ont été retenus :</p>
      <ul class="size 2022 bullet">
        <li>Une économie productive et diversifiée, créatrice de valeur et d’emplois de qualité ;</li>
        <li>Des opportunités d’inclusion pour tous et un lien social consolidé ;</li>
        <li>Un capital humain renforcé et mieux préparé pour l’avenir ;</li>
        <li>Un ancrage dans les territoires pour renforcer la résilience et la durabilité.</li>
      </ul>
      <p class="size 2022">En analysant ces axes de transformation, évaluez les conditions de réussite de leur mise en œuvre.</p>
      <p class="subject bold">Sujet 2 :</p>
      <p class="size 2022">Le Royaume du Maroc a réalisé des avancées importantes dans la consolidation démocratique, le développement économique, le bien être pour les citoyens et l'édification d'infrastructures modernes.</p>
      <p class="size 2022">Fort de ses atouts et réalisations, le Maroc est en droit désormais d’aspirer à une plus grande ambition de développement centrée sur le citoyen et porteuse de plus de croissance</p>
      <p class="size 2022">Analysez et développez.</p>
      <p class="duration xxiifr bold">(Durée : 3 heures)</p>
  `
};

var dflContent2021 = {
  2021: `
    <h2>CONCOURS D’ACCES AU CYCLE NORMAL <br>DE L’INSTITUT ROYAL DE L’ADMINISTRATION TERRITORIALE <br>(21 MARS 2021)</h2>
    <p class="subjects">Répondez, <u>au choix</u>, à <u>l’un</u> des sujets suivants :</p>
    <p class="subject bold">Sujet 1 : </p>
    <p class="size 2021">Doit-on attendre de l’État qu’il protège le citoyen de tous les risques ?</p>
    <p class="size 2021">Traitez ce sujet en évoquant le rôle des autres acteurs et forces vives de la société dans la protection contre les risques.</p>
    <p class="subject bold">Sujet 2 :</p>
    <p class="size 2021">La relance économique post Covid-19 au Maroc : quelles contraintes, quels défis et quelles perspectives ?</p>
    <p class="duration xxifr bold">(Durée : 3 heures)</p>
  `
};

var dflContent2020 = {
  2020: `
    <h2>CONCOURS D’ACCES AU CYCLE NORMAL <br>DE L’INSTITUT ROYAL DE L’ADMINISTRATION TERRITORIALE <br>(19 JUILLET 2020)</h2>
    <p class="subjects">Répondez, <u>au choix</u>, à <u>l’un</u> des sujets suivants :</p>
    <p class="subject bold">Sujet 1 : </p>
    <p>La pandémie du Covid-19 a eu des effets ravageurs sur tous les domaines de la vie et n’a épargné aucun endroit au Monde, même si l’impact de l’épidémie et la riposte à la crise diffère d’un pays à l’autre. Le Maroc ne fait pas l’exception, plusieurs secteurs ont été fragilisés et les vulnérabilités accentuées.</p>
    <p>À la lumière de ce qui précède et compte tenu de votre suivi de la crise sanitaire, <b>appréciez l’état de la gestion de cette pandémie et les mesures prises pour atténuer les effets, en articulant votre analyse et argumentaire au tour des axes suivants :</b></p>
    <p>1. Les instruments juridiques et réglementaires au moyen desquels le gouvernement a instauré l’état d’urgence sanitaire et la gestion des phases de restriction et allégement ;</p>
    <p>2. Le rôle du Ministère de l’intérieur et de ses démembrements territoriaux dans la mise en œuvre de ces mesures de confinement et de déconfinement ;</p>
    <p>3. Les mesures prises par le gouvernement, sur le plan du pilotage central et territorial, communicationnel, sanitaire et sécuritaire et socio-économique pour lutter contre les effets pervers de cette pandémie.</p>
    <p class="subject bold">Sujet 2 :</p>
    <p>Face à l’accroissement de la criminalité sous toutes ses formes et à la persistance de la menace terroriste, comment, à votre avis, peut-on concilier les impératifs de la sécurité et de l’ordre public avec les exigences des droits de l’Homme ?</p>
    <p class="duration xxfr bold">(Durée : 3 heures)</p>
  `
};

var dflContent2019 = {
  2019: `
    <h2>CONCOURS D’ACCES AU CYCLE NORMAL <br>DE L’INSTITUT ROYAL DE L’ADMINISTRATION TERRITORIALE <br>(28 AVRIL 2019)</h2>
    <p class="subjects">Répondez, <u>au choix</u>, à <u>l’un</u> des sujets suivants :</p>
    <p class="subject bold">Sujet 1 :</p>
    <p>Le Royaume du Maroc, sous l’impulsion de Sa Majesté le Roi Mohammed VI Que Dieu l’Assiste, a renforcé, en interne, sa démocratie, son économie, son identité culturelle plurielle et son capital humain. Il a également consolidé son positionnement à l’échelle internationale à travers le développement d’une nouvelle approche Sud-Sud et la consécration d’une ouverture irréversible sur le monde.</p>
    <p><b>Analysez et commentez le texte précité.</b></p>
    <p class="subject bold">Sujet 2 :</p>
    <p>Comment la gouvernance électronique, l’économie numérique et l’échange électronique des documents et des données peuvent-ils contribuer à faire de l’administration marocaine une administration numérique au service du citoyen ?</p>
    <p class="duration xixfr bold">(Durée : 3 heures)</p>
  `
};

var dflContent2018 = {
  2018: `
    <h2>CONCOURS D’ACCES AU CYCLE NORMAL <br>DE L’INSTITUT ROYAL DE L’ADMINISTRATION TERRITORIALE <br>(24 JUIN 2018)</h2>
    <p class="subjects">Répondez, <u>au choix</u>, à <u>l’un</u> des sujets suivants :</p>
    <p class="subject bold">Sujet 1 :</p>
    <p><i>« La réalité des faits montre aujourd'hui plus que jamais, que les médias sociaux ne sont plus que des lieux d'échange dans un contexte privé, mais surtout de véritables espaces publics en raison de l'accessibilité aisée à leur contenu pour un très grand nombre de personnes, et dès lors qu'ils sont utilisés dans un but de diffusion d'une information qui touche un large public.</i></p>
    <p><i>Dans ces espaces virtuels, on s'échange aussi pour la chose publique, la politique mise en place et on mobilise pour dénoncer, critiquer, voire agir contre des choix et des décisions publiques jugées à tort ou à raison non opportunes ».</i></p>
    <p><b>Eu égard à la capacité reconnue aujourd'hui pour les réseaux sociaux de concurrencer les espaces publics traditionnels et aux risques qu'ils comportent, vous discuterez des défis que la prolifération des médias sociaux soulève pour les pouvoirs publics, des solutions envisageables pour faire face à leurs dérives et, enfin, de la manière d'en faire usage pour renforcer la légitimité de l'action de l'Etat.</b></p>
    <p class="subject bold">Sujet 2 :</p>
    <p>Créés en 2002 pour soutenir la création d'entreprises et promouvoir l'investissement régional, les centres régionaux d'investissement <b>(CRI)</b> ont montré leurs limites. Si dans le chapitre de la création d'entreprises, le bilan des <b>CRI</b> est plutôt positif, c'est en matière d'aide à l'investissement que la performance de ces derniers est critiquée, à tel point que <b>Sa Majesté le Roi que Dieu l'Assiste</b> les qualifie, dans son dernier discours du Trône, de « <i>frein au processus d'investissement</i> ».</p>
    <p>Prenant acte de ce constat, le gouvernement a entamé un projet de réforme pour redynamiser ces Centres.</p>
    <p><b>A votre avis, quels sont les facteurs qui entravent l'action des CRI et quels seront les moyens à mettre en place pour qu'ils deviennent de véritables acteurs de l'investissement territorial ?</b></p>
    <p class="duration xviiifr bold">(Durée : 3 heures)</p>
  `
};

var dflContent2017 = {
  2017: `
    <h2>CONCOURS D’ACCES AU CYCLE NORMAL <br>DE L’INSTITUT ROYAL DE L’ADMINISTRATION TERRITORIALE <br>(13 MAI 2017)</h2>
    <p class="subject bold">La Voie Africaine</p>
    <p class="size discours"><i>« … Il est beau, le jour où l'on porte son cœur vers le foyer aimé! L'Afrique est Mon Continent, et Ma Maison... »</i></p>
    <p class="size source"><i>Discours de Sa Majesté le Roi Mohammed VI, Que Dieu L'Assiste 28<sup>ème</sup> Sommet 28 de l'U.A</i></p>
    <p class="size 2017">Lorsque l'U.M.A. fut créée à Marrakech, le 17 février 1989, le Maroc nourrissait un grand espoir d'en faire un espace d'échanges sur tous les plans et de contribuer à la hisser à un niveau honorable dans l'échiquier mondial.</p>
    <p class="size 2017">Aujourd'hui, malheureusement, le bilan de l'expérience, est bien décevant :</p>
    <p class="size 2017">-  les échanges intra-maghrébins demeurent en deçà de 3% ( taux le plus bas de tous les regroupements régionaux dans le monde )</p>
    <p class="size 2017">-  le poids économique du Maghreb est à peine égal à 0.6% du PIB mondial</p>
    <p class="size 2017">La nouvelle « voie africaine » consacrée dans la Vision Royale, constitue , une réponse à l'inertie maghrébine, et relève d'une conviction affirmée quant à l'importance de l'Afrique dans la géo politique et économique mondiale .</p>
    <p class="size 2017">Ce continent de plus de 1,240 milliards de consommateurs (2017), avec des ressources naturelles gigantesques, et un taux de croissance de 5% de plus en plus convoité par les grandes puissances ( Chine, Inde, Japon.....) constitue pour le Maroc un espace naturel pour promouvoir son modèle socio économique, politique et religieux. « <i>le Maroc a un agenda au long cours pour s'imposer comme une vraie puissance africaine, pour bénéficier du réservoir de croissance et jouer le rôle de parrain de l'islam africain</i> » écrivait l'historien Pierre Vermeren.</p>
    <p class="size 2017">L'approche est « holistique ». Elle est multidimensionnelle et s'appuie sur les atouts confirmés du Maroc :</p>
    <p class="size 2017">-  des flux commerciaux en nette croissance de 12,8 % entre 2000 et 2015, générant un excédent depuis 2008;</p>
    <p class="size 2017">-  des accords bilatéraux et multilatéraux multiples;</p>
    <p class="size 2017">-  une dynamique de l'investissement direct en Afrique qui place le Maroc au deuxième rang parmi les pays africains;</p>
    <p class="size 2017">-  une image de modernité , d'ouverture et de stabilité bien reconnue par nos partenaires mondiaux.</p>
    <p class="size 2017">Mais l'envergure du succès reste indéniablement liée à l'Engagement de Sa Majesté le Roi Mohammed VI Que Dieu L'Assiste, au rôle qu'Il a joué pour fédérer les nations africaines à l'occasion de la Cop 22 à Marrakech ou à travers Ses visites multiples aux États.</p>
    <p class="size 2017">-  Le retour triomphal du Maroc, après plus de 30 années d'absence, représente un tournant historique dans les rapports intra-africains</p>
    <p class="size 2017">-  Les multiples accords bilatéraux, tripartites et multilatéraux conclus dans les domaines politiques, socio économiques, culturels et religieux , constituent une formidable assise pour impulser une nouvelle dynamique et générer une prospérité à partager</p>
    <p class="size 2017">Ils constituent également un défi, une responsabilité pour tous les opérateurs et acteurs dans tous les domaines, pour transformer ces opportunités de manière professionnelle tout en respectant les cultures des communautés et la dignité des citoyens africains.</p>
    <p class="size 2017"><i>En vous appuyant sur le texte , présentez de manière argumentée votre réflexion pour permettre de soutenir cette dynamique engagée, créer de la valeur à tous les niveaux , pour consolider et entretenir une bonne image pour le Royaume.</i></p>
    <p class="duration center xviifr bold">Durée de l'examen: 3 heures</p>
  `
};
  
var dflContent2016 = {
  2016: `
    <h2>CONCOURS D’ACCES AU CYCLE NORMAL <br>DE L’INSTITUT ROYAL DE L’ADMINISTRATION TERRITORIALE <br>(21 avril 2016)</h2>
    <p class="size 2016">Dans notre Planète , et depuis bien longtemps, nous assistons à « une érosion dramatique du vivant », pendant que les Décideurs Politiques continuent de tergiverser sur les engagements à prendre quant aux défis climatiques <br>Le constat est pourtant sans appel. Dans son 5<sup>ème</sup> rapport de 2500 pages ( 2013-2014), le groupe d'experts intergouvernemental sur l'évolution du climat ( GIEC) sonne l'alarme à travers ses conclusions et met le doigt sur les responsabilités : d'ici 2100, la hausse des températures pourrait atteindre 4.8°C, en fonction de l'émission du gaz à effet de serre et le niveau des mers pourrait s'élever d'un mètre avec des conséquences dramatiques pour les populations et l'équilibre des écosystèmes et « <i>il est extrêmement probable que l’influence humaine soit la cause principale du réchauffement observé depuis le milieu du XXème siècle »</i></p>
    <p class="size 2016">Aujourd'hui , entre les intérêts restreints et immédiats, et les risques planétaires irréversibles, la Communauté internationale doit faire ses choix. Des choix contraignants forcément, mais salutaires certainement.</p> 
    <p class="size 2016">Ce fut , bien entendu , l'enjeu de la COP21 à Paris, ce sera celui de la COP22 au Maroc dont les défis sont importants et dont la Volonté est bien affirmée à travers ses Initiatives et ses Projets</i></p>
    <p class="size 2016"><i>Quels sont les différents enjeux et     quelles sont les chances de succès face aux multiples défis ?</p>
    <p class="duration xvifr bold"><i>(Durée : 3 heures)</i></p>
  `
};

var dflContent2015 = {
  2015: `
    <p class="xvfr"></p>
  `
};

var dflContent2014 = {
  2014: `
    <h2>CONCOURS D’ACCES AU CYCLE NORMAL <br>DE L’INSTITUT ROYAL DE L’ADMINISTRATION TERRITORIALE <br>(11 MARS 2014)</h2>
    <p class="epreuve size 2014 bold">(Epreuve en langue française)</p>
    <p class="box">Analysez et commentez le texte ci-après, en expliquant comment la territorialisation peut-elle améliorer l’efficacité et la convergence des politiques publiques.</p>
    <p class="size 2014">L’efficacité et la convergence des politiques publiques peuvent être améliorées en adoptant une approche territorialisée pour leur conception et leur mise en œuvre et en tirant profit d’une meilleure articulation entre l’Etat et les territoires.</p>
    <p class="size 2014">Il serait important de donner aux régions une gouvernance adéquate, simplifiée et lisible. Cela permettre de structurer l’organisation territoriale et d’encourager les investissements indispensables dans les infrastructures de base, les transports, l’éducation-formation et le logement qui favorisent le développement économique et social.</p>
    <p class="size 2014">Une territorialisation efficace des politiques publiques n’est possible qu’associée à un processus de déconcentration. Ce dernier aurait pour avantage de favoriser la convergence des actions de déploiement de l’intervention publique dans les différents secteurs, à condition d’assurer l’existence de mécanismes permettant la transversalité de ces actions au niveau de l’autorité territoriale.</p>
    <p class="size 2014">Cette orientation vers la déconcentration administrative doit être renforcée par l’instauration d’un processus de concertation avec les acteurs au niveau national et territorial pour définir les finalités et les ressources communes en vue de faire émerger les priorités. Néanmoins, il faut éviter les doublons entre les différents niveaux de l’administration publique et désigner des chefs de file avec des prérogatives clairement définies. Cela passe ensuite par l’exploitation rationnelle des ressources de l’ensemble des composantes du secteur public, avec le souci d’instaurer des synergies et d’éviter un alourdissement des charges de l’Etat, tout en bénéficiant d’un pilotage efficace au niveau gouvernemental.</p>
    <p class="size 2014">Dans ce sens, il convient de souligner que les collectivités territoriales disposent de moyens leur permettant de renforcer l’action de l’Etat, en particulier en matière d’investissement. Il importe, à cet effet, de mobiliser les ressources financières potentielles qui peuvent être dégagées à travers la fiscalité locale et la capacité d’emprunt de certaines collectivités ainsi que par les gains issus d’une meilleure gouvernance locale. Ces actions peuvent être appuyées par le recours élargi à la contractualisation des interventions communes de l’Etat et des régions.</p>
    <p class="size 2014">Parallèlement, il faut encourager les actions visant la réduction des inégalités régionales et la mise en place de mécanismes de solidarité entre les régions.</p>
    <p class="duration xivfr bold">(Durée : 3 heures)</p>
  `
};

var dflContent2013 = {
  2013: `
    <h2>CONCOURS D’ACCES AU CYCLE NORMAL <br>DE L’INSTITUT ROYAL DE L’ADMINISTRATION TERRITORIALE <br>(09 MAI 2013)</h2>
    <p class="context">En vous appuyant sur le texte ci-après, analysez, en donnant votre appréciation, les divers aspects de la <u><i>citoyenneté</i></u>, notamment dans les domaines culturels, sociaux, économiques, politiques, et environnementaux.</p>
    <p class="duration bold"><i>(Durée : 3 heures)</i></p>
    <p class="title bold">LA CITOYENNETE</p>
    <p class="size 2013">La citoyenneté est un concept ancien, mais qui revêt de nos jours un caractère particulièrement important, dans les domaines à la fois politiques, économiques, sociaux, environnementaux… </p>
    <p class="size 2013">Le citoyen est de plus en plus sollicité par la collectivité pour apporter sa contribution, qu’elle soit d'ordre matériel immatériel, dans la construction de la société, son organisation et son fonctionnement au service et pour le bien être de tous les citoyens. </p>
    <p class="size 2013">En fait, tout citoyen a des obligations et des droits qu'il se doit d'exercer, dans le cadre du respect des droits des autres, des valeurs culturelles et cultuelles, mais aussi des règles sociales, économiques, environnementales…</p>
    <p class="size 2013">La citoyenneté le fait pour une personne, pour une famille ou pour un groupe, d’être reconnu comme membre d’une collectivité, en l’occurrence l'État, nourrissant un projet commun auquel ils souhaitent prendre une part active.</p>
    <p class="size 2013">La citoyenneté comporte des droits civils et politiques et des devoirs civiques définissant le rôle du citoyen au sein de la collectivité, et par rapport aux institutions. </p>
    <p class="size 2013">Au sens juridique, c'est un principe de légitimité : un citoyen est un sujet de devoirs.</p>
    <p class="size 2013">La citoyenneté n’est pas seulement confondue avec la nationalité.</p>
    <p class="newpage size 2013">La citoyenneté symbolise le respect des droits et des devoirs de citoyen d’un État, permettant une vie en communauté harmonieuse, sereine, sécurisée et durable.</p>

    <p class="size 2013">Chaque citoyen exerce à sa façon la citoyenneté telle qu'elle est établie par les lois et intégrée dans l'ensemble des mœurs et coutumes de la société à laquelle il appartient.</p>
    <p class="size 2013">La citoyenneté est aussi une composante du lien social. C’est, en particulier, l'égalité de droit et des devoirs associés à la citoyenneté qui fonde le lien social dans la société démocratique moderne.</p>
    <p class="size 2013">La citoyenneté est intimement liée à la démocratie, qui la renforce et la consolide, notamment par des mécanismes citoyens, comme celui de participer aux élections, qu'elles soient communales, législatives, syndicales, professionnelles…</p>
    <p class="size 2013">En démocratie, chaque citoyen est détenteur d’une partie de la souveraineté politique, mais également de la possibilité d'entreprendre et d'investir dans les champs sociaux, culturels et économiques.</p>
    <p class="size 2013">Un citoyen a plusieurs devoirs comme celui de payer les impôts, de respecter les lois et les règlements, ou encore de participer à la protection de l'environnement, et à éviter toute activité qui serait de nature à nuire à la collectivité.</p>
    <p class="size 2013">Les devoirs sont accomplis par les citoyens pour le bien de la collectivité (impôts, services civils...), ou de personnes (devoir dont le non-respect peut être sanctionné, par exemple, dans le cadre de la non-assistance à personne en danger) et définis par les lois des pays dans lesquels ils vivent.</p>
    <p class="size 2013">La communauté des citoyens forme la nation.</p>
    <p class="size 2013">Le citoyen est un être éminemment politique (la cité) qui exprime non seulement son intérêt individuel mais l'intérêt général. Cet intérêt général ne résume pas à la somme des actions particulières mais il les dépasse, pour être le résultat de la contribution de chacun, et des valeurs ajoutées qui font le développement et l'essor de toute collectivité, sur les plans culturel, social, économique, environnemental…</p>
    <p class="size 2013">En fait, on peut admettre qu'il y a quatre aspects de la citoyenneté :</p>
    <ul class="size 2013">
      <li>la citoyenneté civile, correspondant aux libertés fondamentales (liberté d'expression, égalité devant la justice, droit de propriété, liberté d'appartenir à une ONG) ;</li>
      <li>la citoyenneté politique, fondée sur la participation politique (le droit de vote, le droit d'éligibilité, le droit d'accéder à certaines fonctions publiques, le droit d’être protégé à l’étranger…) ;</li>
      <li>la citoyenneté sociale, résultante de la création de droits sociaux (droit à la santé, droit à un logement décent, doit de travailler, droits syndicaux, droits d'accès à l'eau potable et à l'assainissement, …).</li>
      <li>la citoyenneté économique, droit de création d'entreprises et d'unités de production, nécessité de prendre part au processus de production de biens et services, d'accéder aux crédits d’investissements…</li>
    </ul>
    <p class="size 2013">De fait, la citoyenneté est l’état ou la qualité de citoyen. Elle permet à un individu d’être reconnu comme membre d'une société, d'une cité dans l’Antiquité, ou d’un État aujourd’hui, et de participer à la vie politique, au processus de production de biens et services, et à la consolidation des fondements de l’État.</p>
  `
};
      

setdflContent(0, dflContent2024);



function buildTest(qcmContent, questionsPerGrid) {
  const output = [];
  let questionIndex = 0;
  for (let row = 0; row < 2; row++) {
    output.push('<div class="grid-container">'); 

    for (let col = 0; col < 3; col++) {
      const numQuestions = questionsPerGrid[row * 3 + col];
      output.push('<div class="grid">'); 

      for (let i = 0; i < numQuestions; i++) {
        const currentWord = qcmContent[questionIndex];

        if (!currentWord) break;

        const answers = [];
        for (const letter of Object.keys(currentWord.answers)) {
          answers.push(
            `<section>
                <label>
                    <input type="radio" name="question${questionIndex}" value="${letter}">
                    ${letter}.
                    ${currentWord.answers[letter]}
                </label>
            </section>`
          );
        }
        output.push(
          `<div class="word">${currentWord.word}</div>
            <div class="answers">${answers.join("")}</div>`
        );
        questionIndex++;
      }
      output.push('</div>'); 
    }
    output.push('</div>'); 
  }
  testContainer.innerHTML = output.join("");

  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((radio) => {
    radio.addEventListener('change', handleRadioChange);
  });
}


function setqcmContent(qcmContent, questionsPerGrid) {
  resultsContainer.innerHTML = '';

  buildTest(qcmContent, questionsPerGrid);
}

function handleRadioChange(event) {
  const selectedRadio = event.target;
  const questionIndex = selectedRadio.name.replace('question', ''); 

  const allAnswers = document.querySelectorAll(`[name="question${questionIndex}"]`);
  allAnswers.forEach((answer) => {
      answer.parentElement.parentElement.style.filter = 'blur(2px)'; 
  });

  selectedRadio.parentElement.parentElement.style.filter = 'none'; 
}


let currentQcmContent = [];

function showResults() {
  const answerContainers = testContainer.querySelectorAll('.answers');
  let correctNum = 0;

  currentQcmContent.forEach((currentWord, wordIndex) => {
    const answerContainer = answerContainers[wordIndex];
    const selector = `input[name="question${wordIndex}"]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    const allAnswers = answerContainer.querySelectorAll('input[type="radio"]');
    allAnswers.forEach((answer) => {
      // Reset styles for all answers
      answer.parentElement.style.color = 'initial'; 
      answer.parentElement.parentElement.style.filter = 'none'; 
      answer.parentElement.parentElement.style.border = '1px solid transparent'; // Reset section border
      answer.parentElement.parentElement.style.border.radius = '5px'; // Green border
      answer.style.accentColor = ''; // Reset radio accent color
    });

    if (userAnswer === currentWord.correctAnswer) {
      correctNum++;
      if (userAnswer) {
        // Correct answer: Green
        const selectedAnswer = answerContainer.querySelector(selector);
        selectedAnswer.parentElement.style.color = '#27ae60'; // Green text
        selectedAnswer.parentElement.parentElement.style.border = '1px solid #27ae60'; // Green border
        selectedAnswer.parentElement.parentElement.style.border.radius = '5px'; // Green border
        selectedAnswer.style.accentColor = '#32aa27'; // Green radio button accent
      }
    } else {
      if (userAnswer) {
        // Incorrect answer: Red
        const selectedAnswer = answerContainer.querySelector(selector);
        selectedAnswer.parentElement.style.color = '#ff0000'; // Red text
        selectedAnswer.parentElement.parentElement.style.border = '1px solid #ff0000'; // Red border
        selectedAnswer.style.accentColor = '#ff0000'; // Red radio button accent
      }
    }
  });

  let currentScore = 0;
  const interval = setInterval(() => {
    if (currentScore <= correctNum) {
      resultsContainer.innerHTML = `<span>${currentScore}</span> / ${currentQcmContent.length}`;
      currentScore++;
    } else {
      clearInterval(interval);
    }
  }, 50); 
}

const switchButtonqcm2024 = document.getElementById("switchqcm2024");
switchButtonqcm2024.addEventListener("click", () => {
  currentQcmContent = qcmContent2024;
  setqcmContent(currentQcmContent, [6, 6, 6, 5, 5, 2]);
});

const switchButtonqcm2023 = document.getElementById("switchqcm2023");
switchButtonqcm2023.addEventListener("click", () => {
  currentQcmContent = qcmContent2023;
  setqcmContent(currentQcmContent, [6, 6, 6, 5, 5, 2]);
});

const switchButtonqcm2022 = document.getElementById("switchqcm2022");
switchButtonqcm2022.addEventListener("click", () => {
  currentQcmContent = qcmContent2022;
  setqcmContent(qcmContent2022, [6, 6, 5, 6, 5, 2]);
});

const switchButtonqcm2021 = document.getElementById("switchqcm2021");
switchButtonqcm2021.addEventListener("click", () => {
  currentQcmContent = qcmContent2021;
  setqcmContent(qcmContent2021, [6, 6, 5, 5, 6, 2]);
});
const switchButtonqcm2020 = document.getElementById("switchqcm2020");
switchButtonqcm2020.addEventListener("click", () => {
  currentQcmContent = qcmContent2020;
  setqcmContent(qcmContent2020, [5, 5, 6, 5, 6, 3]);
});


const examTitles = ["QCM portant sur la culture et les connaissances générales : <br> <small>Histoire et fonctionnement des institutions nationales, règles du comportement citoyen et organisation et missions du ministère de l’intérieur</small>", "Epreuve des QCM - 26 février 2023 -", "Epreuve des QCM - 06 mars 2022 -", "Epreuve des QCM - 21 mars 2021 -", "Epreuve des QCM - 19 juillet 2020 -"];

function setExamTitle(index) {
  document.getElementById("examTitle").innerHTML = examTitles[index];
}

document.getElementById("switchqcm2024").addEventListener("click", function () {
  setExamTitle(0); 
});

document.getElementById("switchqcm2023").addEventListener("click", function () {
  setExamTitle(1); 
});

document.getElementById("switchqcm2022").addEventListener("click", function () {
  setExamTitle(2); 
});

document.getElementById("switchqcm2021").addEventListener("click", function () {
  setExamTitle(3); 
});

document.getElementById("switchqcm2020").addEventListener("click", function () {
  setExamTitle(4); 
});

setExamTitle(0);

const testContainer = document.getElementById("test");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

var buttons = document.querySelectorAll('[id^=switchqcm]');
submitButton.style.display = (buttons[0].id === 'switchqcm2024') ? 'none' : 'inline-block';

buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    buttons.forEach(function(btn) {
      btn.classList.remove('active');
    });
    submitButton.style.display = (button.id === 'switchqcm2024') ? 'none' : 'inline-block';
    button.classList.add('active');
  });
});



var qcmContent2024 = [
];

var qcmContent2023 = [

  {
    word: "1) Les femmes, membres de l’actuel gouvernement, sont au nombre de :",
    answers: {
      A: "3",
      B: "4",
      C: "6",
      D: "8",
    },
    correctAnswer: "C",
  },
  {
    word: "2) Tahar Ben Jelloun est l’auteur de :",
    answers: {
      A: "Au-delà de toute pudeur",
      B: "La nuit sacrée",
      C: "Au bonheur des dames",
      D: "La vieille dame du riad",
    },
    correctAnswer: "B",
  },
  {
    word: "3) Quel est l’auteur marocain ayant obtenu le prix Goncourt pour la nouvelle 'L’étrange affaire du pantalon de Dassoukine' ?",
    answers: {
      A: "Tahar BENJELLOUN",
      B: "Fouad LAROUI",
      C: "Abdellah LAROUI",
      D: "Abdellatif LAABI",
    },
    correctAnswer: "B",
  },
  {
    word: "4) L'évènement historique correspondant à la date du 16 novembre 1955 est :",
    answers: {
      A: "La déportation en exil de feu SM le Roi Mohammed V",
      B: "Le retour d'exil de feu SM le Roi Mohammed V",
      C: "La signature du manifeste d'Indépendance du Maroc",
      D: "La révolution du Roi et du peuple",
    },
    correctAnswer: "B",
  },
  {
    word: "5) La réintégration du Maroc au sein de l’Union Africaine s'est accomplie le:",
    answers: {
      A: "30 Juillet 2016",
      B: "30 Janvier 2017",
      C: "28 Février 2018",
      D: "30 Mars 2018",
    },
    correctAnswer: "B",
  },
  {
    word: "6) Quelle est la finalité du programme « AWRACH »?",
    answers: {
      A: "Le recensement de la population active",
      B: "La généralisation de la couverture sociale",
      C: "La création de 250.000 emplois en 2 ans",
      D: "La création de 250.000 nouvelles unités industrielles en 2 ans",
    },
    correctAnswer: "C",
  },
  {
    word: "7) Au Maroc, quel événement historique célèbre-t-on le 14 Août ?",
    answers: {
      A: "La Fête de la jeunesse",
      B: "La fête de l’indépendance",
      C: "L'institution de l’Union du Maghreb Arabe.",
      D: "La récupération des provinces d’Oued Eddahab et Sakia El Hamra",
    },
    correctAnswer: "D",
  },
  {
    word: "8) MASEN est une agence marocaine opérant dans le secteur :",
    answers: {
      A: "De l'industrie aéronautique",
      B: "De l'industrie automobile",
      C: "De l'industrie Agro-alimentaire",
      D: "Des énergies renouvelables",
    },
    correctAnswer: "D",
  },
  {
    word: "9) L'opération « Riaya رعاية» s'inscrit dans le cadre du :",
    answers: {
      A: "Plan National d'atténuation des effets de la sécheresse",
      B: "La lutte contre le décrochage scolaire",
      C: "Plan National d'atténuation des effets de La vague de froid",
      D: "Plan santé pour tous",
    },
    correctAnswer: "C",
  },
  {
    word: "10) La région marocaine qui a des frontières avec la Mauritanie est :",
    answers: {
      A: "Dakhla Oued Ed Dahab",
      B: "Darâa-Tafilet",
      C: "Laâyoune-Sakia Al Hamra",
      D: "Souss-Massa",
    },
    correctAnswer: "A",
  },
  {
    word: "11) La discipline de lecture du langage corporel porte le nom de :",
    answers: {
      A: "Sophrologie",
      B: "Ethnologie",
      C: "Psychologie",
      D: "Synergologie",
    },
    correctAnswer: "D",
  },
  {
    word: "12) Quelle est l'institution qui se charge au niveau de chaque région d'établir le schéma régional d'aménagement du territoire (SRAT)?",
    answers: {
      A: "L'agence urbaine",
      B: "La direction régionale du ministère de l'aménagement du territoire",
      C: "Le conseil de la région",
      D: "La wilaya de région",
    },
    correctAnswer: "C",
  },
  {
    word: "13) La Chambre des conseillers au Maroc comprend:",
    answers: {
      A: "90 membres",
      B: "120 membres",
      C: "100 membres",
      D: "aucune des réponses précitées",
    },
    correctAnswer: "B",
  },
  {
    word: "14) La Cour constitutionnelle:",
    answers: {
      A: "Est indépendante de toute autre institution",
      B: "Est une juridiction relevant de la Cour de cassation",
      C: "Est une institution politique",
      D: "Est rattachée au Ministère de la Justice",
    },
    correctAnswer: "A",
  },
  {
    word: "15) L'exécutif de la commune est exercé par :",
    answers: {
      A: "Le Président du Conseil Communal",
      B: "Le Wali de la Région",
      C: "Le Gouverneur",
      D: "Le Secrétaire Général du Conseil Communal",
    },
    correctAnswer: "A",
  },
  {
    word: "16) Quelle est l'institution financière au Maroc qui fixe le taux directeur :",
    answers: {
      A: "Le Ministère des Finances",
      B: "Bank Al Maghrib",
      C: "La CDG",
      D: "La bourse des valeurs de Casablanca",
    },
    correctAnswer: "B",
  },
  {
    word: "17) En plus du préambule, la Constitution marocaine en vigueur comporte :",
    answers: {
      A: "120 articles",
      B: "170 articles",
      C: "180 articles",
      D: "182 articles",
    },
    correctAnswer: "C",
  },
  {
    word: "18) Parmi les Conseils de régions suivants, lequel est actuellement présidé par une femme?",
    answers: {
      A: "Conseil de la région Tanger-Tétouan-Al Hoceima",
      B: "Conseil de la région Guelmim Oued Noun",
      C: "Conseil de la région Beni Mellal-Khenifra",
      D: "Conseil de la région Fès-Meknes",
    },
    correctAnswer: "B",
  },
  {
    word: "19) Les élections du 8 septembre 2021 au Maroc se sont caractérisées par le déroulement le même jour :",
    answers: {
      A: "Des élections des chambres professionnelles, régionales et communales",
      B: "Des élections de la chambre des conseillers, régionales et préfectorales",
      C: "Des élections législatives, régionales et communales",
      D: "Des élections législatives, des chambres professionnelles et communales",
    },
    correctAnswer: "C",
  },
  {
    word: "20) Le gouverneur de la préfecture ou de la province est une autorité :",
    answers: {
      A: "De tutelle administrative sur le conseil de la préfecture ou de la province",
      B: "De contrôle administratif sur le conseil de la préfecture ou de la province",
      C: "D'ordonnancement des recettes et dépenses du conseil de la préfecture ou de la province",
      D: "D'inspection du conseil de la préfecture ou de la province",
    },
    correctAnswer: "B",
  },
  {
    word: "21) La collectivité territoriale qui a pour compétence propre l'éclairage public est :",
    answers: {
      A: "La région",
      B: "La province",
      C: "La commune",
      D: "La préfecture",
    },
    correctAnswer: "C",
  },
  {
    word: "22) La direction des affaires électorales est rattachée:",
    answers: {
      A: "A l'inspection générale de l'administration territoriale",
      B: "A la direction générale des collectivités territoriales",
      C: "A la direction générale des affaires intérieures",
      D: "Au cabinet du Ministre de l'intérieur",
    },
    correctAnswer: "C",
  },
  {
    word: "23) Le corps des agents d'autorité ne comprend pas:",
    answers: {
      A: "Le cadre des gouverneurs",
      B: "Le cadre des pachas",
      C: "Le cadre des walis",
      D: "Le cadre des caïds",
    },
    correctAnswer: "C",
  },
  {
    word: "24) En quelle année a été lancée la 1ère phase de l’INDH?",
    answers: {
      A: "2004",
      B: "2005",
      C: "2006",
      D: "2007",
    },
    correctAnswer: "B",
  },
  {
    word: "25) Les collectivités territoriales sont :",
    answers: {
      A: "Les provinces, les préfectures, les communes et les agences urbaines",
      B: "Les régions, les provinces et les établissements de coopérations inter-communales",
      C: "Les préfectures, les communes et les agences urbaines",
      D: "Les régions, les provinces, les communes et les préfectures",
    },
    correctAnswer: "D",
  },
  {
    word: "26) Le décret relatif à la nouvelle organisation du Ministère de l'Intérieur date du :",
    answers: {
      A: "30 janvier 2019",
      B: "30 janvier 2020",
      C: "30 janvier 2021",
      D: "30 janvier 2022",
    },
    correctAnswer: "B",
  },
  {
    word: "27) La région Fès-Meknès est composée de sept provinces et de deux préfectures. Laquelle des provinces ci-après n'en fait pas partie :",
    answers: {
      A: "Sefrou",
      B: "Boulemane",
      C: "Ouezzane",
      D: "Taounate",
    },
    correctAnswer: "C",
  },
  {
    word: "28) Laquelle des attributions citées ci-après ne relève pas du Wali de la région :",
    answers: {
      A: "S'opposer au projet de règlement intérieur du conseil de la région",
      B: "Révoquer un membre du conseil de la région",
      C: "Viser le budget de la région",
      D: "Assister aux réunions du conseil de la région",
    },
    correctAnswer: "B",
  },
  {
    word: "29) Le nombre de préfectures au Maroc est de :",
    answers: {
      A: "11",
      B: "12",
      C: "13",
      D: "14",
    },
    correctAnswer: "C",
  },
  {
    word: "30) Laquelle des provinces suivantes ne fait pas partie de la région de Laâyoune-Sakia El Hamra:",
    answers: {
      A: "Boujdour",
      B: "Tarfaya",
      C: "Assa-Zag",
      D: "Es-Semara",
    },
    correctAnswer: "C",
  },
];

var qcmContent2022 = [

  {
    word: "1) L’actuelle coalition gouvernementale au Royaume du Maroc est composée des partis politiques suivants :",
    answers: {
      A: "RNI, USFP, PAM",
      B: "RNI, PAM, Istiqlal",
      C: "RNI, USFP, PPS",
      D: "RNI, Istiqlal, PPS",
    },
    correctAnswer: "B",
  },
  {
    word: "2) \"Moha le fou, Moha le sage\" est un roman de :",
    answers: {
      A: "Driss Chraïbi",
      B: "Fouad Laroui",
      C: "Leïla Slimani",
      D: "Tahar Benjelloun",
    },
    correctAnswer: "D",
  },
  {
    word: "3) Qui a été le premier chef de gouvernement (premier ministre) au Maroc?",
    answers: {
      A: "Mbarek Bekkaï",
      B: "Ahmed Osman",
      C: "Mohamed Maâti Bouabid",
      D: "Azzeddine Laraki",
    },
    correctAnswer: "A",
  },
  {
    word: "4) Quel besoin trouve-t-on au sommet de la pyramide d’Abraham Maslow (psychologue Américain) ?",
    answers: {
      A: "Le besoin d’appartenance au groupe",
      B: "Le besoin d’estime",
      C: "Le besoin d’accomplissement",
      D: "Le besoin de sécurité",
    },
    correctAnswer: "C",
  },
  {
    word: "5) Quel événement est célébré au Maroc le 11 janvier ?",
    answers: {
      A: "La Fête du Trône",
      B: "La révolution du Roi et du Peuple",
      C: "La présentation du Manifeste de l’Indépendance",
      D: "La Fête de la Jeunesse",
    },
    correctAnswer: "C",
  },
  {
    word: "6) L’état d’urgence sanitaire entré en vigueur au Maroc le 20 Mars 2020 est aujourd’hui :",
    answers: {
      A: "Levé définitivement",
      B: "Suspendu provisoirement",
      C: "En vigueur",
      D: "Maintenu uniquement pour quelques provinces",
    },
    correctAnswer: "C",
  },
  {
    word: "7) L’envoyé spécial actuel des Nations Unies pour le Sahara Marocain est :",
    answers: {
      A: "M. Horst Köhler",
      B: "M. Antonio Guterres",
      C: "M. Staffan de Mistura",
      D: "M. Javier de Cuéllar",
    },
    correctAnswer: "C",
  },
  {
    word: "8) Le comité régional de coordination des services déconcentrés est présidé par :",
    answers: {
      A: "Le Wali",
      B: "Le Chef du Gouvernement",
      C: "Le Gouverneur",
      D: "Le Président de la Région",
    },
    correctAnswer: "A",
  },
  {
    word: "9) L’officier de l’état civile au niveau local est le :",
    answers: {
      A: "Gouverneur",
      B: "Wali",
      C: "Président du conseil de la commune",
      D: "Officier de Police",
    },
    correctAnswer: "C",
  },
  {
    word: "10) La session parlementaire d’octobre débute:",
    answers: {
      A: "Le 2ème lundi d’octobre",
      B: "Le 2ème mardi d’octobre",
      C: "Le 2ème vendredi d’octobre",
      D: "Le 1er vendredi d’octobre",
    },
    correctAnswer: "C",
  },
  {
    word: "11) La chambre des représentants au Maroc comprend :",
    answers: {
      A: "325 membres",
      B: "395 membres",
      C: "305 membres",
      D: "335 membres",
    },
    correctAnswer: "B",
  },
  {
    word: "12) Qui est l’ordonnateur des recettes et des dépenses de la région?",
    answers: {
      A: "Le gouverneur",
      B: "Le Wali",
      C: "Le Président du Conseil de la région",
      D: "Le Président de la Cour Régionale des Comptes",
    },
    correctAnswer: "C",
  },
  {
    word: "13) De qui relève le service de la police administrative?",
    answers: {
      A: "La Direction Générale de la Sûreté Nationale",
      B: "La Gendarmerie Royale",
      C: "L’Agent d’Autorité",
      D: "La Commune",
    },
    correctAnswer: "C",
  },
  {
    word: "14) Qui exerce le contrôle administratif sur la légalité des arrêtés du président du conseil de la commune?",
    answers: {
      A: "Le président du conseil de la région",
      B: "Le président du conseil de la préfecture",
      C: "Le président de la chambre des conseillers",
      D: "Le gouverneur de la préfecture ou la province ou son représentant",
    },
    correctAnswer: "D",
  },
  {
    word: "15) Les auxiliaires d’autorité sont nommées par :",
    answers: {
      A: "Décret Du Chef de Gouvernement",
      B: "Arrêté du Ministre chargé de la Fonction Publique",
      C: "Arrêté du Ministre de l’Intérieur",
      D: "Arrêté du Gouverneur",
    },
    correctAnswer: "C",
  },
  {
    word: "16) Parmi les directions citées ci-après, une structure a été introduite dans le nouvel organigramme du Ministre de l’intérieur par un décret publié au BO le 6/02/2020 :",
    answers: {
      A: "Direction de la communication",
      B: "Direction de la réglementation et des libertés publiques",
      C: "Inspection générale de l’administration territoriale",
      D: "Direction de la migration et de la surveillance des frontières",
    },
    correctAnswer: "A",
  },
  {
    word: "17) Le Décret portant Charte Nationale de la Déconcentration Administrative est entré en vigueur le :",
    answers: {
      A: "03 janvier 2019",
      B: "13 janvier 2020",
      C: "30 janvier 2018",
      D: "23 janvier 2021",
    },
    correctAnswer: "A",
  },
  {
    word: "18) Outre leurs fonctions de police administrative, les Pachas et les Caïds :",
    answers: {
      A: "Ont la qualité d’officier de police judiciaire de plein droit",
      B: "Ont la qualité d’officier de police judiciaire sur désignation par arrêté conjoint des ministères de la Justice et de l’Intérieur",
      C: "Ont, par délégation, des attributions en matière de police judiciaire",
      D: "Ont seulement des attributions consultatives en matière de police judicaire",
    },
    correctAnswer: "A",
  },
  {
    word: "19) En quelle année a été créée l’EPCK, actuellement Institut Royal de l’Administration Territoriale?",
    answers: {
      A: "1960",
      B: "1965",
      C: "1970",
      D: "1975",
    },
    correctAnswer: "B",
  },
  {
    word: "20) Parmi les agents suivants, n’est pas un auxiliaire d’autorité :",
    answers: {
      A: "Le Cheikh urbain",
      B: "L’Arifa",
      C: "Le Chaouch",
      D: "Le Moqqadem rural",
    },
    correctAnswer: "B",
  },
  {
    word: "21) De quelle année date le dernier découpage régional au Maroc?",
    answers: {
      A: "2015",
      B: "2011",
      C: "2017",
      D: "2019",
    },
    correctAnswer: "A",
  },
  {
    word: "22) L’administration territoriale comprend :",
    answers: {
      A: "62 provinces, 13 préfectures et 8 préfectures d’arrondissements",
      B: "13 provinces, 62 préfectures et 8 préfectures d’arrondissements",
      C: "60 provinces, 15 préfectures et 8 préfectures d’arrondissements",
      D: "62 provinces, 11 préfectures et 6 préfectures d’arrondissements",
    },
    correctAnswer: "A",
  },
  {
    word: "23) Laquelle des provinces suivantes ne fait pas partie de la Région d Guelmim – Oued Noun :",
    answers: {
      A: "Assa - Zag",
      B: "Tan - Tan",
      C: "Tata",
      D: "Sidi Ifni",
    },
    correctAnswer: "C",
  },
  {
    word: "24) La plus grande région du Maroc en superficie est la région de :",
    answers: {
      A: "L’oriental",
      B: "Casablanca - Settat",
      C: "Drâa - Tafilalet",
      D: "Laayoune - Sakia El Hamra",
    },
    correctAnswer: "D",
  },
  {
    word: "25) Le vote aux élections locales se fait dans le lieu de :",
    answers: {
      A: "Résidence",
      B: "Naissance",
      C: "Préférence",
      D: "Aucune des réponses précitées ne convient",
    },
    correctAnswer: "A",
  },
  {
    word: "26) Selon l’article 24 de la Constitution de 2011 « toute personne a droit à la protection de… »:",
    answers: {
      A: "Ses données personnelles",
      B: "Sa vie privée",
      C: "Sa personne",
      D: "Bon environnement",
    },
    correctAnswer: "B",
  },
  {
    word: "27) Si les 4 premiers mois du service militaire au Maroc sont destinés à la formation générale et militaire de base, les 8 autres mois sont consacrés à :",
    answers: {
      A: "Des missions d’immersion et stages probatoires",
      B: "Une formation dans les domaines et spécialisation disponibles dans les centres de formation des Forces Armées Royales",
      C: "Des voyages d’études",
      D: "Des simulations et exercices sur le terrain",
    },
    correctAnswer: "B",
  },
  {
    word: "28) Le programme « Tayssir » a pour objectif de:",
    answers: {
      A: "Sensibiliser les citoyens sur la citoyenneté",
      B: "Fournir un appui financier aux familles pauvres, en vue de limiter la déperdition solaire",
      C: "Alerter les citoyen sur les facilités d’accès aux crédits logement",
      D: "Sensibiliser les citoyens de la vie politique",
    },
    correctAnswer: "B",
  },
  {
    word: "29) Parmi la liste ci-après, quel est le dernier variant du COVID-19 apparu au Maroc?",
    answers: {
      A: "Omicron",
      B: "Delta",
      C: "Alpha",
      D: "Deltacron",
    },
    correctAnswer: "A",
  },
  {
    word: "30) L’éclairage public d’une localité est du ressort du:",
    answers: {
      A: "Conseil communal",
      B: "Conseil régional",
      C: "Conseil provincial ou préfectoral",
      D: "Autorité locale",
    },
    correctAnswer: "A",
  },
];

var qcmContent2021 = [


  {
    word: "1) Dans quelle ville du Royaume se trouve l’espace historique, culturel et spirituel « Bayt-Dakira » ?",
    answers: {
      A: "Fès",
      B: "Essaouira",
      C: "Salé",
      D: "Meknès",
    },
    correctAnswer: "B",
  },
  {
    word: "2) Dans quel pays siège l’observatoire africain des migrations :",
    answers: {
      A: "Tunisie",
      B: "Maroc",
      C: "Egypte",
      D: "Sénégal",
    },
    correctAnswer: "B",
  },
  {
    word: "3) La zone frontière de Guerguarate a été sécurisée par les FAR, le :",
    answers: {
      A: "06 novembre 2020",
      B: "13 novembre 2020",
      C: "06 décembre 2020",
      D: "13 décembre 2020",
    },
    correctAnswer: "B",
  },
  {
    word: "4) Le grand projet du Gazoduc en Afrique de l’ouest, annoncé en 2016, reliera le Maroc au :",
    answers: {
      A: "Cameroun",
      B: "Gabon",
      C: "Mali",
      D: "Nigéria",
    },
    correctAnswer: "D",
  },
  {
    word: "5) La nouvelle stratégie « Génération Green 2020-2030 », successeur du Plan Maroc Vert, a pour objectif de :",
    answers: {
      A: "faire des énergie renouvelables le principal moteur de croissance nationale",
      B: "Encourager l’industrie des produits écologiques",
      C: "Faire de l’agriculture le principal moteur de croissance nationale",
      D: "Réduire la pollution de la ville",
    },
    correctAnswer: "C",
  },
  {
    word: "6) « Halleutis » est une plan de développement?",
    answers: {
      A: "de l’adduction en eau potable",
      B: "de la chasse",
      C: "de la pêche",
      D: "des sports maritimes",
    },
    correctAnswer: "C",
  },
  {
    word: "7) Parmi ces régions, laquelle n’est pas bordée d’une frontière politique internationale :",
    answers: {
      A: "Dakhla - Oued Eddahab",
      B: "Fès - Meknès",
      C: "Daraâ - Tafilalet",
      D: "L’Oriental",
    },
    correctAnswer: "B",
  },
  {
    word: "8) La Charte nationale de la déconcentration administrative est un texte juridique qui a la valeur :",
    answers: {
      A: "d’une loi-cadre",
      B: "d’une loi-ordinaire",
      C: "d’un décret",
      D: "d’un arrêté",
    },
    correctAnswer: "C",
  },
  {
    word: "9) En vertu de la constitution du Royaume du Maroc, l’organisation régionale et territoriale repose sur :",
    answers: {
      A: "Le principe de la libre administration",
      B: "Le principe de coopération",
      C: "Le principe de solidarité",
      D: "Les trois principes précités",
    },
    correctAnswer: "D",
  },
  {
    word: "10) Les membres des conseils des régions sont élus pour une période de :",
    answers: {
      A: "3 ans",
      B: "6 ans",
      C: "5 ans",
      D: "7 ans",
    },
    correctAnswer: "B",
  },
  {
    word: "11) La Haute Autorité de la Communication Audio-visuelle est une instance :",
    answers: {
      A: "Juridictionnelle",
      B: "Législative",
      C: "D’arbitrage",
      D: "De régulation",
    },
    correctAnswer: "D",
  },
  {
    word: "12) Au Maroc, le texte juridique portant sur l’état d’urgence sanitaire a été adopté par :",
    answers: {
      A: "Dahir",
      B: "Décret-loi",
      C: "Arrêté du Ministre de l’intérieur",
      D: "Décision administrative",
    },
    correctAnswer: "B",
  },
  {
    word: "13) Les membres des Conseils de communes sont élus pour un mandat de:",
    answers: {
      A: "Quatre ans",
      B: "Cinq ans",
      C: "Six ans",
      D: "Trois ans",
    },
    correctAnswer: "C",
  },
  {
    word: "14) La commission interministérielle de déconcentration administrative est présidée par le :",
    answers: {
      A: "Chef du gouvernement",
      B: "Ministre de l’intérieur",
      C: "Secrétaire général du gouvernement",
      D: "Ministre de la justice",
    },
    correctAnswer: "A",
  },
  {
    word: "15) La mission de contrôle et de vérification de la gestion administrative, technique et comptable des collectivités territoriales incombe aux :",
    answers: {
      A: "Agents d’autorité",
      B: "Inspecteurs de l’administration territoriale",
      C: "Juges de la cour des comptes",
      D: "Inspecteurs des impôts",
    },
    correctAnswer: "B",
  },
  {
    word: "16) Quel est le département ministériel qui a élaboré le projet de texte relatif à la légalisation de la culture du cannabis au Maroc à des fins médicales et thérapeutiques",
    answers: {
      A: "Le Ministère de l’Agriculture, de la Pêche Maritime, du Développement Rural et des Eaux et Forêts",
      B: "Le Ministère de la Santé",
      C: "Le Ministère de l’Intérieur",
      D: "Le Ministère de l’Industrie, du Commerce et de l’Economie Verte et Numérique",
    },
    correctAnswer: "C",
  },
  {
    word: "17) Parmi les agents d’autorité suivants, n’est pas nommé par Dahir :",
    answers: {
      A: "Le Secrétaire Général",
      B: "Le Caïd",
      C: "Le Chef de cercle",
      D: "Le Khalifa de Caïd",
    },
    correctAnswer: "D",
  },
  {
    word: "18) Le décret n°2.19.1086 du janvier 2020 relatif aux attributions et à l’organisation du ministère de l’intérieur crée de nouvelles directions. Une direction parmi les suivantes n’en fait pas partie :",
    answers: {
      A: "La Direction de la sécurité sanitaire",
      B: "La Direction des libertés et de la société civile",
      C: "La Direction de la mobilité urbaine et du transport",
      D: "La Direction de la gestion des risques naturels",
    },
    correctAnswer: "A",
  },
  {
    word: "19) Qui assure le contrôle administratif sur les collectivités territoriales :",
    answers: {
      A: "Le secrétariat général du gouvernement",
      B: "Le ministère chargé de l’agriculture",
      C: "Le ministère de l’intérieur",
      D: "Le ministère chargé des affaires sociales",
    },
    correctAnswer: "C",
  },
  {
    word: "20) Parmi les autorités suivantes, n’est pas agent d’autorité :",
    answers: {
      A: "Le gouverneur",
      B: "Le directeur du centre régional d’investissement",
      C: "Le secrétaire général de la préfecture ou de la province",
      D: "Le chef de la division des affaires intérieures",
    },
    correctAnswer: "B",
  },
  {
    word: "21) Parmi les groupes de responsables ci-après, lesquels sont à la fois des autorités de police administrative et des officiers de police judiciaire :",
    answers: {
      A: "Le gouverneur, le pacha et le caïd",
      B: "Le wali, le président du conseil régional et le président du conseil communal",
      C: "Le gouverneur, le chef de cercle, le caïd",
      D: "Le gouverneur, le président du conseil préfectoral ou provincial et le président du conseil communal",
    },
    correctAnswer: "A",
  },
  {
    word: "22) Au niveau territorial, le wali de région est:",
    answers: {
      A: "Le gouverneur de la préfecture ou de la province chef-lieu de la région",
      B: "Le supérieur hiérarchique des gouverneurs exerçant dans le ressort territorial de la région",
      C: "L’ordonnateur du budget de la région",
      D: "L’organe exécutif du conseil de la région",
    },
    correctAnswer: "A",
  },
  {
    word: "23) Les États-Unis ont reconnu la souveraineté marocaine sur le Sahara en :",
    answers: {
      A: "Octobre 2020",
      B: "Novembre 2020",
      C: "Décembre 2020",
      D: "Janvier 2021",
    },
    correctAnswer: "C",
  },
  {
    word: "24) L’abandon de famille est",
    answers: {
      A: "Une contravention",
      B: "Un délit",
      C: "Un crime",
      D: "Aucune des réponses précitées ne convient",
    },
    correctAnswer: "B",
  },
  {
    word: "25) Sa Majesté le Roi Mohammed VI a annoncé le projet de généralisation de la couverture sociale au Maroc, le :",
    answers: {
      A: "29 juillet 2020",
      B: "20 août 2020",
      C: "09 octobre 2020",
      D: "07 novembre 2020",
    },
    correctAnswer: "A",
  },
  {
    word: "26) L’acquisition de la nationalité marocaine est principalement basée sur le régime du :",
    answers: {
      A: "Droit du sol",
      B: "Droit sur sang",
      C: "Droit du sang et du sol",
      D: "Aucune des réponses précitées ne convient",
    },
    correctAnswer: "C",
  },
  {
    word: "27) Qui est l’auteur des paroles de la chanson 'Nidae El Hassan' :",
    answers: {
      A: "Mahmoud El Idrissi",
      B: "Abdelhadi Bel Khayat",
      C: "Fathallah Lamghari",
      D: "Abdallah Issami",
    },
    correctAnswer: "C",
  },
  {
    word: "28) Le droit de vote aux élections est reconnu à partir de l’âge de :",
    answers: {
      A: "16 ans",
      B: "18 ans",
      C: "21 ans",
      D: "24 ans",
    },
    correctAnswer: "C",
  },
  {
    word: "29) L’âge réglementaire minimum pour effectuer le service militaire est de :",
    answers: {
      A: "19 ans",
      B: "20 ans",
      C: "23 ans",
      D: "25 ans",
    },
    correctAnswer: "A",
  },
  {
    word: "30) Le Maroc célèbre la fête de la jeunesse le :",
    answers: {
      A: "14 Août",
      B: "30 Octobre",
      C: "21 Juillet",
      D: "21 Août",
    },
    correctAnswer: "D",
  },
];

var qcmContent2020 = [

  {
    word: "1) Quelle est la stratégie nationale qui vise à faire du secteur agricole marocain un véritable levier du développement:",
    answers: {
      A: "Plan vert de développement agricole",
      B: "Plan Maroc agricole",
      C: "Plan Maroc vert",
      D: "Plan agricole 2030",
    },
    correctAnswer: "C",
  },
  {
    word: "2) Qu’est-ce que « Interpol » ?",
    answers: {
      A: "Les forces militaires de l’OTAN",
      B: "Organisation internationale de police criminelle",
      C: "Les forces militaires de l’Europe",
      D: "Les forces de maintien de la paix de l’ONU",
    },
    correctAnswer: "B",
  },
  {
    word: "3) Parmi les livres suivants, lequel est une œuvre de Tahar Ben Jelloun :",
    answers: {
      A: "Au-delà de toute pudeur",
      B: "Au bonheur des dames",
      C: "L’enfant du sable",
      D: "Le passé simple",
    },
    correctAnswer: "C",
  },
  {
    word: "4) Parmi les quatre villes marocaines suivantes, laquelle est la capitale de la culture africaine pour 2020 :",
    answers: {
      A: "Fès",
      B: "Rabat",
      C: "Meknès",
      D: "Oujda",
    },
    correctAnswer: "B",
  },
  {
    word: "5) La COP ( 20, 21, 22…,) est une conférence qui traite :",
    answers: {
      A: "De la coopération des États au sujet des Droits de l’Homme",
      B: "De la prévention dans le monde des attentats terroristes",
      C: "Des conséquences des changements climatiques dans le monde",
      D: "De la préservation des patrimoines culturels",
    },
    correctAnswer: "C",
  },
  {
    word: "6) Quel est le nombre de femmes présidentes de conseils de régions ?",
    answers: {
      A: "0",
      B: "1",
      C: "2",
      D: "3",
    },
    correctAnswer: "C",
  },
  {
    word: "7) Le Maroc a mis en application l’état d’urgence sanitaire :",
    answers: {
      A: "Le 20 mars 2020",
      B: "Le 20 février 2020",
      C: "Le 28 mars 2020",
      D: "Le 30 mars 2020",
    },
    correctAnswer: "A",
  },
  {
    word: "8) Le fonds spécial de la gestion de la pandémie Covid-19 au Maroc, créé le 16 mars 2020 sur Hautes Instructions Royales peut recevoir :",
    answers: {
      A: "Des fonds du budget général",
      B: "Des contributions des établissements publics et privés",
      C: "Des dons des citoyens résidents au Maroc ou à l’étranger",
      D: "Des fonds de ces différentes sources citées ci-dessus",
    },
    correctAnswer: "D",
  },
  {
    word: "9) Est garant de l’indépendance du pouvoir judiciaire au Maroc :",
    answers: {
      A: "Le Juge",
      B: "Le peuple",
      C: "Le Roi",
      D: "Le Ministre de la Justice",
    },
    correctAnswer: "C",
  },
  {
    word: "10) Lesquels de ces corps représentent le pouvoir exécutif :",
    answers: {
      A: "Les magistrats",
      B: "Les députés de la chambre des représentants",
      C: "Les ministères",
      D: "Les députés de la chambre des conseillers",
    },
    correctAnswer: "C",
  },
  {
    word: "11) Les affaires de la commune sont gérées par un conseil dont les membres sont :",
    answers: {
      A: "Désignés par le Ministère de l’Intérieur",
      B: "Élus au suffrage indirect",
      C: "Élus au suffrage direct",
      D: "Désignés par les partis politiques",
    },
    correctAnswer: "C",
  },
  {
    word: "12) L’ouverture de la session parlementaire d’automne a lieu :",
    answers: {
      A: "Le 1er vendredi du mois d’octobre",
      B: "Le 2ème vendredi du mois d’octobre",
      C: "Le 1er vendredi du mois novembre",
      D: "Le 2ème vendredi du mois novembre",
    },
    correctAnswer: "B",
  },
  {
    word: "13) Quelle est la collectivité territoriale qui a parmi ses compétences propres le soutien aux entreprises ?",
    answers: {
      A: "La région",
      B: "La province",
      C: "La commune",
      D: "Toutes les collectivités territoriales précitées",
    },
    correctAnswer: "A",
  },
  {
    word: "14) Les partis politiques formant la coalition gouvernementale sont",
    answers: {
      A: "PJD, RNI, MP, USFP, UC",
      B: "PJD, PPS, MP, USFP, UC",
      C: "PJD, PPS, PAM, USFP, UC",
      D: "PJD, PI, MP, PAM, USPF",
    },
    correctAnswer: "A",
  },
  {
    word: "15) Le droit de grâce appartient :",
    answers: {
      A: "Au Ministère de la Justice",
      B: "Au Roi",
      C: "Au président de la chambre des conseillers",
      D: "Au chef du gouvernement",
    },
    correctAnswer: "B",
  },
  {
    word: "16) Qui coordonne les activités des services déconcentrés des départements ministériels ?",
    answers: {
      A: "Les présidents des conseils régionaux",
      B: "Les directeurs des centres régionaux d’investissement",
      C: "Les walis et gouverneurs",
      D: "Les présidents des communes urbaines",
    },
    correctAnswer: "C",
  },
  {
    word: "17) Laquelle des provinces suivantes ne fait pas partie de la région de Laâyoune – Sakia El Hamra :",
    answers: {
      A: "Boujdour",
      B: "Tarfaya",
      C: "Assa-Zag",
      D: "Es-Semara",
    },
    correctAnswer: "C",
  },
  {
    word: "18) Sont les collectivités territoriales :",
    answers: {
      A: "La région, la préfecture, la province et l’agence urbaine",
      B: "La région, les agences de développement, la commune et l’agence urbaine",
      C: "La commune, la préfecture, la province et la région",
      D: "La région, la préfecture, la commune et les établissements publics",
    },
    correctAnswer: "C",
  },
  {
    word: "19) Entre les organes de l’État cités ci-après, lequel est placé sous l’autorité du Ministère de l’Intérieur ?",
    answers: {
      A: "L’inspection générale des forces auxiliaires",
      B: "La gendarmerie royale",
      C: "L’inspection générale des forces armées royales",
      D: "La délégation générale à l’administration pénitentiaire et à la réinsertion",
    },
    correctAnswer: "A",
  },
  {
    word: "20) L’agent d’autorité est soumis à la déclaration obligatoire de son patrimoine. Il effectue cette déclaration auprès :",
    answers: {
      A: "Du Tribunal Administratif",
      B: "De la Cour des Comptes",
      C: "De la Cour de Cassation",
      D: "Du Tribunal de Commerce",
    },
    correctAnswer: "B",
  },
  {
    word: "21) Le Nouveau Concept de l’Autorité a été annoncé par Sa Majesté le Roi Mohammed VI, Que Dieu L’assiste, dans son Discours Royal du 12 octobre 1999 à :",
    answers: {
      A: "Rabat",
      B: "Tétouan",
      C: "Fès",
      D: "Casablanca",
    },
    correctAnswer: "D",
  },
  {
    word: "22) Parmi les domaines suivants, un domaine ne relève pas de la compétence du caïd :",
    answers: {
      A: "Le maintien de l’ordre et de la sécurité publique",
      B: "La police administrative",
      C: "La garantie du respect des libertés individuelles et collectives",
      D: "L’état civil",
    },
    correctAnswer: "D",
  },
  {
    word: "23) La fête de l’indépendance est célébrée le:",
    answers: {
      A: "10 décembre",
      B: "11 janvier",
      C: "06 novembre",
      D: "18 novembre",
    },
    correctAnswer: "D",
  },
  {
    word: "24) En quelle année est entrée en vigueur la loi 77-15 portant interdiction de la fabrication, de l’importation, de l’exportation de la commercialisation et de l’utilisation de sacs en matières plastiques au Maroc ?",
    answers: {
      A: "2014",
      B: "2015",
      C: "2016",
      D: "2017",
    },
    correctAnswer: "C",
  },
  {
    word: "25) La durée du service militaire est fixée à :",
    answers: {
      A: "6 mois",
      B: "12 mois",
      C: "18 mois",
      D: "24 mois",
    },
    correctAnswer: "B",
  },
  {
    word: "26) Le manifeste de l’indépendance du Maroc a été présenté le:",
    answers: {
      A: "20 février 1930",
      B: "11 janvier 1944",
      C: "20 août 1953",
      D: "18 novembre 1956",
    },
    correctAnswer: "B",
  },
  {
    word: "27) Les paroles de l’hymne national du Royaume du Maroc ont été écrites par :",
    answers: {
      A: "Allal El Fassi",
      B: "Ali El Haddani",
      C: "Abdelhadi Belkhayat",
      D: "Ali Squalli Houssaini",
    },
    correctAnswer: "D",
  },
  {
    word: "28) En quelle date le Maroc a rétabli le service militaire ?",
    answers: {
      A: "2016",
      B: "2018",
      C: "2017",
      D: "2019",
    },
    correctAnswer: "B",
  },
  {
    word: "29) Payer ses impôts est un acte de :",
    answers: {
      A: "Courage",
      B: "Bravoure",
      C: "Modestie",
      D: "Citoyenneté",
    },
    correctAnswer: "D",
  },
  {
    word: "30) Qu’est-ce que la déontologie ?",
    answers: {
      A: "Des règles relatives au fonctionnement des médias",
      B: "Des règles relatives à la conduite des sondages",
      C: "Des règles que doivent respecter tous les membres d’une profession",
      D: "Des règles relatives à la citoyenneté",
    },
    correctAnswer: "C",
  },

];  


currentQcmContent = qcmContent2024;
setqcmContent(currentQcmContent, [6, 6, 6, 5, 5, 2]);

submitButton.addEventListener("click", () => showResults(qcmContent2024));


document.addEventListener('DOMContentLoaded', function() {
  var dalButtons = document.querySelectorAll('[id^=switchdal]');
  var dflButtons = document.querySelectorAll('[id^=switchdfl]');
  var qcmButtons = document.querySelectorAll('[id^=switchqcm]');

  function handleDalButtonClick(clickedButton) {
    dalButtons.forEach(function(button) {
      button.classList.remove('active-button');
    });
    clickedButton.classList.add('active-button');
  }
  function handleDflButtonClick(clickedButton) {
    dflButtons.forEach(function(button) {
      button.classList.remove('active-button');
    });
    clickedButton.classList.add('active-button');
  }
  function handleQcmButtonClick(clickedButton) {
    qcmButtons.forEach(function(button) {
      button.classList.remove('active-button');
    });
    clickedButton.classList.add('active-button');
  }
  dalButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      handleDalButtonClick(button);
    });
  });
  dflButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      handleDflButtonClick(button);
    });
  });
  qcmButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      handleQcmButtonClick(button);
    });
  });
});
  

document.addEventListener('keydown', function (e) {
  const allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  const blockedModifiersWindows = ['Control', 'Alt', 'Shift', 'Meta'];
  const blockedModifiersMac = ['Meta', 'Alt', 'Shift'];

  const isWindows = navigator.platform.includes('Win');
  const isMac = navigator.platform.includes('Mac');
  const isAndroid = /Android/.test(navigator.userAgent);
  const isiPhone = /iPhone/.test(navigator.userAgent) || /iPad/.test(navigator.userAgent);

  if (
    (isWindows && !allowedKeys.includes(e.key) && isBlockedModifier(e, blockedModifiersWindows)) ||
    (isMac && !allowedKeys.includes(e.key) && isBlockedModifier(e, blockedModifiersMac)) ||
    ((isAndroid || isiPhone) && !isAllowedMobileEvent(e))
  ) {
    e.preventDefault();
  }
});

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

document.addEventListener('touchstart', function (e) {
  e.preventDefault();
});

document.addEventListener('touchmove', function (e) {
  const startX = e.touches[0].clientX;
  const startY = e.touches[0].clientY;
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;

  const deltaX = endX - startX;
  const deltaY = endY - startY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
    } else {
    }
  } else {
    if (deltaY > 0) {
    } else {
    }
  }
});

function isBlockedModifier(event, blockedModifiers) {
  return blockedModifiers.some(modifier => event.getModifierState(modifier));
}

function isAllowedMobileEvent(event) {
  return event.key === undefined && event.code === undefined && event.type === 'keydown';
}


function setfooterContent() {
  var footerContent = document.getElementById('footer');
  var currentYear = new Date().getFullYear();
  footerContent.innerHTML = `
    <p>concoursirat. &copy; ${currentYear}</p>
  `;
}

setfooterContent();
