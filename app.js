<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>COOLIE - Your Job Station</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- Splash Screen -->
    <div id="splash-screen" class="screen active">
        <div class="splash-container">
            <div class="logo-container">
                <div class="coolie-logo">
                    <i class="fas fa-hard-hat"></i>
                </div>
                <h1 class="app-title">COOLIE</h1>
                <p class="app-tagline">Your Job Station</p>
            </div>
        </div>
    </div>

    <!-- Home Screen -->
    <div id="home-screen" class="screen">
        <div class="glass-header">
            <h2 class="greeting" id="greeting-text">Vanakkam, Karthik!</h2>
        </div>
        
        <div class="container">
            <div class="action-grid">
                <button class="glass-card action-button" data-screen="find-work-screen">
                    <i class="fas fa-briefcase"></i>
                    <span id="find-work-text">Find Work</span>
                </button>
                <button class="glass-card action-button" data-screen="post-job-screen">
                    <i class="fas fa-plus-square"></i>
                    <span id="post-job-text">Post a Job</span>
                </button>
                <button class="glass-card action-button" data-screen="my-jobs-screen">
                    <i class="fas fa-clipboard-list"></i>
                    <span id="my-jobs-text">My Jobs</span>
                </button>
                <button class="glass-card action-button" data-screen="profile-screen">
                    <i class="fas fa-user"></i>
                    <span id="profile-text">My Profile</span>
                </button>
                <button class="glass-card action-button" data-screen="wallet-screen">
                    <i class="fas fa-wallet"></i>
                    <span id="wallet-text">Wallet</span>
                </button>
                <button class="glass-card action-button" data-screen="language-screen">
                    <i class="fas fa-globe"></i>
                    <span>Change Language</span>
                </button>
            </div>
        </div>
    </div>

    <!-- Find Work Screen -->
    <div id="find-work-screen" class="screen">
        <div class="glass-header">
            <button class="back-btn" data-screen="home-screen">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h2>Find Work</h2>
        </div>
        
        <div class="container">
            <div class="glass-search">
                <input type="text" id="job-search" placeholder="Search jobs..." class="search-input">
                <i class="fas fa-search search-icon"></i>
            </div>
            
            <div class="jobs-list" id="jobs-list">
                <!-- Jobs will be populated by JavaScript -->
            </div>
        </div>
    </div>

    <!-- Post Job Screen -->
    <div id="post-job-screen" class="screen">
        <div class="glass-header">
            <button class="back-btn" data-screen="home-screen">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h2>Post a Job</h2>
        </div>
        
        <div class="container">
            <form class="glass-form" id="post-job-form">
                <div class="form-group">
                    <label for="job-title">Job Title</label>
                    <input type="text" id="job-title" class="glass-input" required>
                </div>
                
                <div class="form-group">
                    <label for="job-description">Description</label>
                    <textarea id="job-description" class="glass-input" rows="4" required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="job-pay">Pay per Day</label>
                    <input type="number" id="job-pay" class="glass-input" placeholder="₹" required>
                </div>
                
                <div class="form-group">
                    <label for="job-location">Location</label>
                    <input type="text" id="job-location" class="glass-input" required>
                </div>
                
                <div class="form-group">
                    <label for="job-date">Date/Time</label>
                    <input type="datetime-local" id="job-date" class="glass-input" required>
                </div>
                
                <div class="form-group">
                    <label for="job-phone">Phone Number</label>
                    <input type="tel" id="job-phone" class="glass-input" required>
                </div>
                
                <button type="submit" class="glass-button primary">Post Job</button>
            </form>
        </div>
    </div>

    <!-- My Jobs Screen -->
    <div id="my-jobs-screen" class="screen">
        <div class="glass-header">
            <button class="back-btn" data-screen="home-screen">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h2>My Jobs</h2>
        </div>
        
        <div class="container">
            <div class="glass-card">
                <h3>Applied Jobs</h3>
                <p>You have applied to 3 jobs this week</p>
            </div>
            <div class="glass-card">
                <h3>Completed Jobs</h3>
                <p>23 jobs completed successfully</p>
            </div>
        </div>
    </div>

    <!-- Profile Screen -->
    <div id="profile-screen" class="screen">
        <div class="glass-header">
            <button class="back-btn" data-screen="home-screen">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h2>My Profile</h2>
        </div>
        
        <div class="container">
            <div class="glass-form">
                <div class="profile-photo-section">
                    <div class="profile-photo">
                        <i class="fas fa-user"></i>
                    </div>
                    <button class="glass-button">Upload Photo</button>
                </div>
                
                <div class="voice-intro-section">
                    <label>Voice Introduction</label>
                    <button class="glass-button voice-record-btn" id="voice-record">
                        <i class="fas fa-microphone"></i>
                        Record Voice Intro
                    </button>
                </div>
                
                <div class="skills-section">
                    <label>Your Skills</label>
                    <div class="skills-grid" id="skills-grid">
                        <!-- Skills will be populated by JavaScript -->
                    </div>
                </div>
                
                <div class="availability-section">
                    <label class="switch-label">
                        <span>Available Today</span>
                        <label class="switch">
                            <input type="checkbox" id="availability-toggle" checked>
                            <span class="slider"></span>
                        </label>
                    </label>
                </div>
                
                <button class="glass-button primary">Save Changes</button>
            </div>
        </div>
    </div>

    <!-- Wallet Screen -->
    <div id="wallet-screen" class="screen">
        <div class="glass-header">
            <button class="back-btn" data-screen="home-screen">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h2>Wallet</h2>
        </div>
        
        <div class="container">
            <div class="earnings-cards">
                <div class="glass-card earning-card">
                    <h3>Today's Earnings</h3>
                    <div class="amount">₹500</div>
                </div>
                
                <div class="glass-card earning-card">
                    <h3>This Week</h3>
                    <div class="amount">₹2,500</div>
                </div>
                
                <div class="glass-card earning-card">
                    <h3>This Month</h3>
                    <div class="amount">₹12,000</div>
                </div>
            </div>
            
            <div class="glass-form">
                <div class="form-group">
                    <label for="upi-id">UPI ID</label>
                    <input type="text" id="upi-id" class="glass-input" value="coolie@ybl">
                </div>
                
                <button class="glass-button primary">Send Payment Request</button>
            </div>
        </div>
    </div>

    <!-- Language Screen -->
    <div id="language-screen" class="screen">
        <div class="glass-header">
            <button class="back-btn" data-screen="home-screen">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h2>Change Language</h2>
        </div>
        
        <div class="container">
            <div class="language-options" id="language-options">
                <!-- Language options will be populated by JavaScript -->
            </div>
        </div>
    </div>

    <!-- Loading Overlay -->
    <div id="loading-overlay" class="loading-overlay hidden">
        <div class="glass-card loading-card">
            <div class="loading-spinner"></div>
            <p>Loading...</p>
        </div>
    </div>

    <!-- Success Modal -->
    <div id="success-modal" class="modal hidden">
        <div class="modal-content glass-card">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 id="success-title">Success!</h3>
            <p id="success-message">Operation completed successfully</p>
            <button class="glass-button primary" id="success-close">OK</button>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>
