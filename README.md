# 🎮 Minecraft RP Sunucu Launcher

Minecraft roleplay sunucuları için özel olarak tasarlanmış, modern ve kullanıcı dostu bir launcher uygulaması.

## ✨ Özellikler

### 🔧 Temel Özellikler
- **Standalone Web Uygulaması**: Electron gerektirmez, doğrudan tarayıcıda çalışır
- **Cracked Sunucu Desteği**: Sadece kullanıcı adı ile giriş
- **Karakter Seçimi**: 5 farklı RP karakteri (Vatandaş, Polis, Mafya, Doktor, Belediye Başkanı)
- **Oda Seçimi**: 5 farklı RP odası (Polis Merkezi, Cafe, Hastane, Mahalle, Hükümet Binası)
- **Otomatik Minecraft Başlatma**: minecraft:// protokolü ile doğrudan oyuna bağlantı

### 🎨 Arayüz Özellikleri
- **Modern Tasarım**: Beyaz-turuncu gradient tema
- **Responsive**: Mobil ve desktop uyumlu
- **Loading Animasyonu**: Bağlantı sırasında görsel geri bildirim
- **Manuel Talimatlar**: Otomatik başlatma başarısızsa rehber gösterim

### 💾 Kullanıcı Deneyimi
- **Veri Saklama**: Kullanıcı bilgilerini localStorage'da saklar
- **Otomatik Doldurma**: Önceki seçimleri hatırlar
- **Form Doğrulama**: Kullanıcı adı kontrolü (3-16 karakter, alfanumerik)

## 📁 Dosya Yapısı

```
minecraft-rp-launcher/
├── index.html          # Ana HTML dosyası
├── styles.css          # CSS stilleri
├── script.js           # JavaScript işlevsellik
├── config.json         # Sunucu ayarları
└── README.md          # Bu dosya
```

## 🚀 Kurulum ve Kullanım

### 1. Dosyaları İndirin
Tüm dosyaları aynı klasöre koyun.

### 2. Sunucu Ayarlarını Yapılandırın
`config.json` dosyasını düzenleyin:

```json
{
    "ip": "your-minecraft-server.com",
    "port": 25565,
    "discordUrl": "https://discord.gg/yourserver"
}
```

### 3. Web Sunucusu Başlatın
Basit bir HTTP sunucusu başlatın:

```bash
# Python 3 ile
python -m http.server 8000

# Node.js ile
npx http-server

# PHP ile
php -S localhost:8000
```

### 4. Tarayıcıda Açın
`http://localhost:8000` adresine gidin.

## ⚙️ Yapılandırma

### config.json Ayarları

| Ayar | Açıklama | Varsayılan |
|------|----------|------------|
| `ip` | Minecraft sunucu IP adresi | `your-server.com` |
| `port` | Sunucu portu | `25565` |
| `discordUrl` | Discord sunucu davet linki | `https://discord.gg/yourserver` |
| `offlineMode` | Cracked sunucu modu | `true` |
| `maxPlayers` | Maksimum oyuncu sayısı | `100` |

### Özelleştirme

#### Yeni Karakter Ekleme
`config.json` dosyasında `characters` bölümüne ekleyin:

```json
"yeni_karakter": {
    "name": "Yeni Karakter",
    "icon": "🎭",
    "description": "Açıklama"
}
```

#### Yeni Oda Ekleme
`config.json` dosyasında `rooms` bölümüne ekleyin:

```json
"yeni_oda": {
    "name": "Yeni Oda",
    "icon": "🏠",
    "description": "Açıklama"
}
```

## 🎮 Minecraft Başlatma

Launcher, aşağıdaki yöntemlerle Minecraft'ı başlatmaya çalışır:

1. **minecraft:// protokolü** - En yaygın yöntem
2. **minecraft-launcher:// protokolü** - Windows için alternatif
3. **Manuel talimatlar** - Otomatik başlatma başarısızsa

### Manuel Başlatma
Eğer otomatik başlatma çalışmazsa:

1. Minecraft'ı açın
2. Multiplayer → Add Server
3. Server Address: `your-server.com:25565`
4. Connect'e tıklayın

## 🛠️ Geliştirme

### Sunucu Durumu API'si
Gerçek sunucu durumu için bir backend API entegre edebilirsiniz:

```javascript
// script.js içinde checkServerStatus() fonksiyonunu güncelleyin
async function checkServerStatus() {
    try {
        const response = await fetch('/api/server-status');
        const data = await response.json();
        // Sunucu durumunu güncelle
    } catch (error) {
        // Hata durumu
    }
}
```

### Özelleştirme Renkleri

CSS değişkenlerini `styles.css` dosyasında düzenleyerek renk şemasını değiştirebilirsiniz:

```css
:root {
    --primary-color: #ff8a00;
    --secondary-color: #e52e71;
    --background-color: #f5f7fa;
}
```

## 🔒 Güvenlik

- Bu launcher cracked sunucular için tasarlanmıştır
- Kullanıcı verileri sadece localStorage'da saklanır
- Sunucu bilgileri config.json'da açık metin olarak tutulur

## 📱 Mobil Uyumluluk

Launcher responsive tasarıma sahiptir ve mobil cihazlarda çalışır, ancak Minecraft başlatma mobil cihazlarda mümkün değildir.

## 🐛 Sorun Giderme

### Minecraft Başlamıyor
1. Minecraft'ın yüklü olduğundan emin olun
2. Tarayıcının protokol izinlerini kontrol edin
3. Manuel talimatları takip edin

### Config Dosyası Okunamıyor
1. JSON formatının doğru olduğunu kontrol edin
2. Dosya yolunun doğru olduğundan emin olun
3. HTTP sunucusunun çalıştığını kontrol edin

## 📄 Lisans

Bu proje açık kaynak kodludur. Kendi projelerinizde kullanabilirsiniz.

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun
3. Değişikliklerinizi commit edin
4. Pull request gönderin

---

**Not**: Bu launcher eğitim amaçlı oluşturulmuştur. Üretim ortamında kullanmadan önce güvenlik değerlendirmesi yapın.