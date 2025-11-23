// Configuration from environment variables or defaults
const config = {
    orchestrationID: import.meta.env?.VITE_ORCHESTRATION_ID || "d2d2f09f524a41859fd911d3b92de4b3_aee640d0-49e2-43d8-84fb-19f43a8a2e6a",
    hostURL: import.meta.env?.VITE_HOST_URL || "https://jp-tok.watson-orchestrate.cloud.ibm.com",
    agentId: import.meta.env?.VITE_AGENT_ID || "ab8c2087-b557-4fe5-af28-6eb64747729b",
    agentEnvironmentId: import.meta.env?.VITE_AGENT_ENVIRONMENT_ID || "91d3aeb7-6530-429e-896f-783d6492fbe9"
};

// Initialize IBM Watsonx Chatbot
function initializeChatbot() {
    window.wxOConfiguration = {
        orchestrationID: config.orchestrationID,
        hostURL: config.hostURL,
        rootElementID: "chat-root",
        deploymentPlatform: "ibmcloud",
        crn: "crn:v1:bluemix:public:watsonx-orchestrate:jp-tok:a/d2d2f09f524a41859fd911d3b92de4b3:aee640d0-49e2-43d8-84fb-19f43a8a2e6a::",
        chatOptions: {
            agentId: config.agentId,
            agentEnvironmentId: config.agentEnvironmentId
        }
    };

    // Load chatbot script
    setTimeout(() => {
        const script = document.createElement('script');
        script.src = `${window.wxOConfiguration.hostURL}/wxochat/wxoLoader.js?embed=true`;
        script.onload = () => {
            if (typeof wxoLoader !== 'undefined') {
                wxoLoader.init();
                console.log('Career Pathfinder AI initialized successfully');
            }
        };
        script.onerror = (error) => {
            console.error('Failed to load chatbot:', error);
            showChatbotError();
        };
        document.head.appendChild(script);
    }, 1000);
}

// Show error state if chatbot fails to load
function showChatbotError() {
    const chatRoot = document.getElementById('chat-root');
    if (chatRoot) {
        chatRoot.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #fef2f2; color: #dc2626; padding: 2rem; text-align: center;">
                <div>
                    <div style="font-size: 3rem; margin-bottom: 1rem;">❌</div>
                    <h3>Chatbot Loading Failed</h3>
                    <p>Please check your configuration and try refreshing the page.</p>
                    <button onclick="location.reload()" style="background: #dc2626; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 1rem;">
                        Retry
                    </button>
                </div>
            </div>
        `;
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chatbot
    initializeChatbot();
    
    // Smooth scrolling
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading state
    const chatRoot = document.getElementById('chat-root');
    if (chatRoot) {
        chatRoot.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f8fafc; color: #64748b;">
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🤖</div>
                    <h3>Loading Career Pathfinder AI...</h3>
                    <p>Your career development assistant is starting up</p>
                    <div style="margin-top: 1rem; width: 40px; height: 4px; background: #e2e8f0; border-radius: 2px; overflow: hidden; margin: 1rem auto;">
                        <div style="height: 100%; background: #3b82f6; border-radius: 2px; animation: loading 1.5s infinite;"></div>
                    </div>
                </div>
            </div>
            
            <style>
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(400%); }
                }
            </style>
        `;
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.tool-card, .feature-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers for tool cards to suggest questions
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('click', function() {
            const tool = this.getAttribute('data-tool');
            let suggestion = '';
            
            if (tool === 'career') {
                suggestion = '💡 Try asking: "Create a career path from my current role to senior positions"';
            } else if (tool === 'resume') {
                suggestion = '💡 Try asking: "Analyze how my skills match a job description"';
            }
            
            if (suggestion) {
                // You could show a toast notification or update UI
                console.log(suggestion);
            }
        });
    });
});