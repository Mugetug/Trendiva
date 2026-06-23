# Mobil Frontend Görev Dağılımı

Bu dokümanda, Trendiva mobil uygulamasının kullanıcı arayüzü (UI) ve kullanıcı deneyimi (UX) görevleri listelenmektedir. Mobil uygulama React Native + Expo kullanılarak geliştirilmiştir.

---

## Grup Üyelerinin Mobil Frontend Görevleri

1. [Müge Tuğ'un Mobil Frontend Görevleri](Muge-Tug/Muge-Tug-Mobil-Frontend-Gorevleri.md)

---

## Genel Mobil Frontend Prensipleri

### 1. Tasarım Sistemi

- Modern ve sade e-ticaret tasarımı kullanılmıştır.
- Siyah, beyaz ve gri tonlarında tutarlı renk paleti kullanılmıştır.
- Responsive spacing yapısı uygulanmıştır.
- React Native StyleSheet yapısı kullanılmıştır.

### 2. Responsive Tasarım

- Mobil ekran boyutlarına uygun responsive yapı kullanılmıştır.
- ScrollView ve FlatList kullanılarak farklı ekran boyutlarına uyum sağlanmıştır.
- iOS cihazlarında düzgün görünüm için safe area uyumluluğu sağlanmıştır.

### 3. Kullanıcı Deneyimi (UX)

- API isteklerinde loading indicator kullanılmıştır.
- Başarılı işlemlerde Alert mesajları gösterilmiştir.
- Hata durumlarında kullanıcıya bilgilendirici mesajlar verilmiştir.
- Ürün detay ekranında görsel slider yapısı kullanılmıştır.

### 4. Erişilebilirlik (Accessibility)

- Buton boyutları mobil kullanım için uygun hazırlanmıştır.
- Yazı boyutları okunabilir şekilde ayarlanmıştır.
- TouchableOpacity bileşenleri ile kullanıcı etkileşimi sağlanmıştır.

### 5. Performans

- Ürün listeleme için FlatList kullanılmıştır.
- Görseller URL üzerinden dinamik yüklenmiştir.
- API verileri state yönetimi ile optimize edilmiştir.

### 6. Navigasyon

- Expo Router kullanılmıştır.
- Ana sayfa, ürün detay ve sepet ekranları arasında yönlendirme yapılmıştır.
- Parametre gönderme sistemi ile ürün detay bilgileri aktarılmıştır.

### 7. Form Yönetimi

- Giriş ve kayıt ekranlarında form yapısı oluşturulmuştur.
- Kullanıcı giriş bilgileri state ile yönetilmiştir.
- Form doğrulama kontrolleri uygulanmıştır.

### 8. Platform Özellikleri

- React Native + Expo kullanılmıştır.
- Android ve iOS desteği sağlanmıştır.
- Expo Go ile gerçek cihaz üzerinde test edilmiştir.

---

## Mobil Frontend Özellikleri

| Özellik | Durum |
|---|---|
| Kullanıcı kayıt ekranı | ✅ |
| Kullanıcı giriş ekranı | ✅ |
| Ürün listeleme ekranı | ✅ |
| Ürün detay ekranı | ✅ |
| Görsel slider | ✅ |
| Sepete ürün ekleme | ✅ |
| Sepeti görüntüleme | ✅ |
| Sepetten ürün silme | ✅ |
| Sipariş oluşturma | ✅ |
| Loading indicator | ✅ |
| API bağlantısı | ✅ |
| Responsive tasarım | ✅ |

---

## Kullanılan Teknolojiler

- React Native
- Expo
- Expo Router
- TypeScript
- REST API
- MongoDB
- Docker
- Redis
- RabbitMQ

---

## Video Kanıtları

- **Mobil Frontend Demo Videosu:** https://youtu.be/rZ_6hMpgegU
- **Mobil Backend Bağlantı Videosu:** https://youtu.be/rZ_6hMpgegU 
- **Redis Cache Videosu:** https://youtu.be/k5NxRaEUeeo
- **RabbitMQ Videosu:** https://youtu.be/ifbOPC9LleE
- **Docker + CI/CD Videosu:** https://youtu.be/I8XRa2icFyo
