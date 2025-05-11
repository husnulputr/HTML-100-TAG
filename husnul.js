/**
 * Script.js - Kode JavaScript untuk portofolio Husnul Khatimah
 * Dibuat: 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    // === PRELOADER ===
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(preloader);
    
    // Sembunyikan preloader setelah halaman dimuat
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
            // Mulai urutan animasi setelah preloader memudar
            startAnimations();
        }, 800);
    });
    
    // === ANIMASI ===
    function startAnimations() {
        // Menganimasikan elemen fade-in dengan penundaan
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('active');
            }, 300 * index);
        });
        
        // Menganimasikan elemen slide-in
        document.querySelectorAll('.slide-in-left').forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('active');
            }, 200 * index);
        });
        
        document.querySelectorAll('.slide-in-right').forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('active');
            }, 200 * index);
        });
        
        // Menganimasikan elemen scale
        document.querySelectorAll('.scale-in').forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('active');
            }, 300 * index);
        });
        
        // Menganimasikan item portofolio dengan efek bertahap
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, 200 * index);
        });
        
        // Menganimasikan header bagian dengan IntersectionObserver
        const sectionHeaders = document.querySelectorAll('.section-title');
        sectionHeaders.forEach(header => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(header);
        });
    }
    
    // === HEADER SCROLL EFFECT ===
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // === BACK TO TOP BUTTON ===
    const backToTop = document.createElement('a');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Kembali ke atas');
    backToTop.innerHTML = '<span class="arrow-up">↑</span>';
    backToTop.href = '#';
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    document.body.appendChild(backToTop);
    
    // Tampilkan/sembunyikan tombol back-to-top
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // === MOBILE MENU TOGGLE ===
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Tutup menu setelah klik link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenuToggle && mobileMenuToggle.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // === SMOOTH SCROLLING ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip untuk link "#"
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Hitung offset header
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // === AKTIFKAN MENU SAAT SCROLL ===
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveMenu() {
        const scrollY = window.pageYOffset;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveMenu);
    
    // === FILTER PORTFOLIO ===
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hapus active class dari semua tombol
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Tambahkan active class ke tombol yang diklik
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter item dengan animasi
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('show');
                    }, 100);
                } else {
                    item.classList.remove('show');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // === VALIDASI & ANIMASI FORM ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validasi form
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Reset pesan error sebelumnya
            document.querySelectorAll('.error-message').forEach(error => error.remove());
            
            // Validasi nama
            if (!name.value.trim()) {
                addErrorMessage(name, 'Nama harus diisi');
                isValid = false;
            }
            
            // Validasi email
            if (!email.value.trim()) {
                addErrorMessage(email, 'Email harus diisi');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                addErrorMessage(email, 'Format email tidak valid');
                isValid = false;
            }
            
            // Validasi subjek
            if (!subject.value.trim()) {
                addErrorMessage(subject, 'Subjek harus diisi');
                isValid = false;
            }
            
            // Validasi pesan
            if (!message.value.trim()) {
                addErrorMessage(message, 'Pesan harus diisi');
                isValid = false;
            }
            
            if (isValid) {
                // Tambahkan kelas submitting untuk animasi
                this.classList.add('submitting');
                
                // Simulasi pengiriman form
                setTimeout(() => {
                    // Tampilkan pesan sukses
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = '<span class="icon">✓</span> Pesan Anda telah terkirim! Terima kasih.';
                    
                    // Sisipkan pesan setelah form
                    this.insertAdjacentElement('afterend', successMessage);
                    
                    // Hapus kelas submitting
                    this.classList.remove('submitting');
                    
                    // Reset form
                    this.reset();
                    
                    // Hapus pesan sukses setelah 5 detik
                    setTimeout(() => {
                        successMessage.classList.add('fade-out');
                        setTimeout(() => {
                            successMessage.remove();
                        }, 500);
                    }, 5000);
                }, (1000));
            }
        });
    }
    
    // Fungsi untuk menambahkan pesan error
    function addErrorMessage(element, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        element.parentNode.appendChild(errorDiv);
        element.classList.add('error');
        
        // Hapus kelas error saat input diubah
        element.addEventListener('input', function() {
            this.classList.remove('error');
            const errorMessage = this.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    }
    
    // Validasi format email
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // === SCROLL INDICATOR ===
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        
        scrollIndicator.style.width = scrolled + '%';
    });
    
    // === LAZY LOADING GAMBAR ===
    if ('IntersectionObserver' in window) {
        const imgOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px 200px 0px"
        };
        
        const imgObserver = new IntersectionObserver((entries, imgObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImg = entry.target;
                    if (lazyImg.dataset.src) {
                        lazyImg.src = lazyImg.dataset.src;
                        lazyImg.classList.add('loaded');
                        imgObserver.unobserve(lazyImg);
                    }
                }
            });
        }, imgOptions);
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // Fallback untuk browser yang tidak mendukung IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // === ANIMASI PADA SCROLL ===
    function revealOnScroll() {
        const elements = document.querySelectorAll('.reveal-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Jalankan saat halaman dimuat
    revealOnScroll();
    
    // Jalankan saat halaman di-scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // === EFEK TOMBOL ===
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('btn-hover');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('btn-hover');
        });
        
        button.addEventListener('click', function(e) {
            // Tambahkan efek ripple
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Perbarui tahun copyright secara otomatis
    document.getElementById('current-year').textContent = new Date().getFullYear();
});