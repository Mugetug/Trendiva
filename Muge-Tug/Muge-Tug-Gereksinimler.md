1. **Kullanıcı Kaydı Oluşturma**
   - **API Metodu:** `POST /auth/register`
   - **Açıklama:** Kullanıcı, ad, soyad, e-posta ve şifre bilgilerini girerek sisteme kayıt olur. Girilen bilgiler veritabanına kaydedilir. Aynı e-posta ile ikinci kez kayıt yapılamaz.

2. **Kullanıcı Girişi Yapma**
   - **API Metodu:** `POST /auth/login`
   - **Açıklama:** Kullanıcı, e-posta ve şifre bilgileri ile sisteme giriş yapar. Bilgiler doğrulanır. Doğruysa kullanıcı hesabına erişim sağlanır.

3. **Ürün Ekleme**
   - **API Metodu:** `POST /products`
   - **Açıklama:** Satıcı veya yönetici, ürün adı, fiyat, stok miktarı ve açıklama bilgilerini girerek yeni bir ürün ekler. Ürün bilgileri veritabanına kaydedilir.

4. **Ürün Listeleme**
   - **API Metodu:** `GET /products`
   - **Açıklama:** Sistemde kayıtlı tüm ürünler kullanıcıya listelenir. Her ürünün adı, fiyatı ve stok durumu görüntülenir.

5. **Ürün Detayı Görüntüleme**
   - **API Metodu:** `GET /products/{productId}`
   - **Açıklama:** Kullanıcı, seçtiği ürünün detay sayfasında ürünün tüm bilgilerini görüntüler. Bu bilgiler veritabanından alınır.

6. **Ürün Güncelleme**
   - **API Metodu:** `PUT /products/{productId}`
   - **Açıklama:** Satıcı veya yönetici, mevcut bir ürünün fiyatını, stok miktarını veya açıklamasını günceller. Güncellenen bilgiler veritabanında değiştirilir.

7. **Ürün Silme**
   - **API Metodu:** `DELETE /products/{productId}`
   - **Açıklama:** Satıcı veya yönetici, sistemde kayıtlı bir ürünü siler. Silinen ürün veritabanından kaldırılır ve kullanıcılar tarafından görüntülenemez.

8. **Sepete Ürün Ekleme**
   - **API Metodu:** `POST /cart`
   - **Açıklama:** Kullanıcı, seçtiği ürünü sepetine ekler. Ürün ve adet bilgisi veritabanına kaydedilir.

9. **Sepeti Listeleme**
   - **API Metodu:** `GET /cart/{userId}`
   - **Açıklama:** Kullanıcı, sepetinde bulunan tüm ürünleri ve toplam tutarı görüntüler. Sepet bilgileri veritabanından alınır.

10. **Sipariş Oluşturma**
   - **API Metodu:** `POST /orders`
   - **Açıklama:** Kullanıcı, sepetindeki ürünleri satın alarak sipariş oluşturur. Sipariş bilgileri veritabanına kaydedilir ve ürün stok miktarı güncellenir.
