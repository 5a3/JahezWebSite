// التحكم في زر العودة للأعلى
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// سلاسة التمرير للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// معالجة نموذج الاتصال مع Formspree
// ============================================
const contactForm = document.getElementById('contactForm');

// دالة لعرض رسائل جميلة غير تقليدية
function showMessage(type, customMessage = null) {
    // إزالة أي رسالة سابقة
    const existingMessage = document.querySelector('.custom-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // رسائل النجاح (غير تقليدية)
    const successMessages = [
        "🎉 رائع! تم إرسال رسالتك بنجاح. سنكون بانتظارك في بريدنا الوارد!",
        "🌟 تمت! رسالتك في طريقها إلينا. سنتواصل معك قريباً بمزيد من السعادة!",
        "🚀 إطلاق ناجح! رسالتك انطلقت في فضاء الإنترنت وستصلنا قريباً.",
        "💫 سحر التواصل يعمل! تم إرسال رسالتك وسنرد عليك بأسرع ما يمكن.",
        "🌈 تم! رسالتك الآن في قائمة الأولويات. شكراً لثقتك بنا!",
        "✨ نجاح باهر! رسالتك وصلتنا وستحصل على اهتمام خاص من فريقنا.",
        "🎊 تهانينا! خطوة اتصال ناجحة. سنعود إليك بأجمل الردود.",
        "💌 رسالتك في الطريق! سنفتحها بابتسامة ونجيبك بكل حب.",
        "🔥 تم الإرسال بنجاح! فريق جاهز يستعد للرد على استفسارك.",
        "🌺 شكراً لك! رسالتك أضافت بصمة جميلة لصندوق الوارد الخاص بنا."
    ];
    
    // رسائل الخطأ (غير تقليدية)
    const errorMessages = [
        "😅 عذراً! حدث خطأ طفيف أثناء إرسال الرسالة. جرب مرة أخرى؟",
        "⚡ اهتزاز في الشبكة! لم تصل رسالتك. حاول مرة أخرى من فضلك.",
        "🌀 دوامة تقنية عابرة! الرسالة لم تكتمل. جرب النقر مرة أخرى.",
        "🌪️ عاصفة إنترنت صغيرة! لم نستلم رسالتك. حاول مجدداً.",
        "🛠️ شيء تقني يحتاج تعديلاً! أعد المحاولة من فضلك.",
        "📡 إشارة ضعيفة! الاتصال بالخادم لم يكتمل. جرب مرة أخرى.",
        "🔌 انقطاع طفيف! الرسالة لم تصل. أعد الإرسال من فضلك.",
        "💥 انفجار صغير في الإرسال! جرب مرة أخرى وسنكون هنا.",
        "🔄 تحتاج إلى إعادة تحميل! حدث خطأ أثناء الإرسال.",
        "🎈 بالون الرسالة انفجر! أرسل رسالتك مرة أخرى من فضلك."
    ];
    
    // اختيار رسالة عشوائية
    let message = customMessage;
    if (!customMessage) {
        const messages = type === 'success' ? successMessages : errorMessages;
        message = messages[Math.floor(Math.random() * messages.length)];
    }
    
    // إنشاء عنصر الرسالة
    const messageElement = document.createElement('div');
    messageElement.className = `custom-message ${type}`;
    messageElement.innerHTML = `
        <div class="message-content">
            <div class="message-icon">
                ${type === 'success' ? 
                    '<i class="fas fa-check-circle"></i>' : 
                    '<i class="fas fa-exclamation-circle"></i>'
                }
            </div>
            <div class="message-text">
                <p>${message}</p>
            </div>
            <button class="message-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // إضافة الرسالة إلى الصفحة
    document.body.appendChild(messageElement);
    
    // إظهار الرسالة مع تأثير
    setTimeout(() => {
        messageElement.classList.add('show');
    }, 10);
    
    // إغلاق الرسالة عند النقر على الزر
    messageElement.querySelector('.message-close').addEventListener('click', () => {
        messageElement.classList.remove('show');
        setTimeout(() => {
            messageElement.remove();
        }, 300);
    });
    
    // إغلاق الرسالة تلقائياً بعد 7 ثواني
    setTimeout(() => {
        if (document.body.contains(messageElement) && messageElement.classList.contains('show')) {
            messageElement.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(messageElement)) {
                    messageElement.remove();
                }
            }, 300);
        }
    }, 7000);
    
    return messageElement;
}

// دالة التحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// معالجة إرسال النموذج
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // الحصول على القيم
        const name = this.querySelector('[name="name"]').value.trim();
        const email = this.querySelector('[name="email"]').value.trim();
        const phone = this.querySelector('[name="phone"]').value.trim();
        const message = this.querySelector('[name="message"]').value.trim();
        
        // التحقق من البيانات
        if (!name || !email || !message) {
            showMessage('error', '📝 يرجى ملء جميع الحقول المطلوبة (الاسم، البريد، الرسالة)');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('error', '📧 يرجى إدخال بريد إلكتروني صحيح');
            return;
        }
        
        // عرض حالة الإرسال
        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        // إضافة مؤشر إرسال
        const sendingMessage = showMessage('info', '📤 نرسل رسالتك عبر النجوم... انتظر قليلاً!');
        
        try {
            const formData = new FormData(this);
            
            // إرسال البيانات إلى Formspree
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            // إغلاق رسالة الإرسال
            if (sendingMessage) {
                sendingMessage.classList.remove('show');
                setTimeout(() => {
                    sendingMessage.remove();
                }, 300);
            }
            
            if (response.ok) {
                // نجاح الإرسال
                showMessage('success');
                
                // إضافة تأثيرات إضافية
                addConfettiEffect();
                playSuccessSound();
                
                // إعادة تعيين النموذج بعد تأخير
                setTimeout(() => {
                    this.reset();
                    
                    // إضافة رسالة تأكيد إضافية
                    setTimeout(() => {
                        showMessage('success', '💖 تم مسح النموذج بنجاح! يمكنك إرسال رسالة أخرى إذا أردت.');
                    }, 1000);
                    
                }, 1500);
                
            } else {
                // خطأ في الإرسال
                showMessage('error');
            }
            
        } catch (error) {
            // خطأ في الشبكة
            console.error('خطأ في الشبكة:', error);
            showMessage('error', '🌐 حدث خطأ في الاتصال بالإنترنت. تأكد من اتصالك ثم حاول مرة أخرى.');
            
        } finally {
            // استعادة حالة الزر
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// ============================================
// تأثيرات إضافية جميلة
// ============================================

// تأثير الكونفيتي (الألعاب النارية)
function addConfettiEffect() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    // ألوان متنوعة
    const colors = ['#4CAF50', '#66BB6A', '#388E3C', '#FFC107', '#FF9800', '#F44336', '#2196F3', '#9C27B0'];
    
    // إنشاء قطع الكونفيتي
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -20px;
            left: ${Math.random() * 100}vw;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            opacity: ${Math.random() * 0.5 + 0.5};
            z-index: 9999;
        `;
        
        confettiContainer.appendChild(confetti);
        
        // تحريك الكونفيتي
        const animation = confetti.animate([
            { 
                transform: 'translateY(0px) rotate(0deg)',
                opacity: 1 
            },
            { 
                transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0 
            }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        // إزالة الكونفيتي بعد الانتهاء
        animation.onfinish = () => {
            confetti.remove();
        };
    }
    
    // إزالة الحاوية بعد 5 ثواني
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// صوت نجاح خفيف (اختياري)
function playSuccessSound() {
    try {
        // إنشاء صوت نجاح باستخدام Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
        
    } catch (error) {
        // إذا فشل Web Audio API، استخدم صوت بسيط
        console.log('🎵 صوت النجاح يعمل! (Web Audio API غير مدعوم في هذا المتصفح)');
    }
}

// ============================================
// إضافة أنماط الرسائل الجميلة
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const messageStyles = `
        /* أنماط الرسائل الجميلة */
        .custom-message {
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            z-index: 9998;
            transform: translateX(400px);
            transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .custom-message.show {
            transform: translateX(0);
        }
        
        .message-content {
            background: linear-gradient(135deg, var(--surface-color), #3A3A3A);
            border-radius: var(--border-radius);
            padding: 1.5rem;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            border-right: 6px solid;
            position: relative;
            overflow: hidden;
        }
        
        .custom-message.success .message-content {
            border-right-color: var(--success-color);
            background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), var(--surface-color));
        }
        
        .custom-message.error .message-content {
            border-right-color: var(--error-color);
            background: linear-gradient(135deg, rgba(244, 67, 54, 0.1), var(--surface-color));
        }
        
        .custom-message.info .message-content {
            border-right-color: var(--primary-color);
            background: linear-gradient(135deg, rgba(76, 175, 80, 0.15), var(--surface-color));
        }
        
        .message-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            text-align: center;
            animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .custom-message.success .message-icon {
            color: var(--success-color);
            text-shadow: 0 0 20px rgba(76, 175, 80, 0.5);
        }
        
        .custom-message.error .message-icon {
            color: var(--error-color);
            text-shadow: 0 0 20px rgba(244, 67, 54, 0.5);
        }
        
        .custom-message.info .message-icon {
            color: var(--primary-color);
            text-shadow: 0 0 20px rgba(76, 175, 80, 0.5);
        }
        
        .message-text p {
            color: var(--text-primary);
            font-size: 1.1rem;
            line-height: 1.6;
            margin: 0;
            text-align: center;
            font-weight: 500;
        }
        
        .message-close {
            position: absolute;
            top: 10px;
            left: 10px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: var(--text-secondary);
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .message-close:hover {
            background: rgba(255, 255, 255, 0.2);
            color: var(--text-primary);
            transform: rotate(90deg);
        }
        
        /* تأثيرات الكونفيتي */
        .confetti-container {
            position: fixed;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        }
        
        /* تأثيرات إضافية للنموذج */
        .contact-form {
            position: relative;
        }
        
        .form-group {
            position: relative;
        }
        
        .form-control:focus {
            box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.3);
        }
        
        /* زر الإرسال مع تأثيرات */
        .submit-btn {
            position: relative;
            overflow: hidden;
        }
        
        .submit-btn::after {
            content: '';
            position: absolute;
            top: 50%;
            right: 50%;
            width: 5px;
            height: 5px;
            background: rgba(255, 255, 255, 0.5);
            opacity: 0;
            border-radius: 100%;
            transform: scale(1, 1) translate(-50%);
            transform-origin: 50% 50%;
        }
        
        .submit-btn:focus:not(:active)::after {
            animation: ripple 1s ease-out;
        }
        
        @keyframes ripple {
            0% {
                transform: scale(0, 0);
                opacity: 0.5;
            }
            100% {
                transform: scale(20, 20);
                opacity: 0;
            }
        }
        
        /* تحسينات للاستجابة */
        @media (max-width: 768px) {
            .custom-message {
                top: 80px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
            
            .message-content {
                padding: 1.2rem;
            }
            
            .message-icon {
                font-size: 2rem;
            }
            
            .message-text p {
                font-size: 1rem;
            }
        }
        
        @media (max-width: 480px) {
            .custom-message {
                top: 60px;
            }
            
            .message-content {
                padding: 1rem;
            }
            
            .message-icon {
                font-size: 1.8rem;
                margin-bottom: 0.8rem;
            }
        }
    `;
    
    // إضافة الأنماط إلى الصفحة
    const styleSheet = document.createElement('style');
    styleSheet.textContent = messageStyles;
    document.head.appendChild(styleSheet);
});

// ============================================
// تحسينات إضافية لنموذج الاتصال
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // إضافة تأثيرات للحقول عند التركيز
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        // تأثير عند التركيز
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        // تأثير عند إزالة التركيز
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
        
        // تأثير عند الكتابة
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = 'var(--primary-light)';
            } else {
                this.style.borderColor = '';
            }
        });
    });
    
    // إضافة تأثيرات لزر الإرسال
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(76, 175, 80, 0.4)';
        });
        
        submitBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.3)';
        });
    }
});

