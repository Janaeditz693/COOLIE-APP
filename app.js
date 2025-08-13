// Application data
const appData = {
    dummyJobs: [
        {
            id: 1,
            title: "Loading Assistant Needed",
            pay: "₹500/day",
            location: "Chennai Market",
            description: "Help load and unload goods at wholesale market. Physical fitness required.",
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
            description: "Deep cleaning of 3BHK apartment. Experience in house cleaning preferred.",
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
            description: "Paint exterior walls of residential building. Painting experience mandatory.",
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
            description: "Deliver packages in local area using bike. Own two-wheeler required.",
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
            description: "Assist electrician in wiring new construction. Basic electrical knowledge preferred.",
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
            description: "Assist chef in restaurant kitchen. Food handling experience required.",
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

// Application state with navigation history management
let currentScreen = 'splash-screen';
let currentLanguage = 'en';
let filteredJobs = [...appData.dummyJobs];
let isRecording = false;
let jobsLoaded = false;

// Navigation history stack for back button functionality - manages screen navigation flow
let navigationHistory = [];

// Long press state for landing shortcut - tracks home icon long press functionality
let longPressTimer = null;
let isLongPressing = false;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('App initializing...');
    initializeApp();
});

function initializeApp() {
    console.log('App initialized with navigation history management');
    
    // Setup lazy loading for images
    setupLazyLoading();
    
    // Show splash screen for 3 seconds
    setTimeout(() => {
        navigateTo('landing-screen');
    }, 3000);
    
    // Setup event listeners including navigation
    setupEventListeners();
    setupNavigationEventListeners();
    setupKeyboardBackSupport();
    
    // Populate dynamic content immediately
    populateSkillsGrid();
    populateLanguageOptions();
    updateLanguageContent();
    populateJobHistory();
    
    // Setup accessibility
    setupAccessibility();
}

function setupLazyLoading() {
    // Setup IntersectionObserver for lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        // Observe all images with data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

function setupAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
        
        // ESC to close modals
        if (e.key === 'Escape') {
            const visibleModal = document.querySelector('.modal:not(.hidden)');
            if (visibleModal) {
                hideSuccessModal();
            }
        }
    });
    
    document.addEventListener('click', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

// Enhanced navigation system with history management
function setupNavigationEventListeners() {
    console.log('Setting up navigation event listeners with history management');
    
    // Setup back button event listeners for all screens - handles header back navigation
    document.addEventListener('click', (e) => {
        if (e.target.closest('.back-btn')) {
            e.preventDefault();
            triggerHapticFeedback();
            navigateBack();
        }
    });
    
    // Setup landing shortcut with long press functionality
    setupLandingShortcut();
}

function setupLandingShortcut() {
    // Setup long press functionality for center home icon in bottom navigation
    const landingShortcuts = document.querySelectorAll('#landing-shortcut');
    
    landingShortcuts.forEach(shortcut => {
        const tooltip = shortcut.querySelector('.nav-tooltip');
        
        // Prevent normal click behavior on landing shortcut
        shortcut.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        
        // Mouse events
        shortcut.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            startLongPress(tooltip);
        });
        
        shortcut.addEventListener('mouseup', (e) => {
            e.preventDefault();
            e.stopPropagation();
            endLongPress(tooltip);
        });
        
        shortcut.addEventListener('mouseleave', (e) => {
            endLongPress(tooltip);
        });
        
        // Touch events for mobile
        shortcut.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            startLongPress(tooltip);
        });
        
        shortcut.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            endLongPress(tooltip);
        });
        
        shortcut.addEventListener('touchcancel', (e) => {
            endLongPress(tooltip);
        });
    });
}

function startLongPress(tooltip) {
    if (longPressTimer) return;
    
    isLongPressing = false;
    
    // Show tooltip immediately
    if (tooltip) {
        tooltip.classList.remove('hidden');
        tooltip.classList.add('show');
    }
    
    // Set timer for long press (600ms as specified)
    longPressTimer = setTimeout(() => {
        isLongPressing = true;
        triggerHapticFeedback();
        
        // Navigate to landing screen - clears history for direct landing access
        navigationHistory = []; // Clear history when jumping to landing
        navigateTo('landing-screen');
        
        console.log('Long press detected - jumping to landing screen');
    }, 600);
}

