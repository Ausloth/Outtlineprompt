import { ACTIVITIES, CATEGORIES, BLANK_ACTIVITY } from './data.js';

// Application State
const state = {
  screen: 'home',
  searchQuery: '',
  selectedCategory: 'All',
  currentActivity: null
};

// DOM Elements
const screens = {
  home: document.getElementById('screen-home'),
  form: document.getElementById('screen-form'),
  result: document.getElementById('screen-result')
};

function init() {
  document.getElementById('logo-btn').addEventListener('click', goHome);
  document.getElementById('btn-surprise').addEventListener('click', () => {
    const random = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
    openForm(random);
  });
  
  document.getElementById('search-input').addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderCatalog();
  });

  document.getElementById('btn-cancel-form').addEventListener('click', goHome);
  document.getElementById('btn-submit-form').addEventListener('click', () => {
    // Trigger hidden submit button to validate HTML5 form
    document.querySelector('#customize-form input[type="submit"]').click();
  });

  document.getElementById('customize-form').addEventListener('submit', (e) => {
    e.preventDefault();
    generatePrompt();
  });

  document.getElementById('btn-restart').addEventListener('click', goHome);
  document.getElementById('btn-copy').addEventListener('click', copyToClipboard);

  // Initial Render
  renderCategories();
  goHome();
}

function showScreen(name) {
  state.screen = name;
  Object.values(screens).forEach(el => el.classList.add('hidden'));
  screens[name].classList.remove('hidden');

  const headerNav = document.getElementById('header-nav');
  if (name === 'home') {
    headerNav.innerHTML = `<button id="btn-make-own" class="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 hover:bg-slate-800 transition-colors font-bold">➕ Make My Own</button>`;
    document.getElementById('btn-make-own').addEventListener('click', () => openForm(BLANK_ACTIVITY));
    renderCatalog();
  } else {
    headerNav.innerHTML = `<button id="btn-back" class="text-slate-500 hover:text-slate-800 transition-colors text-xs font-semibold">Back to Catalog</button>`;
    document.getElementById('btn-back').addEventListener('click', goHome);
  }
}

function goHome() {
  showScreen('home');
}

function renderCategories() {
  const container = document.getElementById('category-filters');
  const allCats = ['All', ...CATEGORIES];
  
  container.innerHTML = allCats.map(cat => `
    <button class="cat-btn px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-colors ${state.selectedCategory === cat ? 'bg-emerald-600 text-white' : 'bg-white text-slate-500 border border-[#e5e0db] hover:bg-slate-50'}" data-category="${cat}">
      ${cat}
    </button>
  `).join('');

  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.selectedCategory = e.target.dataset.category;
      renderCategories(); // Update active styles
      renderCatalog();
    });
  });
}

