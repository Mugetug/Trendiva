# Mobil Backend (REST API Bağlantısı) Görev Dağılımı

**REST API Adresi:** `http://localhost:5000`

Bu dokümanda, Trendiva mobil uygulamasının REST API ile iletişimini sağlayan backend entegrasyon görevleri listelenmektedir. Mobil uygulamada kullanıcı işlemleri, ürün işlemleri, sepet işlemleri ve sipariş işlemleri REST API üzerinden gerçekleştirilmiştir.

---

## Mobil Backend Görevleri

1. [Müge Tuğ'un Mobil Backend Görevleri](Muge-Tug/Muge-Tug-Mobil-Backend-Gorevleri.md)

---

## Genel Mobil Backend Prensipleri

### 1. HTTP Client Yapılandırması

- **Base URL:** `http://192.168.1.120:5000`
- **Local API Adresi:** `http://localhost:5000`
- **Content-Type:** `application/json`
- Mobil uygulamada API istekleri `fetch` ile gönderilmiştir.

### 2. Authentication Yönetimi

- Kullanıcı kayıt işlemi REST API ile yapılmıştır.
- Kullanıcı giriş işlemi REST API ile yapılmıştır.
- Başarılı giriş sonrası token alınmıştır.
- Token mobil tarafta AsyncStorage ile saklanmıştır.
- Giriş ve kayıt ekranları mobil uygulamada oluşturulmuştur.

### 3. Ürün API Entegrasyonu

- Ürünler backend API’den çekilmiştir.
- Ürün listeleme ekranında gerçek ürün görselleri gösterilmiştir.
- Ürün detay ekranına ürün bilgileri aktarılmıştır.
- Ürün detay ekranında birden fazla ürün görseli gösterilmiştir.

### 4. Sepet API Entegrasyonu

- Mobil uygulamadan sepete ürün ekleme işlemi yapılmıştır.
- Sepet verileri backend API’den çekilmiştir.
- Sepetteki ürünler mobil ekranda listelenmiştir.
- Sepetten ürün kaldırma işlemi yapılmıştır.
- Sepet toplam tutarı mobil uygulamada hesaplanmıştır.

### 5. Sipariş API Entegrasyonu

- Sepetteki ürünlerden sipariş oluşturma işlemi yapılmıştır.
- Sipariş oluşturma işlemi REST API’ye POST isteği ile gönderilmiştir.
- Başarılı sipariş sonrası kullanıcıya bilgi mesajı gösterilmiştir.
- Sipariş oluşturulduğunda backend tarafında RabbitMQ mesajı oluşturulmuştur.

### 6. Error Handling

- API bağlantı hataları yakalanmıştır.
- Başarılı ve başarısız işlemlerde kullanıcıya Alert mesajları gösterilmiştir.
- Sepet, ürün ve sipariş işlemlerinde hata durumları kontrol edilmiştir.

### 7. Loading States

- Ürün listeleme sırasında loading state kullanılmıştır.
- Sepet verileri yüklenirken loading indicator gösterilmiştir.
- API verileri geldikten sonra ekran güncellenmiştir.

### 8. Caching Stratejisi

- Ürün listeleme endpoint’i için Redis cache entegrasyonu yapılmıştır.
- İlk ürün listeleme isteğinde veriler MongoDB’den alınmıştır.
- Sonraki isteklerde ürün verileri Redis cache üzerinden alınmıştır.
- Ürün ekleme, güncelleme ve silme işlemlerinde cache temizleme işlemi yapılmıştır.

### 9. Logging ve Debugging

- Mobil tarafta API istekleri için console log kullanılmıştır.
- Backend tarafında Redis cache logları gösterilmiştir.
- Backend tarafında RabbitMQ bağlantı ve mesaj gönderme logları gösterilmiştir.
- Docker container logları ile backend, Redis ve RabbitMQ çalışması kontrol edilmiştir.

---

## Kullanılan REST API Endpointleri

| İşlem | Metot | Endpoint |
|---|---|---|
| Kullanıcı kayıt | POST | `/api/users/register` |
| Kullanıcı giriş | POST | `/api/users/login` |
| Ürün listeleme | GET | `/api/products` |
| Ürün detay | GET | `/api/products/:id` |
| Ürün ekleme | POST | `/api/products` |
| Ürün güncelleme | PUT | `/api/products/:id` |
| Ürün silme | DELETE | `/api/products/:id` |
| Sepete ürün ekleme | POST | `/api/cart` |
| Sepeti listeleme | GET | `/api/cart/:userId` |
| Sepetten ürün silme | DELETE | `/api/cart/item/:cartItemId` |
| Sipariş oluşturma | POST | `/api/orders` |

---

## Video Kanıtları

**Mobil Frontend Demo Videosu:** (https://youtu.be/rZ_6hMpgegU)
**Mobil Backend Bağlantı Videosu:** https://youtu.be/rZ_6hMpgegU 
**Redis Cache Videosu:** https://youtu.be/k5NxRaEUeeo
**RabbitMQ Videosu:** https://youtu.be/ifbOPC9LleE
**Docker + CI/CD Videosu:** https://youtu.be/I8XRa2icFyo
