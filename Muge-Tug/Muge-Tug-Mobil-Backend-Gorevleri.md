# Müge Tuğ'un Mobil Backend Görevleri

Mobil Front-end ile Back-end Bağlantı Videosu:
Link buraya eklenecek

---

## 1. Kullanıcı Giriş Sistemi

API Endpoint:
POST /api/users/login

Görev:
Mobil uygulama ile kullanıcı giriş sistemi entegrasyonu sağlandı.

Yapılan İşlemler:
- Kullanıcı email ve şifre bilgileri alındı
- API’ye POST isteği gönderildi
- Başarılı giriş sonrası kullanıcı yönlendirmesi yapıldı
- Hatalı girişlerde kullanıcıya uyarı gösterildi
- Token sistemi kullanıldı

---

## 2. Ürün Listeleme Servisi

API Endpoint:
GET /api/products

Görev:
Ürünlerin backend’den çekilip mobil uygulamada listelenmesi sağlandı.

Yapılan İşlemler:
- REST API’den ürünler çekildi
- FlatList ile ürünler gösterildi
- Ürün görselleri gösterildi
- Loading yapısı oluşturuldu

---

## 3. Ürün Detay Sayfası

API Endpoint:
GET /api/products/:id

Görev:
Seçilen ürünün detay bilgilerinin gösterilmesi sağlandı.

Yapılan İşlemler:
- Ürün detay sayfası oluşturuldu
- Birden fazla ürün görseli gösterildi
- Ürün açıklama, fiyat ve stok bilgileri gösterildi

---

## 4. Sepet Sistemi

API Endpoint:
POST /api/cart

Görev:
Mobil uygulamadan sepete ürün ekleme işlemi gerçekleştirildi.

Yapılan İşlemler:
- Ana sayfadan sepete ekleme
- Detay sayfasından sepete ekleme
- Sepet listeleme sistemi
- Sepetten ürün silme sistemi
- Toplam fiyat hesaplama

---

## 5. Sipariş Sistemi

API Endpoint:
POST /api/orders

Görev:
Sepetteki ürünlerden sipariş oluşturma işlemi yapıldı.

Yapılan İşlemler:
- Sipariş oluşturma sistemi geliştirildi
- Payment method gönderildi
- Başarılı sipariş sonrası kullanıcı bilgilendirildi

---

## 6. RabbitMQ Entegrasyonu

Görev:
Sipariş sonrası mesaj kuyruğu sistemi entegrasyonu sağlandı.

Yapılan İşlemler:
- RabbitMQ Docker container kurulumu
- RabbitMQ bağlantısı
- Sipariş sonrası mesaj gönderme işlemi

---

## 7. Redis Entegrasyonu

Görev:
Cache sistemi entegrasyonu gerçekleştirildi.

Yapılan İşlemler:
- Redis Docker container kurulumu
- Redis bağlantısı
- Cache altyapısı oluşturuldu

---

## 8. Docker ve CI/CD

Görev:
Projenin Docker ve Jenkins ile çalıştırılması sağlandı.

Yapılan İşlemler:
- Docker Compose kurulumu
- Frontend ve Backend container yapısı
- Jenkins Pipeline oluşturuldu
- Jenkinsfile entegrasyonu yapıldı
