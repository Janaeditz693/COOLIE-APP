// Application data
const appData = {
    dummyJobs: [
        {
            id: 1,
            title: "Loading Assistant Needed",
            pay: "₹500/day",
            location: "Chennai Market",
            description: "Help load and unload goods at wholesale market",
            duration: "8 hours",
            requirements: "Physical fitness required",
            employer: "Wholesale Traders Ltd",
            postedDate: "2025-01-10",
            urgency: "high"
        },
        {
            id: 2,
            title: "House Cleaning Services",
            pay: "₹400/day", 
            location: "T. Nagar",
            description: "Deep cleaning of 3BHK apartment",
            duration: "6 hours",
            requirements: "Experience in house cleaning",
            employer: "Residential Services",
            postedDate: "2025-01-09",
            urgency: "medium"
        },
        {
            id: 3,
            title: "Wall Painting Work",
            pay: "₹800/day",
            location: "Velachery",
            description: "Paint exterior walls of residential building",
            duration: "Full day",
            requirements: "Painting experience mandatory",
            employer: "Construction Corp",
            postedDate: "2025-01-08",
            urgency: "high"
        },
        {
            id: 4,
            title: "Delivery Boy Required",
            pay: "₹350/day",
            location: "Anna Nagar",
            description: "Deliver packages in local area using bike",
            duration: "10 hours",
            requirements: "Own two-wheeler, valid license",
            employer: "Quick Delivery Services",
            postedDate: "2025-01-07",
            urgency: "low"
        },
        {
            id: 5,
            title: "Electrical Helper",
            pay: "₹600/day",
            location: "Adyar",
            description: "Assist electrician in wiring new construction",
            duration: "8 hours", 
            requirements: "Basic electrical knowledge",
            employer: "Power Solutions",
            postedDate: "2025-01-06",
            urgency: "medium"
        },
        {
            id: 6,
            title: "Cook Assistant",
            pay: "₹450/day",
            location: "Mylapore",
            description: "Assist chef in restaurant kitchen",
            duration: "9 hours",
            requirements: "Food handling experience",
            employer: "Traditional Foods",
            postedDate: "2025-01-05",
            urgency: "medium"
        }
    ],
    userProfile: {
        name: "Karthik",
        phone: "+91 98765 43210",
        skills: ["Porter", "Cleaner"],
        isAvailable: true,
        profilePhoto: null,
        voiceIntro: null,
        upiId: "coolie@ybl",
        todayEarnings: 500,
        weeklyEarnings: 2500,
        monthlyEarnings: 12000,
        rating: 4.2,
        completedJobs: 23,
        location: "Chennai",
        experience: "2 years"
    },
    skillOptions: [
        {
            name: "Porter",
            icon: "fas fa-box",
            description: "Loading and unloading goods"
        },
        {
            name: "Painter", 
            icon: "fas fa-paint-roller",
            description: "Wall and surface painting"
        },
        {
            name: "Electrician",
            icon: "fas fa-bolt",
            description: "Electrical repairs and installation"
        },
        {
            name: "Cleaner",
            icon: "fas fa-broom",
            description: "House and office cleaning"
        },
        {
            name: "Delivery",
            icon: "fas fa-motorcycle",
            description: "Package and food delivery"
        }
    ],
    languages: [
        {
            code: "ta",
            name: "தமிழ்",
            flag: "🇮🇳",
            translations: {
                greeting: "வணக்கம், கார்த்திக்!",
                findWork: "வேலை தேடுங்கள்",
                postJob: "வேலை விளம்பரம்",
                myJobs: "என் வேலைகள்",
                profile: "சுயவிவரம்",
                wallet: "பணப்பை"
            }
        },
        {
            code: "en", 
            name: "English",
            flag: "🇺🇸",
            translations: {
                greeting: "Vanakkam, Karthik!",
                findWork: "Find Work",
                postJob: "Post a Job", 
                myJobs: "My Jobs",
                profile: "My Profile",
                wallet: "Wallet"
            }
        },
        {
            code: "hi",
            name: "हिन्दी", 
            flag: "🇮🇳",
            translations: {
                greeting: "नमस्ते, कार्तिक!",
                findWork: "काम खोजें",
                postJob: "नौकरी पोस्ट करें",
                myJobs: "मेरी नौकरियां",
                profile: "मेरी प्रोफ़ाइल",
                wallet: "वॉलेट"
            }
        }
    ]
};

