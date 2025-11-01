// ===== PAGE NAVIGATION =====
function showPage(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    if (pageName === 'home') {
        document.getElementById('homePage').classList.add('active');
    } else if (pageName === 'signup') {
        document.getElementById('signupPage').classList.add('active');
    } else if (pageName === 'login') {
        document.getElementById('loginPage').classList.add('active');
    } else if (pageName === 'dashboard') {
        document.getElementById('dashboardPage').classList.add('active');
        setGreeting();
    }
}

// ===== SIGNUP HANDLER =====
function handleSignup(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const userId = document.getElementById('userId').value.trim();
    const password = document.getElementById('password').value;
    const level = document.getElementById('level').value;

    if (!fullName || !email || !userId || !password || !level) {
        showMessage('❌ Please fill all fields');
        return;
    }

    const student = {
        fullName: fullName,
        email: email,
        userId: userId,
        password: password,
        level: level,
        joinDate: new Date().toLocaleDateString(),
        trialEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };

    localStorage.setItem('currentStudent', JSON.stringify(student));
    
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    showMessage('✅ Account created! Logging in...');
    
    setTimeout(() => {
        document.getElementById('loginUserId').value = userId;
        document.getElementById('loginPassword').value = password;
        document.getElementById('loginLevel').value = level;
        handleLogin(new Event('submit'));
    }, 1500);
}

// ===== LOGIN HANDLER =====
function handleLogin(event) {
    event.preventDefault();
    
    const userId = document.getElementById('loginUserId').value.trim();
    const password = document.getElementById('loginPassword').value;
    const level = document.getElementById('loginLevel').value;

    if (!userId || !password || !level) {
        showMessage('❌ Please fill all fields');
        return;
    }

    const student = {
        fullName: userId.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim(),
        email: 'student@email.com',
        userId: userId,
        password: password,
        level: level,
        joinDate: new Date().toLocaleDateString()
    };

    localStorage.setItem('currentStudent', JSON.stringify(student));
    showMessage('✅ Login successful!');
    
    setTimeout(() => {
        showPage('dashboard');
    }, 800);
}

// ===== LOGOUT HANDLER =====
function handleLogout() {
    localStorage.removeItem('currentStudent');
    showMessage('👋 Logged out successfully');
    
    document.getElementById('fullName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('userId').value = '';
    document.getElementById('password').value = '';
    document.getElementById('level').value = '';
    document.getElementById('loginUserId').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('loginLevel').value = '';
    
    setTimeout(() => {
        showPage('home');
    }, 800);
}

// ===== GREETING MESSAGE =====
function setGreeting() {
    const student = JSON.parse(localStorage.getItem('currentStudent'));
    if (student) {
        document.getElementById('studentName').textContent = student.fullName;
        
        const hour = new Date().getHours();
        let greeting = '';
        
        if (hour < 12) {
            greeting = '🌅 Good Morning!';
        } else if (hour < 17) {
            greeting = '🌤️ Good Afternoon!';
        } else if (hour < 21) {
            greeting = '🌆 Good Evening!';
        } else {
            greeting = '🌙 Good Night!';
        }
        
        document.getElementById('greetingMessage').textContent = greeting + ' Ready to master CA?';
    }
}

// ===== FEATURE MESSAGES =====
function showFeature(feature) {
    const messages = {
        topics: '📚 Topic Tracker\n\nTrack all topics & questions from your CA books.\n30-day free trial includes full access!\n\nFeatures:\n• Chapter-wise tracking\n• Question numbering\n• Classification system\n• Revision tracking',
        
        timer: '⏱️ Focus Timer\n\nStart a 25-minute Pomodoro session.\nBoost your productivity!\n\nFeatures:\n• Customizable time\n• Auto-notifications\n• Session tracking\n• Statistics',
        
        groups: '👥 Study Groups\n\nJoin or create study groups.\nCollaborate with fellow CA students!\n\nFeatures:\n• Chapter-based groups\n• Discussion threads\n• Resource sharing\n• Member stats',
        
        chatbot: '🤖 Sanjeevni Chatbot\n\nHello! I\'m your AI tutor.\nAsk me anything about CA concepts!\n\nFeatures:\n• Real-time answers\n• Example problems\n• Concept clarification\n• Study tips',
        
        badges: '🏅 Badges & Achievements\n\nYou have earned 5 badges!\nKeep learning to unlock more!\n\nBadges:\n• Hot Streak 🔥\n• Chapter Master ✅\n• Focus Master ⏱️\n• Community Helper 💬\n• And 46+ more!',
        
        payment: '💳 Subscription Plans\n\n30-Day Free Trial\n\nThen choose:\n• ₹50/month\n• ₹149/3 months\n• ₹299/6 months\n• ₹550/12 months\n\nUPI: 9044621001@ibl'
    };
    
    const message = messages[feature] || 'Feature loading...';
    alert(message);
}

// ===== SHOW MESSAGE NOTIFICATION =====
function showMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.textContent = text;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 3000);
}

// ===== INITIALIZE ON PAGE LOAD =====
window.addEventListener('load', function() {
    const student = localStorage.getItem('currentStudent');
    if (student) {
        showPage('dashboard');
    } else {
        showPage('home');
    }
});

// ===== HANDLE ERRORS =====
window.addEventListener('error', function(event) {
    console.error('Error:', event.error);
});

// ===== SMOOTH SCROLLING =====
document.addEventListener('click', function(e) {
    if (e.target.matches('[onclick*="showPage"]')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});