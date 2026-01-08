// DOM Ready
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            if (menuIcon) {
                if (navLinks.classList.contains('active')) {
                    menuIcon.className = 'fas fa-times';
                } else {
                    menuIcon.className = 'fas fa-bars';
                }
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                if (menuIcon) {
                    menuIcon.className = 'fas fa-bars';
                }
            });
        });
    }

    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Get filter value
                const filterValue = this.getAttribute('data-filter');

                // Show/hide portfolio items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    const formSubmitted = document.getElementById('form-submitted');

    if (contactForm) {
        // Add required attribute validation
        const requiredFields = contactForm.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            field.addEventListener('blur', function () {
                validateField(this);
            });

            field.addEventListener('input', function () {
                clearError(this);
            });
        });

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate all required fields
            let isValid = true;
            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                alert('Please fill in all required fields correctly.');
                return;
            }

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                contact: document.getElementById('contact').value,
                projectType: document.getElementById('project-type').value,
                message: document.getElementById('message').value
            };

            // Log form data (in a real app, you would send this to a server)
            console.log('Form submitted:', formData);

            // Show success message
            if (formSubmitted) {
                formSubmitted.style.display = 'block';
                contactForm.style.display = 'none';

                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    formSubmitted.style.display = 'none';
                }, 3000);
            }
        });
    }

    // Form validation functions
    function validateField(field) {
        const errorElement = field.parentElement.querySelector('.error');

        if (!field.value.trim()) {
            if (errorElement) {
                errorElement.textContent = 'This field is required';
                errorElement.style.display = 'block';
            }
            return false;
        }

        // Email validation for contact field
        if (field.id === 'contact' && field.value.includes('@')) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid email address';
                    errorElement.style.display = 'block';
                }
                return false;
            }
        }

        return true;
    }

    function clearError(field) {
        const errorElement = field.parentElement.querySelector('.error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    // Set active nav link based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Initialize
    setActiveNavLink();

    // Add fade-in animations to elements
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.fade-in');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animated');
            }
        });
    };

    // Initial check
    animateOnScroll();

    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
});


// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function () {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            // Toggle the 'active' class on the parent .faq-item
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');

            // Close other open FAQs (optional - for single open at a time)
            // faqQuestions.forEach(otherQuestion => {
            //     const otherItem = otherQuestion.parentElement;
            //     if (otherItem !== faqItem && otherItem.classList.contains('active')) {
            //         otherItem.classList.remove('active');
            //     }
            // });
        });
    });
});