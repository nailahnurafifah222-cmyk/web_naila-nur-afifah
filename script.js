document.addEventListener("DOMContentLoaded", function() {
    let cart = [];

    // SMOOTH SCROLL
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // NAVBAR SCROLL
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        navbar.style.background = window.scrollY > 50 ? '#E65100' : '#FF6F00';
    });

    // ANIMASI SCROLL
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.card').forEach(el => { el.classList.add('hidden'); observer.observe(el); });

    // SLIDER
    let slideIndex = 0;
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slides img').length;
    document.querySelector('.next').onclick = () => { slideIndex = (slideIndex + 1) % totalSlides; updateSlider(); }
    document.querySelector('.prev').onclick = () => { slideIndex = (slideIndex - 1 + totalSlides) % totalSlides; updateSlider(); }
    function updateSlider(){ slides.style.transform = `translateX(-${slideIndex * 100}%)`; }

    // KERANJANG
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    cartIcon.onclick = () => cartSidebar.classList.add('active');
    document.getElementById('close-cart').onclick = () => cartSidebar.classList.remove('active');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.onclick = () => {
            const nama = button.dataset.nama;
            const harga = parseInt(button.dataset.harga);
            const item = cart.find(i => i.nama === nama);
            if(item){ item.jumlah++; } else{ cart.push({ nama, harga, jumlah: 1 }); }
            updateCart();
            showToast(`${nama} ditambahkan!`);
        }
    });

    function updateCart(){
        const cartItems = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.harga * item.jumlah;
            cartItems.innerHTML += `<div class="cart-item"><span>${item.nama} x${item.jumlah}</span><span>Rp${(item.harga * item.jumlah).toLocaleString()}</span></div>`;
        });
        cartCount.innerText = cart.reduce((sum, item) => sum + item.jumlah, 0);
        cartTotal.innerText = total.toLocaleString();
    }

    // CHECKOUT WA
    document.getElementById('checkout-wa').onclick = () => {
        if(cart.length === 0) return alert("Keranjang masih kosong!");
        let pesan = "Halo Pangsit Kriuk, saya mau pesan:%0A";
        cart.forEach(item => { pesan += `- ${item.nama} x${item.jumlah}%0A`; });
        pesan += `Total: Rp${document.getElementById('cart-total').innerText}`;
        window.open(`https://wa.me/62895603004001?text=${pesan}`);
    }

    // TOAST + YEAR
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast show';
        toast.innerText = message;
        document.body.appendChild(toast);
        setTimeout(() => { document.body.removeChild(toast); }, 2000);
    }
    document.getElementById('year').innerText = new Date().getFullYear();
});