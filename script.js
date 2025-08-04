// Sunucu ayarları
let serverConfig = {
    ip: 'play.example.com',
    port: 25565,
    discordUrl: 'https://discord.gg/yourserver'
};

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    initializeLauncher();
    loadServerConfig();
    checkServerStatus();
    
    // Her 30 saniyede bir sunucu durumunu kontrol et
    setInterval(checkServerStatus, 30000);
});

function initializeLauncher() {
    // Oda seçimi
    const roomCards = document.querySelectorAll('.room-card');
    const selectedRoomInput = document.getElementById('selectedRoom');
    
    roomCards.forEach(card => {
        card.addEventListener('click', function() {
            // Önceki seçimi kaldır
            roomCards.forEach(c => c.classList.remove('selected'));
            
            // Yeni seçimi ekle
            this.classList.add('selected');
            selectedRoomInput.value = this.dataset.room;
        });
    });

    // Form gönderimi
    const form = document.getElementById('launcherForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        launchMinecraft();
    });

    // Discord linkini güncelle
    loadServerConfig().then(() => {
        const discordLink = document.getElementById('discordLink');
        discordLink.href = serverConfig.discordUrl;
    });
}

async function loadServerConfig() {
    try {
        const response = await fetch('config.json');
        if (response.ok) {
            const config = await response.json();
            serverConfig = { ...serverConfig, ...config };
        }
    } catch (error) {
        console.log('Config dosyası bulunamadı, varsayılan ayarlar kullanılıyor');
    }
}

async function checkServerStatus() {
    const statusElement = document.getElementById('serverStatus');
    const playerCountElement = document.getElementById('playerCount');
    
    try {
        // Minecraft sunucu durumunu kontrol etmek için basit bir ping
        // Not: Bu gerçek bir implementasyon için bir backend API gerekir
        // Şimdilik simüle edilmiş veri kullanıyoruz
        
        statusElement.textContent = 'Çevrimiçi';
        statusElement.className = 'status-value online';
        playerCountElement.textContent = Math.floor(Math.random() * 50) + '/100';
        
    } catch (error) {
        statusElement.textContent = 'Çevrimdışı';
        statusElement.className = 'status-value offline';
        playerCountElement.textContent = '0/100';
    }
}

function launchMinecraft() {
    const username = document.getElementById('username').value;
    const character = document.getElementById('character').value;
    const selectedRoom = document.getElementById('selectedRoom').value;
    
    // Form doğrulama
    if (!username || !character || !selectedRoom) {
        alert('Lütfen tüm alanları doldurun!');
        return;
    }

    // Kullanıcı adı doğrulama
    if (!/^[a-zA-Z0-9_]{3,16}$/.test(username)) {
        alert('Kullanıcı adı 3-16 karakter arası olmalı ve sadece harf, rakam ve alt çizgi içermelidir!');
        return;
    }

    // Loading göster
    showLoading();

    // Minecraft'ı başlat
    setTimeout(() => {
        try {
            launchMinecraftClient(username, character, selectedRoom);
        } catch (error) {
            console.error('Minecraft başlatılırken hata:', error);
            alert('Minecraft başlatılırken bir hata oluştu. Lütfen Minecraft\'ın yüklü olduğundan emin olun.');
        } finally {
            hideLoading();
        }
    }, 2000);
}

function launchMinecraftClient(username, character, selectedRoom) {
    const serverAddress = `${serverConfig.ip}:${serverConfig.port}`;
    
    // Kullanıcı verilerini localStorage'a kaydet
    const userData = {
        username,
        character,
        selectedRoom,
        lastJoin: new Date().toISOString()
    };
    localStorage.setItem('rpLauncherData', JSON.stringify(userData));
    
    // Minecraft başlatma yöntemleri
    const launchMethods = [
        // Method 1: minecraft:// protokolü
        () => {
            const minecraftUrl = `minecraft://?username=${encodeURIComponent(username)}&server=${encodeURIComponent(serverAddress)}`;
            window.location.href = minecraftUrl;
        },
        
        // Method 2: Launcher komut satırı (Windows için)
        () => {
            if (navigator.platform.includes('Win')) {
                const command = `minecraft-launcher://launch?username=${encodeURIComponent(username)}&server=${encodeURIComponent(serverAddress)}`;
                window.open(command);
            }
        },
        
        // Method 3: Manuel talimatlar göster
        () => {
            showManualInstructions(username, serverAddress, character, selectedRoom);
        }
    ];
    
    // İlk yöntemi dene
    try {
        launchMethods[0]();
        
        // 3 saniye sonra kontrol et, eğer sayfa hala açıksa manuel talimatları göster
        setTimeout(() => {
            if (document.visibilityState === 'visible') {
                showManualInstructions(username, serverAddress, character, selectedRoom);
            }
        }, 3000);
        
    } catch (error) {
        // Manuel talimatları göster
        showManualInstructions(username, serverAddress, character, selectedRoom);
    }
}