function endLongPress(tooltip) {
    if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
    }
    
    // Hide tooltip
    if (tooltip) {
        tooltip.classList.remove('show');
        setTimeout(() => {
            tooltip.classList.add('hidden');
        }, 200);
    }
    
    // Reset long press state
    setTimeout(() => {
        isLongPressing = false;
    }, 100);
}

// Keyboard and hardware back button support - handles browser back/backspace navigation
function setupKeyboardBackSupport() {
    console.log('Setting up keyboard/hardware back support');
    
    // Listen for browser back button (popstate event)
    window.addEventListener('popstate', (e) => {
        e.preventDefault();
        navigateBack();
    });
    
    // Listen for backspace key as fallback
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            navigateBack();
        }
    });
}

function setupEventListeners() {
    console.log('Setting up main event listeners...');
    
    // Main click handler with improved delegation
    document.addEventListener('click', handleAllClicks);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Search functionality
    setupSearchInput();
    
    // Form submission
    setupFormHandlers();
}

function handleAllClicks(e) {
    const target = e.target;
    const button = target.closest('button, .action-button, .glass-button, .nav-item, .settings-item, .language-option, .skill-item, .help-item, .contact-item');
    
    if (!button) return;
    
    // Skip landing shortcut clicks (handled by long press) - prevent interference with long press
    if (button.id === 'landing-shortcut') {
        return;
    }
    
    // Always prevent default for handled buttons
    e.preventDefault();
    
    // Handle Get Started button specifically
    if (button.id === 'get-started-btn') {
        console.log('Get Started button clicked');
        triggerHapticFeedback();
        navigateTo('home-screen');
        updateBottomNavActiveState('home-screen');
        return;
    }
    
    // Get screen target from various possible attributes
    const screenTarget = button.getAttribute('data-screen') || 
                        button.closest('[data-screen]')?.getAttribute('data-screen');
    
    console.log('Click detected on:', button.className, 'Target screen:', screenTarget);
    
    // Handle navigation buttons
    if (screenTarget) {
        triggerHapticFeedback();
        navigateTo(screenTarget);
        updateBottomNavActiveState(screenTarget);
        return;
    }
    
    // Handle specific button types
    if (button.classList.contains('apply-btn')) {
        const jobId = button.getAttribute('data-job-id');
        triggerHapticFeedback();
        applyToJob(jobId);
        return;
    }
    
    if (button.classList.contains('skill-item')) {
        toggleSkill(button);
        return;
    }
    
    if (button.classList.contains('language-option')) {
        const langCode = button.getAttribute('data-lang');
        selectLanguage(langCode);
        return;
    }
    
    if (button.id === 'voice-record') {
        triggerHapticFeedback();
        toggleVoiceRecording();
        return;
    }
    
    if (button.id === 'success-close') {
        hideSuccessModal();
        return;
    }
    
    // Handle form submission
    if (button.type === 'submit') {
        triggerHapticFeedback();
        if (button.closest('#post-job-form')) {
            submitJobForm();
        }
        return;
    }
    
    // Handle other interactive elements
    if (button.classList.contains('help-item') || button.classList.contains('contact-item')) {
        showSuccess('Feature Coming Soon', 'This feature will be available in the next update.');
        return;
    }
}

function handleMouseDown(e) {
    const button = e.target.closest('button, .action-button, .glass-button, .apply-btn');
    if (button && button.id !== 'landing-shortcut') {
        button.classList.add('btn-press');
        createRipple(e, button);
    }
}

function handleMouseUp(e) {
    const button = e.target.closest('button, .action-button, .glass-button, .apply-btn');
    if (button) {
        setTimeout(() => {
            button.classList.remove('btn-press');
        }, 100);
    }
}

