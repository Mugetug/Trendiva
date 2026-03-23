# Müge Tuğ Web Frontend Görevleri

**Front-end Domain Adresi:** https://trendiva-gamma.vercel.app

**Front-end Test Videosu:** BURAYA-YOUTUBE-LINKI-GELECEK

Bu projede toplam 10 gereksinimin frontend tarafında 8 tanesi gerçekleştirilmiştir.  
Frontend üzerinden gösterilen gereksinimler aşağıdadır.

---

## 1. Kullanıcı Kaydı Oluşturma Sayfası

**API Endpoint:** `POST /api/users/register`  
**Görev:** Kullanıcının sisteme kayıt olabilmesi için kayıt formunun tasarlanması ve backend API’ye bağlanması.

### UI Bileşenleri
- Kullanıcı adı input alanı
- Email input alanı
- Şifre input alanı
- Kayıt Ol butonu
- Form alanlarının bulunduğu responsive sayfa yapısı

### Kullanıcı Deneyimi
- Kullanıcı gerekli alanları doldurarak kayıt olabilir
- Başarılı kayıt sonrası kullanıcı bilgilendirilir
- Hatalı ya da eksik girişlerde uyarı mesajı gösterilir

### Teknik Detaylar
- Form verileri frontend üzerinden alınır
- `fetch` ile backend’deki kayıt endpointine istek atılır
- Başarılı sonuçta kullanıcı giriş akışına yönlendirilir

---

## 2. Kullanıcı Giriş Yapma Sayfası

**API Endpoint:** `POST /api/users/login`  
**Görev:** Kullanıcının email ve şifre bilgileriyle sisteme giriş yapabilmesi.

### UI Bileşenleri
- Email input alanı
- Şifre input alanı
- Giriş Yap butonu
- Kayıt sayfasına yönlendirme linki

### Kullanıcı Deneyimi
- Kullanıcı doğru bilgilerle giriş yapabilir
- Hatalı bilgiler girildiğinde uyarı mesajı gösterilir
- Başarılı giriş sonrası kullanıcı anasayfaya yönlendirilir

### Teknik Detaylar
- Login isteği backend’e gönderilir
- Giriş yapan kullanıcı bilgileri localStorage’da tutulur
- Header ve sepet işlemleri kullanıcı bilgisine göre çalışır

---

## 3. Ürün Listeleme Sayfası

**API Endpoint:** `GET /api/products`  
**Görev:** Backend’de kayıtlı ürünlerin anasayfa ve mağaza sayfasında listelenmesi.

### UI Bileşenleri
- Ürün kartları
- Ürün görseli
- Ürün adı
- Ürün fiyatı
- Sepete ekle butonu
- Ürün detayı görüntüleme butonu

### Kullanıcı Deneyimi
- Kullanıcı ürünleri kart yapısında görüntüleyebilir
- Ürünler grid yapısında responsive şekilde listelenir
- Sayfa yenilendiğinde ürünler backend’den tekrar çekilir

### Teknik Detaylar
- Ürün verileri `fetch` ile backend’den alınır
- Gelen ürünler dinamik olarak DOM’a basılır
- Görseller frontend klasöründeki ürün görselleri ile eşleştirilir

---

## 4. Ürün Detayı Görüntüleme Sayfası

**API Endpoint:** `GET /api/products`  
**Görev:** Kullanıcının seçtiği ürünün detay sayfasında doğru ürün bilgisini görüntülemesi.

### UI Bileşenleri
- Büyük ürün görseli
- Galeri görselleri
- Ürün adı
- Güncel fiyat
- Eski fiyat
- Adet seçimi
- Sepete ekle butonu

### Kullanıcı Deneyimi
- Kullanıcı hangi ürüne tıklarsa o ürünün detayını görür
- Ürün adı ve fiyatı doğru şekilde görüntülenir
- Farklı ürünlere basıldığında aynı ürün değil, seçilen ürün açılır

### Teknik Detaylar
- Tıklanan ürünün id bilgisi localStorage’a kaydedilir
- Detay sayfasında backend’den ürünler alınır
- `_id` ile eşleşen ürün bulunup ekrana basılır

---

## 5. Sepete Ürün Ekleme

**API Endpoint:** `POST /api/cart`  
**Görev:** Kullanıcının ürünleri sepete ekleyebilmesi.

### UI Bileşenleri
- Ürün kartı üzerindeki sepete ekle butonu
- Ürün detay sayfasındaki sepete ekle butonu
- Header üzerindeki sepet sayaç alanı

### Kullanıcı Deneyimi
- Kullanıcı ürün kartından veya detay sayfasından ürünü sepete ekleyebilir
- Başarılı işlem sonrası kullanıcıya bilgilendirme mesajı gösterilir
- Header’daki sepet sayacı güncellenir

### Teknik Detaylar
- Giriş yapan kullanıcının `userId` bilgisi localStorage’dan alınır
- Seçilen ürün id’si ile backend’e cart isteği gönderilir
- Başarılı yanıt sonrası sepet sayısı anlık artırılır

---

## 6. Sepeti Listeleme

**API Endpoint:** `GET /api/cart/{userId}`  
**Görev:** Kullanıcının sepete eklediği ürünleri cart sayfasında görüntülemesi.

### UI Bileşenleri
- Cart tablosu
- Ürün görseli
- Ürün adı
- Ürün fiyatı
- Ürün miktarı
- Ara toplam
- Genel toplam alanı

### Kullanıcı Deneyimi
- Kullanıcı sepetine eklediği ürünleri liste halinde görür
- Farklı ürünler farklı isim ve fiyatlarla gösterilir
- Sepet boşsa kullanıcıya boş sepet mesajı gösterilir

### Teknik Detaylar
- Kullanıcının sepeti backend’den alınır
- Ürün bilgileri ayrıca ürün listesinden çekilerek eşleştirilir
- Cart sayfasındaki toplam fiyatlar dinamik hesaplanır

---

## 7. Sepetten Ürün Silme

**API Endpoint:** `DELETE /api/cart/item/{cartItemId}`  
**Görev:** Kullanıcının sepetindeki bir ürünü silebilmesi.

### UI Bileşenleri
- Cart satırındaki çarpı (silme) butonu

### Kullanıcı Deneyimi
- Kullanıcı istediği ürünü sepetten kaldırabilir
- Başarılı silme sonrası ürün listeden kaybolur
- Sayfa yenilendiğinde silinen ürün geri gelmez

### Teknik Detaylar
- Silme butonundan ilgili cart item id alınır
- Backend’e `DELETE` isteği gönderilir
- Başarılı işlem sonrası sepet yeniden render edilir

---

## 8. Sipariş Oluşturma

**API Endpoint:** `POST /api/orders`  
**Görev:** Kullanıcının sepeti üzerinden sipariş oluşturabilmesi.

### UI Bileşenleri
- Cart sayfasındaki “Ödeme Yap” butonu
- Toplam fiyat alanı

### Kullanıcı Deneyimi
- Kullanıcı ödeme butonuna basarak sipariş oluşturabilir
- Başarılı sipariş sonrası popup mesajı ile bilgilendirilir
- Sepet boşsa sipariş oluşturulamaz ve uyarı gösterilir

### Teknik Detaylar
- Kullanıcının sepet bilgisi backend’den alınır
- Sepetteki ürün bilgisi ile `/api/orders` endpointine istek gönderilir
- Başarılı response sonrası kullanıcıya bilgilendirme yapılır
