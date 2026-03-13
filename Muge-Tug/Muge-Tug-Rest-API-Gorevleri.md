# Müge Tuğ'un REST API Metotları

**API Test Videosu:** Link buraya eklenecek

---

## 1. Kullanıcı Kaydı Oluşturma

- Endpoint: POST /api/users/register
- Açıklama: Yeni bir kullanıcı sisteme kayıt olur.

Request Body:

{
"firstName": "Muge",
"lastName": "Tug",
"email": "muge@example.com",
"password": "123456"
}

Response: 201 Created - Kullanıcı başarıyla oluşturuldu

---

## 2. Kullanıcı Girişi Yapma

- Endpoint: POST /api/users/login
- Açıklama: Kullanıcı email ve şifre ile giriş yapar.

Request Body:

{
"email": "muge@example.com",
"password": "123456"
}

Response: 200 OK - Giriş başarılı

---

## 3. Ürün Ekleme

- Endpoint: POST /api/products
- Açıklama: Yeni bir ürün sisteme eklenir.

Request Body:

{
"name": "Beyaz Gömlek",
"price": 499.99,
"description": "Şık beyaz gömlek",
"stock": 15
}

Response: 201 Created - Ürün başarıyla eklendi

---

## 4. Ürün Listeleme

- Endpoint: GET /api/products
- Açıklama: Sistemdeki tüm ürünleri listeler.

Response: 200 OK - Ürün listesi başarıyla getirildi

---

## 5. Ürün Detayı Görüntüleme

- Endpoint: GET /api/products/{productId}
- Açıklama: Seçilen ürünün detay bilgilerini getirir.

Response: 200 OK - Ürün bilgisi başarıyla getirildi

---

## 6. Ürün Güncelleme

- Endpoint: PUT /api/products/{productId}
- Açıklama: Mevcut ürün bilgilerini günceller.

Request Body:

{
"name": "Siyah Abiye Elbise",
"price": 999.99,
"description": "Güncellenmiş ürün açıklaması",
"stock": 8
}

Response: 200 OK - Ürün başarıyla güncellendi

---

## 7. Ürün Silme

- Endpoint: DELETE /api/products/{productId}
- Açıklama: Seçilen ürünü sistemden siler.

Response: 200 OK - Ürün başarıyla silindi

---

## 8. Sepete Ürün Ekleme

- Endpoint: POST /api/cart
- Açıklama: Kullanıcı bir ürünü sepetine ekler.

Request Body:

{
"userId": "69b2042dff204a5f4627ab2f",
"productId": "69b3fbe67c4f8bb96b54d9d7",
"quantity": 2
}

Response: 201 Created - Ürün sepete eklendi

---

## 9. Sepeti Listeleme

- Endpoint: GET /api/cart/{userId}
- Açıklama: Kullanıcının sepetindeki ürünleri listeler.

Response: 200 OK - Sepet başarıyla getirildi

---

## 10. Sipariş Oluşturma

- Endpoint: POST /api/orders
- Açıklama: Kullanıcının sepetindeki ürünleri kullanarak sipariş oluşturur.

Request Body:

{
"userId": "69b2042dff204a5f4627ab2f",
"cartId": "69b3fc567c4f8bb96b54d9d9",
"paymentMethod": "Kredi Kartı"
}

Response: 201 Created - Sipariş başarıyla oluşturuldu
