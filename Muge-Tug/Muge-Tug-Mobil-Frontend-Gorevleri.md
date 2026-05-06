# Müge Tuğ'un Mobil Frontend Görevleri

**Mobile Front-end Demo Videosu:** [Link buraya eklenecek](https://example.com)

## 1. Üye Olma (Kayıt) Ekranı

- **API Endpoint:** `POST /api/users/register`
- **Görev:** Kullanıcı kayıt işlemi için mobil ekran tasarımı ve backend entegrasyonu

### UI Bileşenleri
- Ad input alanı
- Soyad input alanı
- Email input alanı
- Şifre input alanı
- "Kayıt Ol" butonu
- Hata ve başarı mesajları

### Yapılan İşlemler
- Kullanıcıdan firstName, lastName, email ve password bilgileri alındı
- Backend API’ye POST isteği gönderildi
- Başarılı kayıt sonrası kullanıcı giriş ekranına yönlendirildi
- Hata durumlarında kullanıcıya uyarı gösterildi

---

## 2. Kullanıcı Giriş Ekranı

- **API Endpoint:** `POST /api/users/login`
- **Görev:** Kullanıcı giriş işlemi için mobil ekran tasarımı ve backend entegrasyonu

### UI Bileşenleri
- Email input alanı
- Şifre input alanı
- "Giriş Yap" butonu
- "Hesabın yok mu? Kayıt Ol" yönlendirme linki
- Hata ve başarı mesajları

### Yapılan İşlemler
- Kullanıcıdan email ve şifre bilgileri alındı
- Backend API’ye POST isteği gönderildi
- Başarılı giriş sonrası kullanıcı ana sayfaya yönlendirildi
- Token AsyncStorage ile mobil cihazda saklandı

---

## 3. Ürün Listeleme Ekranı

- **API Endpoint:** `GET /api/products`
- **Görev:** Ürünlerin mobil uygulamada listelenmesi

### UI Bileşenleri
- Ürün kartları
- Ürün görseli
- Ürün adı
- Ürün açıklaması
- Ürün fiyatı
- Stok bilgisi
- "Detay Gör" butonu
- "Sepete Ekle" butonu

### Yapılan İşlemler
- Ürünler backend API’den çekildi
- FlatList ile ürünler listelendi
- Gerçek ürün görselleri mobil arayüzde gösterildi
- Ana sayfadan sepete ürün ekleme işlemi yapıldı

---

## 4. Ürün Detay Ekranı

- **API Endpoint:** `GET /api/products`
- **Görev:** Seçilen ürünün detay bilgilerinin gösterilmesi

### UI Bileşenleri
- Çoklu ürün görseli galerisi
- Ürün adı
- Ürün açıklaması
- Fiyat bilgisi
- Stok bilgisi
- "Sepete Ekle" butonu

### Yapılan İşlemler
- Ana sayfadan seçilen ürünün bilgileri detay ekranına aktarıldı
- Ürüne ait birden fazla görsel yatay kaydırmalı şekilde gösterildi
- Detay sayfasından sepete ürün ekleme işlemi yapıldı

---

## 5. Sepet Ekranı

- **API Endpointleri:**
  - `GET /api/cart/:userId`
  - `POST /api/cart`
  - `DELETE /api/cart/item/:cartItemId`

- **Görev:** Kullanıcının sepet işlemlerini mobil uygulamada yapabilmesi

### UI Bileşenleri
- Sepetteki ürün listesi
- Ürün adı
- Adet bilgisi
- Fiyat bilgisi
- Toplam tutar
- "Sepetten Kaldır" butonu
- "Sipariş Oluştur" butonu

### Yapılan İşlemler
- Sepet verileri backend API’den çekildi
- Sepetteki ürünler listelendi
- Sepetten ürün kaldırma işlemi yapıldı
- Toplam fiyat hesaplandı
- Sepet ekranı her açıldığında güncel veriler tekrar çekildi

---

## 6. Sipariş Oluşturma Ekran Akışı

- **API Endpoint:** `POST /api/orders`
- **Görev:** Sepetteki ürünlerden sipariş oluşturma işlemi

### UI Bileşenleri
- "Sipariş Oluştur" butonu
- Başarı ve hata mesajları

### Yapılan İşlemler
- Sepette ürün varsa sipariş oluşturma isteği gönderildi
- Başarılı sipariş sonrası kullanıcıya bilgi mesajı gösterildi
- Sipariş oluşturulunca backend tarafında RabbitMQ mesajı üretildi

---

## 7. Alt Menü Navigasyonu

- **Görev:** Mobil uygulamada ekranlar arası geçişin sağlanması

### Sekmeler
- Home
- Sepetim
- Giriş

### Yapılan İşlemler
- Expo Router tab navigation kullanıldı
- Ürün listeleme, sepet ve kullanıcı giriş ekranları arasında geçiş sağlandı
- Giriş ve kayıt ekranları stack yapısı ile bağlandı