// Application state
let currentScreen = 'splash-screen';
let currentLanguage = 'en';
let filteredJobs = [...appData.dummyJobs];
let isRecording = false;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('App initializing...');
    initializeApp();
});

function initializeApp() {
    console.log('App initialized');
    
    // Show splash screen for 3 seconds
    setTimeout(() => {
        navigateToScreen('home-screen');
    }, 3000);
    
    // Setup event listeners
    setupEventListeners();
    
    // Populate dynamic content
    populateJobsList();
    populateSkillsGrid();
    populateLanguageOptions();
    updateLanguageContent();
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Use direct event listeners for better reliability
    document.addEventListener('click', handleGlobalClick, true);
    
    // Search functionality
    setTimeout(setupSearchInput, 1000);
    
    // Form submission
    setTimeout(setupFormHandlers, 1000);
}

function handleGlobalClick(e) {
    // Prevent default behavior for buttons
    if (e.target.closest('button')) {
        e.preventDefault();
    }
    
    // Handle action buttons
    const actionButton = e.target.closest('.action-button');
    if (actionButton) {
        console.log('Action button clicked:', actionButton.getAttribute('data-screen'));
        const targetScreen = actionButton.getAttribute('data-screen');
        if (targetScreen) {
            navigateToScreen(targetScreen);
        }
        return;
    }
    
    // Handle back buttons
    const backButton = e.target.closest('.back-btn');
    if (backButton) {
        console.log('Back button clicked');
        const targetScreen = backButton.getAttribute('data-screen') || 'home-screen';
        navigateToScreen(targetScreen);
        return;
    }
    
    // Handle apply buttons
    const applyButton = e.target.closest('.apply-btn');
    if (applyButton) {
        console.log('Apply button clicked');
        const jobId = applyButton.getAttribute('data-job-id');
        applyToJob(jobId);
        return;
    }
    
    // Handle skill items
    const skillItem = e.target.closest('.skill-item');
    if (skillItem) {
        console.log('Skill item clicked');
        toggleSkill(skillItem);
        return;
    }
    
    // Handle language options
    const languageOption = e.target.closest('.language-option');
    if (languageOption) {
        console.log('Language option clicked');
        const langCode = languageOption.getAttribute('data-lang');
        selectLanguage(langCode);
        return;
    }
    
    // Handle voice recording
    if (e.target.closest('#voice-record')) {
        console.log('Voice record clicked');
        toggleVoiceRecording();
        return;
    }
    
    // Handle success modal close
    if (e.target.closest('#success-close')) {
        console.log('Success close clicked');
        hideSuccessModal();
        return;
    }
}

function setupSearchInput() {
    const searchInput = document.getElementById('job-search');
    if (searchInput) {
        console.log('Setting up search input');
        searchInput.addEventListener('input', function(e) {
            console.log('Search input:', e.target.value);
            filterJobs(e.target.value);
        });
    }
}

function setupFormHandlers() {
    const postJobForm = document.getElementById('post-job-form');
    if (postJobForm) {
        console.log('Setting up form handler');
        postJobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            submitJobForm();
        });
    }
    
    const availabilityToggle = document.getElementById('availability-toggle');
    if (availabilityToggle) {
        availabilityToggle.addEventListener('change', function(e) {
            appData.userProfile.isAvailable = e.target.checked;
            showSuccess('Availability Updated', 'Your availability status has been updated.');
        });
    }
}

function navigateToScreen(screenId) {
    console.log(`Navigating from ${currentScreen} to ${screenId}`);
    
    const currentScreenEl = document.getElementById(currentScreen);
    const targetScreenEl = document.getElementById(screenId);
    
    if (!targetScreenEl) {
        console.error('Target screen not found:', screenId);
        return;
    }
    
    if (currentScreenEl) {
        currentScreenEl.classList.remove('active');
    }
    
    targetScreenEl.classList.add('active');
    currentScreen = screenId;
    
    console.log(`Successfully navigated to ${screenId}`);
    
    // Refresh content for specific screens
    setTimeout(() => {
        if (screenId === 'find-work-screen') {
            populateJobsList();
        } else if (screenId === 'profile-screen') {
            populateSkillsGrid();
        } else if (screenId === 'language-screen') {
            populateLanguageOptions();
        }
    }, 100);
}