function renderCatalog() {
  const container = document.getElementById('activities-grid');
  const emptyState = document.getElementById('activities-empty');
  
  const filtered = ACTIVITIES.filter(act => {
    const matchesCat = state.selectedCategory === 'All' || act.category === state.selectedCategory;
    const matchesSearch = act.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                          act.description.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    container.classList.add('hidden');
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    container.classList.remove('hidden');
    
    container.innerHTML = filtered.map(act => `
      <div class="bg-white border border-[#e5e0db] rounded-2xl p-5 hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group flex flex-col h-full" onclick="window.openActivityForm('${act.id}')">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors border border-[#e5e0db] group-hover:border-emerald-100 shadow-sm shrink-0">
            ${act.emoji}
          </div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
            ${act.category}
          </span>
        </div>
        <h3 class="text-sm font-bold text-slate-900 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">${act.name}</h3>
        <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1">${act.description}</p>
      </div>
    `).join('');
  }
}

window.openActivityForm = function(id) {
  const act = ACTIVITIES.find(a => a.id === id);
  if (act) openForm(act);
}

function openForm(activity) {
  state.currentActivity = activity;
  
  // Update header text in form
  document.getElementById('form-icon').innerText = activity.emoji;
  document.getElementById('form-subtitle').innerText = activity.name === 'Custom Activity' ? 'Blank Canvas' : activity.category;
  
  // Populate form fields
  document.getElementById('f-activityName').value = activity.name === 'Custom Activity' ? '' : activity.name;
  document.getElementById('f-suburbCity').value = '';
  document.getElementById('f-durationWeeks').value = '24';
  document.getElementById('f-activityBlurb').value = activity.blurb || '';
  document.getElementById('f-sessionType').value = 'All Day';
  document.getElementById('f-availableTransport').value = '';
  document.getElementById('f-locationPreference').value = 'Mix of Onsite & Offsite';
  document.getElementById('f-minParticipants').value = '3';
  document.getElementById('f-maxParticipants').value = '8';
  document.getElementById('f-accessibilityLevel').value = 'Medium (Step access okay)';
  document.getElementById('f-capacityLevel').value = 'Low';
  document.getElementById('f-groupSizeSupportRatio').value = '1:3 or 1:4';
  document.getElementById('f-ndisGoals').value = '';
  document.getElementById('f-costPerPerson').value = '0';
  document.getElementById('f-targetParticipantProfile').value = '';
  document.getElementById('f-additionalNotes').value = '';

  showScreen('form');
}

function generatePrompt() {
  const data = {
    activityName: document.getElementById('f-activityName').value,
    suburbCity: document.getElementById('f-suburbCity').value,
    durationWeeks: document.getElementById('f-durationWeeks').value,
    activityBlurb: document.getElementById('f-activityBlurb').value,
    sessionType: document.getElementById('f-sessionType').value,
    availableTransport: document.getElementById('f-availableTransport').value,
    locationPreference: document.getElementById('f-locationPreference').value,
    minParticipants: document.getElementById('f-minParticipants').value,
    maxParticipants: document.getElementById('f-maxParticipants').value,
    accessibilityLevel: document.getElementById('f-accessibilityLevel').value,
    capacityLevel: document.getElementById('f-capacityLevel').value,
    groupSizeSupportRatio: document.getElementById('f-groupSizeSupportRatio').value,
    ndisGoals: document.getElementById('f-ndisGoals').value,
    costPerPerson: document.getElementById('f-costPerPerson').value,
    targetParticipantProfile: document.getElementById('f-targetParticipantProfile').value,
    additionalNotes: document.getElementById('f-additionalNotes').value,
  };

  const prompt = `Please generate an interactive, engaging, and professional 26-week activity outline for an adult Day Service program in Australia. The program caters to adults with disabilities (NDIS participants).

PARAMETERS:
- Activity Name: ${data.activityName}
- Activity Blurb/Concept: ${data.activityBlurb}
- Location / Suburb: ${data.suburbCity}
- Duration: ${data.durationWeeks} weeks
- Session Type: ${data.sessionType}
- Location Preference (Onsite/Offsite): ${data.locationPreference}
- Transport Details: ${data.availableTransport || "None specified"}
- Participant Count: ${data.minParticipants} Min - ${data.maxParticipants} Max
- Accessibility Constraints: ${data.accessibilityLevel}
- Physical/Behavioral Capacity Level: ${data.capacityLevel}
- Support Ratio Advice: ${data.groupSizeSupportRatio || "Standard"}
- Estimated Weekly Cost per Person: $${parseFloat(data.costPerPerson || 0).toFixed(2)}
- Target Participant Profile: ${data.targetParticipantProfile || "General adult disability day service group"}
- Supported NDIS Goals: ${data.ndisGoals || "Social/Community Participation, Daily Living, Wellbeing"}
- Additional Notes/Requirements: ${data.additionalNotes || "None"}

Please ensure the generated activity outline strictly follows the core theme, style, and concept described in this blurb: "${data.activityBlurb}"

You MUST structure the output EXACTLY using the following sections. Do not deviate from these headings. Fill in all empty placeholders.

### ACTIVITY INFORMATION AND OUTCOMES
[Provide a warm, inclusive 2-3 sentence overview of the activity and its benefits, expanding on the core concept provided.]

**Date:** [Insert current date]
**Review Due date:** [Insert date 6 months from now]
**Location of activity:** ${data.suburbCity}
**Staff:** To be rostered
**Number of Clients (Min - Max):** ${data.minParticipants} to ${data.maxParticipants}

### RESOURCES / REQUIRED ITEMS
[Provide a bulleted list of specific physical resources, equipment, booking requirements, or items needed to run this activity.]

### NDIS GOALS / OUTCOMES MET
[Provide a bulleted list of 3-4 specific outcomes participants will achieve relative to NDIS reporting such as skill building, social engagement, or wellbeing, matching the parameters.]

### HOW
[Provide 2-3 paragraphs describing the general logistical flow of a typical session. Include details on how the group transitions, utilizes the venue/transport, and manages time blocks.]

### WHERE
[Provide specific location guidance, including potential community partners or venue types within ${data.suburbCity}.]

### COST AND FINANCIAL MANAGEMENT
[Calculate the total term cost assuming $${parseFloat(data.costPerPerson || 0).toFixed(2)} per week * ${data.durationWeeks} weeks. Write a short explanation of how the budget should be handled (cash vs invoice) based on the activity nature.]

### WHS REQUIREMENTS AND CONSIDERATIONS
[Provide a bulleted list of 4-5 crucial Health and Safety considerations tailored to the location, activity type, accessibility level (${data.accessibilityLevel}), and group capacity (${data.capacityLevel}).]

### STAFF GUIDE
[Provide a comprehensive, detailed 2-3 paragraph companion guide for staff members explaining exactly how to run the activity on the ground. This guide is meant for staff to read a week before, a day before, or as they arrive on site to prep themselves. Include specific pointers, talking points, engagement techniques, and practical advice for supporting the participants.]

### PROPOSED SCHEDULE
[Provide a table structure or clear week-by-week listing for exactly ${data.durationWeeks} weeks. Provide a specific, actionable theme or focus for each week. Do not group weeks together (e.g. no "Weeks 1-4"). Each week MUST have its own dedicated title and short description of the task/focus.]`;

  document.getElementById('prompt-output').innerText = prompt;
  showScreen('result');
}

function copyToClipboard() {
  const text = document.getElementById('prompt-output').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btnText = document.getElementById('copy-text');
    btnText.innerText = "✅ Copied!";
    setTimeout(() => {
      btnText.innerText = "📋 Copy Prompt";
    }, 2000);
  });
}

// Start
init();
