document.addEventListener('mousemove', (e) => {
    const background = document.querySelector('.background');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    background.style.transform = `translate(${mouseX * 50 - 25}px, ${mouseY * 50 - 25}px)`;
});
window.onload = function() {
    // Kodlar burada çalışacak
};

var buttonClickSound = new Audio('click-sound.mp3');

document.querySelector('button').addEventListener('click', function() {
    buttonClickSound.play();
});

const toggleButton = document.querySelector('.night-mode-toggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('night-mode');
});


<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>

function openGameWindow(url) {
    window.open(
        url,
        '_blank',
        'width=800,height=600,resizable=yes,scrollbars=no'
    );
}

document.querySelector('.game-title').textContent = 'Oyun İsmi';

document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Formun sayfayı yenilemesini engelle

    const commentText = document.getElementById('comment-text').value;
    const rating = document.getElementById('rating').value;

    // Yorum ve yıldızları eklemek
    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment');
    commentContainer.innerHTML = `<strong>Yıldızlar: ${rating}</strong><p>${commentText}</p>`;
    
    // Yeni yorumu sayfaya ekle
    document.getElementById('comments-container').appendChild(commentContainer);

    // Formu sıfırla
    document.getElementById('comment-form').reset();
});



function yorumEkle() {
    const yorumInput = document.getElementById('comment-text');
    const yildizInput = document.getElementById('rating');
    const yorum = yorumInput.value.trim();
    const yildiz = parseInt(yildizInput.value);

    if (!yorum) {
        alert('Lütfen bir yorum girin!');
        return;
    }

    function yorumEkle() {
        const yorumInput = document.getElementById('comment-text');
        const yildizInput = document.getElementById('rating');
        const yorum = yorumInput.value.trim();
        const yildiz = parseInt(yildizInput.value);
    
        if (!yorum) {
            alert('Lütfen bir yorum girin!');
            return;
        }
    
        // Engellenen kelimeler listesi
        const engellenenKelimeler = ['s!ktir', 'aptal', 'salak', 'kötü']; // İstediğin kelimeleri buraya ekle
        let sansurluYorum = yorum;
    
        // Engellenen kelimeleri yıldızlarla değiştir
        engellenenKelimeler.forEach((kelime) => {
            const regex = new RegExp(kelime.replace(/[!]/g, '\\$&'), 'gi'); // Özel karakterleri kaçar
            sansurluYorum = sansurluYorum.replace(regex, '*****');
        });
    
        // Yorum objesini oluştur
        const yorumObjesi = {
            text: sansurluYorum,
            rating: yildiz,
        };
    
        // Yorumları al ve yeni yorumu ekle
        const yorumlar = JSON.parse(localStorage.getItem('comments')) || [];
        yorumlar.push(yorumObjesi);
        localStorage.setItem('comments', JSON.stringify(yorumlar));
    
        // Yorumları güncelle ve giriş kutularını temizle
        yorumlariGoster();
        yorumInput.value = '';
        yildizInput.value = '1';
    }
    
    function yorumlariGoster() {
        const yorumlar = JSON.parse(localStorage.getItem('comments')) || [];
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML = '';
    
        yorumlar.forEach((yorum) => {
            const yorumDiv = document.createElement('div');
            yorumDiv.classList.add('comment');
            yorumDiv.innerHTML = `
                <p>${yorum.text}</p>
                <p><strong>Yıldız: ${yorum.rating}</strong></p>
            `;
            commentsContainer.appendChild(yorumDiv);
        });
    }


    document.addEventListener("DOMContentLoaded", function () {
        const termsPopup = document.getElementById("terms-popup");
        const acceptButton = document.getElementById("accept-terms");
        const declineButton = document.getElementById("decline-terms");
    
        acceptButton.addEventListener("click", function () {
            termsPopup.style.display = "none";
        });
    
        declineButton.addEventListener("click", function () {
            alert("Kuralları kabul etmeden siteye giriş yapamazsınız!");
            window.location.href = "https://google.com";
        });
    });
    

    function addComment() {
        const username = prompt("Kullanıcı adınızı girin (boş bırakabilirsiniz):");
        const text = prompt("Yorumunuzu girin:");
        const rating = parseInt(prompt("Puanınızı (1-5 arasında) girin:"), 10);
    
        const newComment = {
            username: username || "Anonim", // Kullanıcı adı girilmezse "Anonim" kullan
            text: text,
            rating: rating
        };
    
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(comments));
        displayComments();
    }
    

    function showAdvancedSection() {
        const advancedSection = document.getElementById('advancedSection');
        if (advancedSection.style.display === 'none') {
            advancedSection.style.display = 'block'; // Bölümü göster
        } else {
            advancedSection.style.display = 'none'; // Bölümü gizle
        }
    }
    
    
// Menü açma / kapama fonksiyonu
const menuBtn = document.getElementById('menu-btn');
const menuContent = document.getElementById('menu-content');

menuBtn.addEventListener('click', function() {
    menuContent.classList.toggle('open'); // "open" sınıfı eklenip çıkarılır
});