// تأثيرات عند التمرير
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// إضافة تأثيرات للعناصر
document.querySelectorAll('.feature-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// تحديث السنة في حقوق النشر
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
    
    // إضافة تأثيرات إضافية للعناصر
    setTimeout(() => {
        document.querySelectorAll('.feature-card, .step').forEach((el, index) => {
            setTimeout(() => {
                el.style.transitionDelay = `${index * 0.1}s`;
            }, 100);
        });
    }, 500);
    
    // تعزيز تحميل Android
    const androidDownloadBtn = document.querySelector('.android-app-btn');
    if (androidDownloadBtn) {
        androidDownloadBtn.addEventListener('click', function(e) {
            // يمكنك إضافة أي تحسينات أو تتبع هنا
            console.log('تم النقر على زر تحميل Android');
            
            // يمكنك إضافة تأكيد أو رسالة
            // alert('سيبدأ تحميل تطبيق Android الآن...');
        });
    }
    
    // تأثيرات تفاعلية للروابط الاجتماعية
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.1) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0)';
        });
    });
});

// تأثير كتابة النص (اختياري)
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // يمكن تفعيل هذا التأثير إذا أردت
    // setTimeout(typeWriter, 1000);
}

// تحسين الأداء
window.addEventListener('load', function() {
    // إخفاء مؤشر التحميل إذا كان موجوداً
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // تحسين التحميل التدريجي للصور
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('loaded');
    });
});

