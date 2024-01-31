# Product API Spec

## Create Product API

Endpoint: POST /api/products

Headers :

- Authorization : token

Request Body:

```json
{
  "name": "Laptop",
  "price": 99.0,
  "stock": 2,
  "description": "Deskripsi produk",
  "category": "Elektronik",
  "imageUrl": "url foto produk"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "name": "Laptop",
    "price": 99.0,
    "stock": 2,
    "description": "Deskripsi produk",
    "category": "Elektronik",
    "imageUrl": "url foto produk"
  }
}
```

Response Body Error:

```json
{
  "error": "Produk gagal ditambahkan..."
}
```

## Update Product API

Endpoint: PUT /api/products/:id

Headers :

- Authorization : token

Request Body:

```json
{
  "name": "Updated Laptop",
  "price": 109.0,
  "stock": 5,
  "description": "Updated Deskripsi produk",
  "category": "Elektronik",
  "imageUrl": "url foto produk"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "name": "Updated Laptop",
    "price": 109.0,
    "stock": 5,
    "description": "Updated Deskripsi produk",
    "category": "Elektronik",
    "imageUrl": "url foto produk"
  }
}
```

Response Body Error:

```json
{
  "error": "Gagal menambahkan produk. produk tidak ditemukan."
}
```

## Get Product API

Endpoint: GET /api/products/:id

Headers :

- Authorization : token

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "name": "Updated Laptop",
    "price": 109.0,
    "stock": 5,
    "description": "Updated Deskripsi produk",
    "category": "Elektronik",
    "imageUrl": "url foto produk"
  }
}
```

Response Body Error:

```json
{
  "errors": "Produk tidak valid..."
}
```

## Search Product API

Endpoint: GET /api/products/:id

Headers :

- Authorization : token

Query params :

- name : Search by name, using like, optional
- price : Search by price, using like, optional
- category : Search by category, using like, optional
- page : number of page. dafault 1
- size : size per page, default 10

Response Body Success:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Updated Laptop",
      "price": 109.0,
      "stock": 5,
      "description": "Updated Deskripsi produk",
      "category": "Elektronik",
      "imageUrl": "url foto produk"
    },
    {
      "id": 2,
      "name": "Updated Laptop",
      "price": 109.0,
      "stock": 5,
      "description": "Updated Deskripsi produk",
      "category": "Elektronik",
      "imageUrl": "url foto produk"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

Response Body Error:

```json

```

## Remove Product API

Endpoint: DELETE /api/products/:id

Headers :

- Authorization : token

Response Body Success:

```json
{
  "data": "OK"
}
```

Response Body Error:

```json
{
  "errors": "Produk tidak ditemukan"
}
```