function showManualInstructions(username, serverAddress, character, selectedRoom) {
    const instructions = `
        <div style="max-width: 500px; margin: 20px auto; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
            <h3 style="color: #ff8a00; margin-bottom: 15px;">🎮 Manuel Bağlantı Talimatları</h3>
            
            <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                <h4 style="color: #333; margin-bottom: 10px;">📋 Bilgileriniz:</h4>
                <p><strong>Kullanıcı Adı:</strong> ${username}</p>
                <p><strong>Karakter:</strong> ${getCharacterName(character)}</p>
                <p><strong>Oda:</strong> ${getRoomName(selectedRoom)}</p>
                <p><strong>Sunucu:</strong> ${serverAddress}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
                <h4 style="color: #333; margin-bottom: 10px;">🚀 Adımlar:</h4>
                <ol style="margin-left: 20px; line-height: 1.6;">
                    <li>Minecraft'ı açın</li>
                    <li>Multiplayer bölümüne gidin</li>
                    <li>"Add Server" butonuna tıklayın</li>
                    <li>Server Address olarak: <code style="background: #e9ecef; padding: 2px 5px; border-radius: 3px;">${serverAddress}</code> yazın</li>
                    <li>Sunucuya bağlanın</li>
                    <li>Oyunda ${getCharacterName(character)} karakteri ve ${getRoomName(selectedRoom)} odasını seçin</li>
                </ol>
            </div>
            
            <button onclick="this.parentElement.remove()" style="width: 100%; padding: 10px; background: linear-gradient(90deg, #ff8a00 0%, #e52e71 100%); color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                Anladım
            </button>
        </div>
    `;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    overlay.innerHTML = instructions;
    
    document.body.appendChild(overlay);
    
    // Overlay'e tıklayınca kapat
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

function getCharacterName(character) {
    const characterNames = {
        'vatandas': '👤 Vatandaş',
        'polis': '👮 Polis',
        'mafya': '🕴️ Mafya',
        'doktor': '👨‍⚕️ Doktor',
        'belediye_baskani': '🏛️ Belediye Başkanı'
    };
    return characterNames[character] || character;
}

function getRoomName(room) {
    const roomNames = {
        'polis_merkezi': '🚓 Polis Merkezi',
        'cafe': '☕ Cafe',
        'hastane': '🏥 Hastane',
        'mahalle': '🏘️ Mahalle',
        'hukumet_binasi': '🏛️ Hükümet Binası'
    };
    return roomNames[room] || room;
}

function showLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.add('show');
    
    // Form butonunu devre dışı bırak
    const launchButton = document.getElementById('launchButton');
    launchButton.disabled = true;
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.remove('show');
    
    // Form butonunu tekrar aktif et
    const launchButton = document.getElementById('launchButton');
    launchButton.disabled = false;
}

// Sayfa kapatılırken kullanıcı verilerini kaydet
window.addEventListener('beforeunload', function() {
    const username = document.getElementById('username').value;
    const character = document.getElementById('character').value;
    const selectedRoom = document.getElementById('selectedRoom').value;
    
    if (username) {
        const userData = {
            username,
            character,
            selectedRoom,
            lastSave: new Date().toISOString()
        };
        localStorage.setItem('rpLauncherData', JSON.stringify(userData));
    }
});

// Sayfa yüklendiğinde önceki verileri geri yükle
window.addEventListener('load', function() {
    try {
        const savedData = localStorage.getItem('rpLauncherData');
        if (savedData) {
            const userData = JSON.parse(savedData);
            
            // Kullanıcı adını geri yükle
            if (userData.username) {
                document.getElementById('username').value = userData.username;
            }
            
            // Karakter seçimini geri yükle
            if (userData.character) {
                document.getElementById('character').value = userData.character;
            }
            
            // Oda seçimini geri yükle
            if (userData.selectedRoom) {
                const roomCard = document.querySelector(`[data-room="${userData.selectedRoom}"]`);
                if (roomCard) {
                    roomCard.click();
                }
            }
        }
    } catch (error) {
        console.log('Önceki veriler yüklenirken hata:', error);
    }
});