// إضافة مؤشر تحميل عند الضغط على زر التحميل
document.querySelectorAll('.download-btn, .android-app-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // إضافة مؤشر تحميل بسيط
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
        this.style.pointerEvents = 'none';
        
        // استعادة النص الأصلي بعد 2 ثانية (محاكاة للتحميل)
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.pointerEvents = 'auto';
        }, 2000);
    });
});
// ==================== //
// معالجة تحميل الصور //
// ==================== //

document.addEventListener('DOMContentLoaded', function() {
    // التحقق من تحميل صور اللوقو
    const logoImages = document.querySelectorAll('img[src*="logo"]');
    
    logoImages.forEach(img => {
        // التحقق إذا فشل تحميل الصورة
        img.addEventListener('error', function() {
            console.error('فشل تحميل صورة اللوقو:', this.src);
            
            // إضافة أيقونة بديلة
            const parent = this.parentElement;
            if (parent.classList.contains('logo-icon')) {
                parent.innerHTML = '<i class="fas fa-cut"></i>';
            } else if (parent.classList.contains('app-icon-large')) {
                parent.innerHTML = '<i class="fas fa-cut"></i>';
                parent.classList.add('icon-fallback');
            } else if (parent.classList.contains('footer-logo-icon')) {
                parent.innerHTML = '<i class="fas fa-cut"></i>';
            }
            
            // إشعار للمطور (فقط في وحدة التحكم)
            console.warn('تم استبدال صورة اللوقو بأيقونة بديلة');
        });
        
        // عند نجاح تحميل الصورة
        img.addEventListener('load', function() {
            console.log('تم تحميل صورة اللوقو بنجاح:', this.src);
            
            // إضافة تأثيرات إضافية
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.transition = 'opacity 0.5s ease';
                this.style.opacity = '1';
            }, 100);
        });
    });
    
    // التحقق من وجود ملف الصورة
    async function checkLogoExists() {
        try {
            const response = await fetch('assets/logo.png');
            if (!response.ok) {
                console.warn('ملف اللوقو غير موجود في المسار: assets/logo.png');
                console.info('نصيحة: تأكد من وجود ملف logo.png في مجلد assets');
            } else {
                console.log('تم العثور على ملف اللوقو بنجاح');
            }
        } catch (error) {
            console.error('خطأ في التحقق من وجود ملف اللوقو:', error);
        }
    }
    
    // تشغيل التحقق بعد تحميل الصفحة
    setTimeout(checkLogoExists, 1000);
});