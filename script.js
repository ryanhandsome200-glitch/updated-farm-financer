// Mobile Menu Toggle and Enhanced Scroll Effects
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    // Enhanced sticky header scroll effect with shrink animation
    let lastScroll = 0;
    let ticking = false;
    
    if (navbar) {
        function updateNavbar() {
            const currentScroll = window.pageYOffset;
            
            // Add scrolled class when scrolling down with smooth transition
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Smooth shrink animation - navbar stays visible but shrinks
            // The CSS handles the actual shrinking via .scrolled class
            
            lastScroll = currentScroll;
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }, { passive: true });
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Form handling with EmailJS
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc3545';
                } else {
                    field.style.borderColor = '';
                }
            });

            if (isValid) {
                // Show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalButtonText = submitButton ? submitButton.textContent : '';
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = 'Sending...';
                }

                // Prepare email template parameters
                const emailParams = {
                    to_email: 'skater.ryan11@gmail.com',
                    from_name: data.name || 'Website Visitor',
                    from_email: data.email || data['contact-email'] || 'no-reply@farmfinancer.com',
                    phone: data.phone || data['contact-phone'] || 'Not provided',
                    subject: data.subject || data['contact-subject'] || 'Contact Form Submission',
                    message: data.message || data['contact-message'] || JSON.stringify(data, null, 2),
                    form_type: this.id || 'General Contact',
                    loan_type: data['loan-type'] || 'N/A',
                    property_location: data['property-location'] || 'N/A',
                    loan_amount: data['loan-amount'] || 'N/A'
                };

                // Send email using EmailJS
                if (typeof emailjs !== 'undefined') {
                    emailjs.send('service_farmfinancer', 'template_farmfinancer', emailParams)
                        .then(function(response) {
                            console.log('Email sent successfully!', response.status, response.text);
                            
                            // Show success message
                            const successMessage = document.createElement('div');
                            successMessage.className = 'success-message';
                            successMessage.style.cssText = 'background: #28a745; color: white; padding: 1.5rem; border-radius: 8px; margin-top: 1.5rem; text-align: center; font-weight: 600; box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);';
                            successMessage.innerHTML = '<p style="margin: 0; font-size: 1.125rem;">✓ Thank you! Your form has been submitted.</p><p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; opacity: 0.9;">We will contact you within 24-48 hours.</p>';
                            form.appendChild(successMessage);
                            
                            // Scroll to success message
                            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            
                            // Reset form after a delay
                            setTimeout(() => {
                                form.reset();
                                // Remove success message after 8 seconds
                                setTimeout(() => {
                                    successMessage.remove();
                                }, 8000);
                            }, 2000);
                        }, function(error) {
                            console.error('Email sending failed:', error);
                            
                            // Fallback: Use mailto link
                            const mailtoSubject = encodeURIComponent(emailParams.subject);
                            const mailtoBody = encodeURIComponent(
                                `Name: ${emailParams.from_name}\n` +
                                `Email: ${emailParams.from_email}\n` +
                                `Phone: ${emailParams.phone}\n` +
                                `Message:\n${emailParams.message}`
                            );
                            window.location.href = `mailto:skater.ryan11@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
                            
                            // Show success message (even though we're using mailto fallback)
                            const successMessage = document.createElement('div');
                            successMessage.className = 'success-message';
                            successMessage.style.cssText = 'background: #28a745; color: white; padding: 1.5rem; border-radius: 8px; margin-top: 1.5rem; text-align: center; font-weight: 600; box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);';
                            successMessage.innerHTML = '<p style="margin: 0; font-size: 1.125rem;">✓ Thank you! Your email client should open.</p><p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; opacity: 0.9;">If it doesn\'t, please email us at skater.ryan11@gmail.com</p>';
                            form.appendChild(successMessage);
                            
                            setTimeout(() => {
                                form.reset();
                                setTimeout(() => {
                                    successMessage.remove();
                                }, 8000);
                            }, 2000);
                        })
                        .finally(function() {
                            // Restore button
                            if (submitButton) {
                                submitButton.disabled = false;
                                submitButton.textContent = originalButtonText;
                            }
                        });
                } else {
                    // EmailJS not loaded, use mailto fallback
                    const mailtoSubject = encodeURIComponent(emailParams.subject);
                    const mailtoBody = encodeURIComponent(
                        `Name: ${emailParams.from_name}\n` +
                        `Email: ${emailParams.from_email}\n` +
                        `Phone: ${emailParams.phone}\n` +
                        `Message:\n${emailParams.message}`
                    );
                    window.location.href = `mailto:skater.ryan11@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.style.cssText = 'background: #28a745; color: white; padding: 1.5rem; border-radius: 8px; margin-top: 1.5rem; text-align: center; font-weight: 600; box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);';
                    successMessage.innerHTML = '<p style="margin: 0; font-size: 1.125rem;">✓ Your email client should open.</p><p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; opacity: 0.9;">If it doesn\'t, please email us at skater.ryan11@gmail.com</p>';
                    form.appendChild(successMessage);
                    
                    setTimeout(() => {
                        form.reset();
                        setTimeout(() => {
                            successMessage.remove();
                        }, 8000);
                    }, 2000);
                }
            } else {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.style.cssText = 'background: #dc3545; color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center; font-weight: 600;';
                errorMessage.textContent = 'Please fill in all required fields marked with *.';
                
                // Remove existing error messages
                const existingError = this.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                this.appendChild(errorMessage);
                
                // Remove error message after 5 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            }
        });
    });

    // Enhanced animate on scroll with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for animation with staggered delays
    document.querySelectorAll('.loan-card, .blog-card, .state-card, .content-section').forEach((el, index) => {
        // Only set initial state if not already animated
        if (!el.classList.contains('animated')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.transitionDelay = `${Math.min(index * 0.1, 0.5)}s`;
            observer.observe(el);
        }
    });

    // Enhanced Back to Top Button with smooth animation
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        let ticking = false;
        
        // Show/hide button based on scroll position with throttling
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    if (window.pageYOffset > 300) {
                        backToTopButton.classList.add('visible');
                    } else {
                        backToTopButton.classList.remove('visible');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Smooth scroll to top when clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Improved Keyboard Navigation for Dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            // Toggle dropdown on Enter/Space
            toggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dropdown.classList.toggle('open');
                    if (dropdown.classList.contains('open')) {
                        const firstLink = menu.querySelector('a');
                        if (firstLink) firstLink.focus();
                    }
                }
                // Close on Escape
                if (e.key === 'Escape') {
                    dropdown.classList.remove('open');
                    toggle.focus();
                }
            });

            // Close dropdown when focus leaves
            const lastLink = menu.querySelector('a:last-child');
            if (lastLink) {
                lastLink.addEventListener('keydown', function(e) {
                    if (e.key === 'Tab' && !e.shiftKey) {
                        dropdown.classList.remove('open');
                    }
                });
            }
        }
    });

    // Close mobile menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.focus();
            }
        }
    });

    // Improved mobile menu keyboard navigation
    if (navMenu) {
        const menuLinks = navMenu.querySelectorAll('a');
        const firstLink = menuLinks[0];
        const lastLink = menuLinks[menuLinks.length - 1];

        navMenu.addEventListener('keydown', function(e) {
            // Trap focus within mobile menu when open
            if (navMenu.classList.contains('active')) {
                if (e.key === 'Tab') {
                    if (e.shiftKey && document.activeElement === firstLink) {
                        e.preventDefault();
                        lastLink.focus();
                    } else if (!e.shiftKey && document.activeElement === lastLink) {
                        e.preventDefault();
                        firstLink.focus();
                    }
                }
            }
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        }
    });
});

