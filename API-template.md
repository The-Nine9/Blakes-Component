## Server API

### Get home info
  * GET `/homes/:id/gallery`

**Path Parameters:**
  * `id` listing id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "listing_id": "Number",
      "topHeader": {
        "sale": "Boolean",
        "pending": "Boolean",
        "new": "Boolean",
        "construction": "Boolean",
        },
    "address": "String",
    "price": "Number",
    "bed": "Number",
    "bath": "Number",
    "images": "Array",
    }
```

### Add home
  * POST `/gallery/:id/HomesData`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "listing_id": "Number",
      "topHeader": {
        "sale": "Boolean",
        "pending": "Boolean",
        "new": "Boolean",
        "construction": "Boolean",
        },
    "address": "String",
    "price": "Number",
    "bed": "Number",
    "bath": "Number",
    "images": "Array",
    }
```


### Update home info
  * Put `/gallery/:id/HomesData`

**Path Parameters:**
  * `id` home id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
     {
      "listing_id": "Number",
      "topHeader": {
        "sale": "Boolean",
        "pending": "Boolean",
        "new": "Boolean",
        "construction": "Boolean",
        },
    "address": "String",
    "price": "Number",
    "bed": "Number",
    "bath": "Number",
    "images": "Array",
    }
```

### Delete home
  * DELETE `/homes/:id/gallery`

**Path Parameters:**
  * `id` home id

**Success Status Code:** `204`

<!-- add just image CRUD -->