function populateJobsList() {
    const jobsList = document.getElementById('jobs-list');
    if (!jobsList) return;
    
    console.log('Populating jobs list with', filteredJobs.length, 'jobs');
    jobsList.innerHTML = '';
    
    if (filteredJobs.length === 0) {
        jobsList.innerHTML = '<div class="glass-card"><p style="text-align: center; color: rgba(255,255,255,0.7);">No jobs found matching your search.</p></div>';
        return;
    }
    
    filteredJobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <div class="job-title">${job.title}</div>
            <div class="job-pay">${job.pay}</div>
            <div class="job-location"><i class="fas fa-map-marker-alt"></i> ${job.location}</div>
            <div class="job-description">${job.description}</div>
            <div class="job-details">
                <span><i class="fas fa-clock"></i> ${job.duration}</span>
                <span class="urgency-${job.urgency}"><i class="fas fa-exclamation-circle"></i> ${job.urgency.toUpperCase()}</span>
                <span><i class="fas fa-calendar"></i> ${job.postedDate}</span>
            </div>
            <button type="button" class="apply-btn" data-job-id="${job.id}">
                <i class="fas fa-paper-plane"></i> Apply
            </button>
        `;
        jobsList.appendChild(jobCard);
    });
}

function filterJobs(searchTerm) {
    console.log('Filtering jobs with:', searchTerm);
    
    if (!searchTerm || !searchTerm.trim()) {
        filteredJobs = [...appData.dummyJobs];
    } else {
        const term = searchTerm.toLowerCase();
        filteredJobs = appData.dummyJobs.filter(job => 
            job.title.toLowerCase().includes(term) ||
            job.location.toLowerCase().includes(term) ||
            job.description.toLowerCase().includes(term) ||
            job.employer.toLowerCase().includes(term)
        );
    }
    
    populateJobsList();
}

function applyToJob(jobId) {
    console.log('Applying to job:', jobId);
    
    const job = appData.dummyJobs.find(j => j.id == jobId);
    if (!job) {
        console.error('Job not found:', jobId);
        showSuccess('Error', 'Job not found.');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showSuccess('Application Sent!', `Your application for "${job.title}" has been sent successfully. The employer will contact you soon.`);
    }, 1500);
}

function populateSkillsGrid() {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) return;
    
    console.log('Populating skills grid');
    skillsGrid.innerHTML = '';
    
    appData.skillOptions.forEach(skill => {
        const isSelected = appData.userProfile.skills.includes(skill.name);
        const skillItem = document.createElement('div');
        skillItem.className = `skill-item ${isSelected ? 'selected' : ''}`;
        skillItem.setAttribute('data-skill', skill.name);
        skillItem.innerHTML = `
            <div class="skill-checkbox ${isSelected ? 'checked' : ''}"></div>
            <i class="${skill.icon}"></i>
            <div class="skill-info">
                <div class="skill-name">${skill.name}</div>
                <div class="skill-description">${skill.description}</div>
            </div>
        `;
        skillsGrid.appendChild(skillItem);
    });
}

function toggleSkill(skillItem) {
    const skillName = skillItem.getAttribute('data-skill');
    const checkbox = skillItem.querySelector('.skill-checkbox');
    const isCurrentlySelected = skillItem.classList.contains('selected');
    
    if (isCurrentlySelected) {
        appData.userProfile.skills = appData.userProfile.skills.filter(s => s !== skillName);
        skillItem.classList.remove('selected');
        checkbox.classList.remove('checked');
    } else {
        appData.userProfile.skills.push(skillName);
        skillItem.classList.add('selected');
        checkbox.classList.add('checked');
    }
    
    console.log('Updated skills:', appData.userProfile.skills);
}

function populateLanguageOptions() {
    const languageOptions = document.getElementById('language-options');
    if (!languageOptions) return;
    
    console.log('Populating language options');
    languageOptions.innerHTML = '';
    
    appData.languages.forEach(language => {
        const isSelected = currentLanguage === language.code;
        const languageOption = document.createElement('div');
        languageOption.className = `language-option ${isSelected ? 'selected' : ''}`;
        languageOption.setAttribute('data-lang', language.code);
        languageOption.innerHTML = `
            <div class="language-flag">${language.flag}</div>
            <div class="language-name">${language.name}</div>
            <div class="language-radio ${isSelected ? 'checked' : ''}"></div>
        `;
        languageOptions.appendChild(languageOption);
    });
}

function selectLanguage(langCode) {
    console.log('Selecting language:', langCode);
    
    currentLanguage = langCode;
    
    // Update UI
    document.querySelectorAll('.language-option').forEach(option => {
        const radio = option.querySelector('.language-radio');
        if (option.getAttribute('data-lang') === langCode) {
            option.classList.add('selected');
            radio.classList.add('checked');
        } else {
            option.classList.remove('selected');
            radio.classList.remove('checked');
        }
    });
    
    updateLanguageContent();
    
    const selectedLang = appData.languages.find(l => l.code === langCode);
    if (selectedLang) {
        showSuccess('Language Changed', `Language has been changed to ${selectedLang.name}`);
    }
}

function updateLanguageContent() {
    const currentLangData = appData.languages.find(l => l.code === currentLanguage);
    if (!currentLangData) return;
    
    const translations = currentLangData.translations;
    
    // Update greeting
    const greetingElement = document.getElementById('greeting-text');
    if (greetingElement) {
        greetingElement.textContent = translations.greeting;
    }
    
    // Update action button texts
    const updates = [
        { id: 'find-work-text', text: translations.findWork },
        { id: 'post-job-text', text: translations.postJob },
        { id: 'my-jobs-text', text: translations.myJobs },
        { id: 'profile-text', text: translations.profile },
        { id: 'wallet-text', text: translations.wallet }
    ];
    
    updates.forEach(update => {
        const element = document.getElementById(update.id);
        if (element) {
            element.textContent = update.text;
        }
    });
}

function toggleVoiceRecording() {
    const voiceBtn = document.getElementById('voice-record');
    if (!voiceBtn) return;
    
    if (!isRecording) {
        isRecording = true;
        voiceBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Recording';
        voiceBtn.style.background = 'rgba(255, 107, 107, 0.3)';
        voiceBtn.style.animation = 'pulse 1s ease-in-out infinite';
        
        setTimeout(() => {
            if (isRecording) {
                stopVoiceRecording();
            }
        }, 5000);
    } else {
        stopVoiceRecording();
    }
}

function stopVoiceRecording() {
    const voiceBtn = document.getElementById('voice-record');
    if (!voiceBtn) return;
    
    isRecording = false;
    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i> Record Voice Intro';
    voiceBtn.style.background = '';
    voiceBtn.style.animation = '';
    
    showSuccess('Voice Recorded!', 'Your voice introduction has been recorded successfully.');
}

function submitJobForm() {
    const formData = {
        title: document.getElementById('job-title')?.value || '',
        description: document.getElementById('job-description')?.value || '',
        pay: document.getElementById('job-pay')?.value || '',
        location: document.getElementById('job-location')?.value || '',
        date: document.getElementById('job-date')?.value || '',
        phone: document.getElementById('job-phone')?.value || ''
    };
    
    // Basic validation
    const requiredFields = ['title', 'description', 'pay', 'location', 'date', 'phone'];
    const emptyFields = requiredFields.filter(field => !formData[field].trim());
    
    if (emptyFields.length > 0) {
        showSuccess('Validation Error', 'Please fill in all required fields.');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        // Reset form
        const form = document.getElementById('post-job-form');
        if (form) form.reset();
        
        showSuccess('Job Posted!', 'Your job posting has been submitted successfully and will be reviewed shortly.');
        
        setTimeout(() => {
            navigateToScreen('home-screen');
        }, 2500);
    }, 2000);
}

function showLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('hidden');
    }
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
    }
}

function showSuccess(title, message) {
    console.log('Showing success modal:', title, message);
    
    const successModal = document.getElementById('success-modal');
    const titleEl = document.getElementById('success-title');
    const messageEl = document.getElementById('success-message');
    
    if (titleEl) titleEl.textContent = title;
    if (messageEl) messageEl.textContent = message;
    if (successModal) {
        successModal.classList.remove('hidden');
    }
}

function hideSuccessModal() {
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        successModal.classList.add('hidden');
    }
}

// Add pulse animation styles
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
@keyframes pulse {
    0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7);
    }
    70% {
        transform: scale(1.05);
        box-shadow: 0 0 0 10px rgba(255, 107, 107, 0);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 107, 107, 0);
    }
}
`;
document.head.appendChild(pulseStyle);

console.log('COOLIE app loaded successfully');