function createRipple(event, element) {
    const button = element;
    const ripple = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function triggerHapticFeedback() {
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
}

// Enhanced navigation with history management and bottom nav control
function navigateTo(screenId) {
    console.log(`Navigating from ${currentScreen} to ${screenId}`);
    
    // Don't add to history if we're going to the same screen
    if (currentScreen === screenId) {
        return;
    }
    
    // Add current screen to history stack (but not splash or if coming from splash)
    // History management: tracks previous screens for back button functionality
    if (currentScreen !== 'splash-screen' && currentScreen !== screenId) {
        navigationHistory.push(currentScreen);
        console.log('Added to history:', currentScreen, 'History stack:', navigationHistory);
    }
    
    // Hide all screens first
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
        console.log(`Successfully navigated to ${screenId}`);
        
        // Handle bottom navigation visibility
        handleBottomNavVisibility(screenId);
        
        // Handle screen-specific logic
        handleScreenSpecificLogic(screenId);
        
        // Update browser history for back button support
        if (screenId !== 'splash-screen') {
            history.pushState({ screen: screenId }, '', `#${screenId}`);
        }
    } else {
        console.error('Target screen not found:', screenId);
    }
}

// Handle bottom navigation visibility based on current screen
function handleBottomNavVisibility(screenId) {
    const bottomNavs = document.querySelectorAll('#bottom-nav');
    
    if (screenId === 'landing-screen') {
        // Hide bottom nav on landing screen
        bottomNavs.forEach(nav => {
            nav.style.display = 'none';
        });
        console.log('Bottom nav hidden for landing screen');
    } else {
        // Show bottom nav on all other screens
        bottomNavs.forEach(nav => {
            nav.style.display = 'flex';
        });
        console.log('Bottom nav shown for screen:', screenId);
    }
}

// Back navigation function with history management - handles back button clicks
function navigateBack() {
    console.log('Navigate back requested. Current history:', navigationHistory);
    
    // If we have history, go back to the previous screen
    if (navigationHistory.length > 0) {
        const previousScreen = navigationHistory.pop();
        console.log('Going back to:', previousScreen);
        
        // Navigate without adding to history
        const tempHistory = [...navigationHistory];
        navigateToWithoutHistory(previousScreen);
        navigationHistory = tempHistory;
        
        updateBottomNavActiveState(previousScreen);
    } else {
        // No history available, go to landing screen as fallback
        console.log('No history available, going to landing screen');
        navigationHistory = []; // Clear any remaining history
        navigateToWithoutHistory('landing-screen');
        updateBottomNavActiveState('landing-screen');
    }
}

// Navigate without adding to history (used by navigateBack)
function navigateToWithoutHistory(screenId) {
    console.log(`Navigating to ${screenId} without adding to history`);
    
    // Hide all screens first
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
        
        // Handle bottom navigation visibility
        handleBottomNavVisibility(screenId);
        
        // Handle screen-specific logic
        handleScreenSpecificLogic(screenId);
    }
}

function handleScreenSpecificLogic(screenId) {
    switch(screenId) {
        case 'find-work-screen':
            if (!jobsLoaded) {
                showSkeletonLoaders();
                setTimeout(() => {
                    populateJobsList();
                    jobsLoaded = true;
                }, 800);
            } else {
                populateJobsList();
            }
            break;
        case 'profile-screen':
            populateSkillsGrid();
            break;
        case 'language-screen':
            populateLanguageOptions();
            break;
        case 'my-jobs-screen':
            populateJobHistory();
            break;
    }
}

