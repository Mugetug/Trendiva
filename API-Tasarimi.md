# Trendiva API Tasarımı

**OpenAPI YAML Dosyası:** [openapi.yaml](https://github.com/Mugetug/Trendiva/blob/main/openapi.yaml)

## OpenAPI Specification

```yaml
openapi: 3.0.3
info:
  title: Trendiva API
  description: Trendiva e-ticaret platformu için RESTful API.
  version: 1.0.0
  contact:
    name: Trendiva Destek Ekibi
    email: support@trendiva.com
servers:
  - url: http://localhost:3000/api/v1
    description: Development server
tags:
  - name: auth
    description: Kimlik doğrulama işlemleri
  - name: users
    description: Kullanıcı yönetimi işlemleri
  - name: products
    description: Ürün yönetimi işlemleri
  - name: orders
    description: Sipariş yönetimi işlemleri

paths:
  /auth/register:
    post:
      tags:
        - auth
      summary: Yeni kullanıcı kaydı
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UserRegistration"
      responses:
        "201":
          description: Kullanıcı oluşturuldu
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"
        "400":
          $ref: "#/components/responses/BadRequest"
        "409":
          description: Email zaten kullanımda

  /auth/login:
    post:
      tags:
        - auth
      summary: Kullanıcı girişi
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/LoginCredentials"
      responses:
        "200":
          description: Giriş başarılı, JWT döner
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/AuthToken"
        "401":
          $ref: "#/components/responses/Unauthorized"

  /users:
    get:
      tags:
        - users
      summary: Kullanıcı listesi
      security:
        - bearerAuth: []
      parameters:
        - $ref: "#/components/parameters/PageParam"
        - $ref: "#/components/parameters/LimitParam"
      responses:
        "200":
          description: Başarılı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/UserList"
        "401":
          $ref: "#/components/responses/Unauthorized"

  /users/{userId}:
    get:
      tags:
        - users
      summary: Kullanıcı detayı
      security:
        - bearerAuth: []
      parameters:
        - $ref: "#/components/parameters/UserIdParam"
      responses:
        "200":
          description: Başarılı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"
        "404":
          $ref: "#/components/responses/NotFound"
    put:
      tags:
        - users
      summary: Kullanıcı güncelle
      security:
        - bearerAuth: []
      parameters:
        - $ref: "#/components/parameters/UserIdParam"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UserUpdate"
      responses:
        "200":
          description: Güncelleme başarılı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"
    delete:
      tags:
        - users
      summary: Kullanıcı sil
      security:
        - bearerAuth: []
      parameters:
        - $ref: "#/components/parameters/UserIdParam"
      responses:
        "204":
          description: Kullanıcı silindi

  /products:
    get:
      tags:
        - products
      summary: Ürün listesi
      parameters:
        - $ref: "#/components/parameters/PageParam"
        - $ref: "#/components/parameters/LimitParam"
      responses:
        "200":
          description: Başarılı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ProductList"
    post:
      tags:
        - products
      summary: Yeni ürün ekle
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/ProductCreate"
      responses:
        "201":
          description: Ürün oluşturuldu
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Product"

  /products/{productId}:
    get:
      tags:
        - products
      summary: Ürün detayı
      parameters:
        - $ref: "#/components/parameters/ProductIdParam"
      responses:
        "200":
          description: Başarılı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Product"
        "404":
          $ref: "#/components/responses/NotFound"

  /orders:
    get:
      tags:
        - orders
      summary: Sipariş listesi
      security:
        - bearerAuth: []
      parameters:
        - $ref: "#/components/parameters/PageParam"
        - $ref: "#/components/parameters/LimitParam"
      responses:
        "200":
          description: Başarılı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/OrderList"
    post:
      tags:
        - orders
      summary: Yeni sipariş oluştur
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/OrderCreate"
      responses:
        "201":
          description: Sipariş oluşturuldu
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Order"

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  parameters:
    UserIdParam:
      name: userId
      in: path
      required: true
      schema:
        type: string
        format: uuid
    ProductIdParam:
      name: productId
      in: path
      required: true
      schema:
        type: string
        format: uuid
    PageParam:
      name: page
      in: query
      schema:
        type: integer
        minimum: 1
        default: 1
    LimitParam:
      name: limit
      in: query
      schema:
        type: integer
        minimum: 1
        maximum: 100
        default: 20

  schemas:
    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
        firstName:
          type: string
        lastName:
          type: string
        role:
          type: string
          enum: [admin, user, guest]

    UserRegistration:
      type: object
      required:
        - email
        - password
        - firstName
        - lastName
      properties:
        email:
          type: string
        password:
          type: string
        firstName:
          type: string
        lastName:
          type: string

    UserUpdate:
      type: object
      properties:
        email:
          type: string
        firstName:
          type: string
        lastName:
          type: string

    LoginCredentials:
      type: object
      required:
        - email
        - password
      properties:
        email:
          type: string
        password:
          type: string

    AuthToken:
      type: object
      properties:
        token:
          type: string
        expiresIn:
          type: integer
        user:
          $ref: "#/components/schemas/User"

    Product:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
        description:
          type: string
        price:
          type: number
          format: float
        category:
          type: string
        stock:
          type: integer

    ProductCreate:
      type: object
      required:
        - name
        - price
        - category
        - stock
      properties:
        name:
          type: string
        description:
          type: string
        price:
          type: number
          format: float
        category:
          type: string
        stock:
          type: integer

    Order:
      type: object
      properties:
        id:
          type: string
          format: uuid
        userId:
          type: string
          format: uuid
        items:
          type: array
          items:
            $ref: "#/components/schemas/OrderItem"
        totalAmount:
          type: number
          format: float
        status:
          type: string
          enum: [pending, processing, shipped, delivered, cancelled]

    OrderCreate:
      type: object
      properties:
        items:
          type: array
          items:
            type: object
            required:
              - productId
              - quantity
            properties:
              productId:
                type: string
              quantity:
                type: integer

    OrderItem:
      type: object
      properties:
        productId:
          type: string
        productName:
          type: string
        quantity:
          type: integer
        unitPrice:
          type: number
        totalPrice:
          type: number

  responses:
    BadRequest:
      description: Geçersiz istek
    Unauthorized:
      description: Yetkisiz erişim
    NotFound:
      description: Kaynak bulunamadı
```