function updateBottomNavActiveState(screenId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        const itemScreen = item.getAttribute('data-screen');
        if (itemScreen === screenId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function showSkeletonLoaders() {
    const jobsList = document.getElementById('jobs-list');
    if (!jobsList) return;
    
    jobsList.innerHTML = '';
    
    for (let i = 0; i < 3; i++) {
        const skeletonCard = document.createElement('div');
        skeletonCard.className = 'skeleton-job-card';
        skeletonCard.innerHTML = `
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-pay"></div>
            <div class="skeleton skeleton-location"></div>
            <div class="skeleton skeleton-description"></div>
            <div class="skeleton skeleton-description"></div>
        `;
        jobsList.appendChild(skeletonCard);
    }
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

function populateJobHistory() {
    const jobHistory = document.getElementById('job-history');
    if (!jobHistory) return;
    
    const history = [
        { title: "Cleaning Work", date: "2025-01-09", status: "Completed", pay: "₹400" },
        { title: "Loading Assistant", date: "2025-01-08", status: "Completed", pay: "₹500" },
        { title: "Delivery Boy", date: "2025-01-07", status: "Pending", pay: "₹350" }
    ];
    
    jobHistory.innerHTML = '';
    
    history.forEach(job => {
        const historyCard = document.createElement('div');
        historyCard.className = 'glass-card';
        historyCard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <h4 style="color: white; margin: 0;">${job.title}</h4>
                <span style="color: #ffcc00; font-weight: 600;">${job.pay}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: rgba(255,255,255,0.7); font-size: 14px;">${job.date}</span>
                <span style="padding: 4px 8px; border-radius: 12px; font-size: 12px; ${job.status === 'Completed' ? 'color: #4ade80; background: rgba(74, 222, 128, 0.2);' : 'color: #ffd93d; background: rgba(255, 217, 61, 0.2);'}">${job.status}</span>
            </div>
        `;
        jobHistory.appendChild(historyCard);
    });
}

function setupSearchInput() {
    const searchInput = document.getElementById('job-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            filterJobs(e.target.value);
        });
    }
}

function filterJobs(searchTerm) {
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
    const job = appData.dummyJobs.find(j => j.id == jobId);
    if (!job) {
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
    
    showSuccess('Skills Updated', `${skillName} ${isCurrentlySelected ? 'removed from' : 'added to'} your skills.`);
}

function populateLanguageOptions() {
    const languageOptions = document.getElementById('language-options');
    if (!languageOptions) return;
    
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
    currentLanguage = langCode;
    
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
    
    const greetingElement = document.getElementById('greeting-text');
    if (greetingElement) {
        greetingElement.textContent = translations.greeting;
    }
    
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

function setupFormHandlers() {
    const postJobForm = document.getElementById('post-job-form');
    if (postJobForm) {
        postJobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitJobForm();
        });
    }
    
    const availabilityToggle = document.getElementById('availability-toggle');
    if (availabilityToggle) {
        availabilityToggle.addEventListener('change', function(e) {
            appData.userProfile.isAvailable = e.target.checked;
            showSuccess('Availability Updated', `You are now ${e.target.checked ? 'available' : 'unavailable'} for work.`);
        });
    }
    
    const notificationsToggle = document.getElementById('notifications-toggle');
    if (notificationsToggle) {
        notificationsToggle.addEventListener('change', function(e) {
            showSuccess('Settings Updated', `Notifications ${e.target.checked ? 'enabled' : 'disabled'}.`);
        });
    }
    
    const darkmodeToggle = document.getElementById('darkmode-toggle');
    if (darkmodeToggle) {
        darkmodeToggle.addEventListener('change', function(e) {
            showSuccess('Theme Updated', `Dark mode ${e.target.checked ? 'enabled' : 'disabled'}.`);
        });
    }
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
    
    const requiredFields = ['title', 'description', 'pay', 'location', 'date', 'phone'];
    const emptyFields = requiredFields.filter(field => !formData[field].trim());
    
    if (emptyFields.length > 0) {
        showSuccess('Validation Error', 'Please fill in all required fields.');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        const form = document.getElementById('post-job-form');
        if (form) form.reset();
        
        showSuccess('Job Posted!', 'Your job posting has been submitted successfully and will be reviewed shortly.');
        
        setTimeout(() => {
            navigateTo('home-screen');
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
    const successModal = document.getElementById('success-modal');
    const titleEl = document.getElementById('success-title');
    const messageEl = document.getElementById('success-message');
    
    if (titleEl) titleEl.textContent = title;
    if (messageEl) messageEl.textContent = message;
    if (successModal) {
        successModal.classList.remove('hidden');
        
        const closeBtn = document.getElementById('success-close');
        if (closeBtn) {
            setTimeout(() => closeBtn.focus(), 100);
        }
    }
}

function hideSuccessModal() {
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        successModal.classList.add('hidden');
    }
}

// Add required styles for animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

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

body.keyboard-nav *:focus-visible {
    outline: 2px solid #ffcc00 !important;
    outline-offset: 2px !important;
    box-shadow: 0 0 0 4px rgba(255, 204, 0, 0.3) !important;
}
`;
document.head.appendChild(dynamicStyles);

console.log('COOLIE app loaded successfully with enhanced navigation history management, landing shortcuts, and fixed bottom navigation');
