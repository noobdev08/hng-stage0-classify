# HNG Stage 0 — Name Classification API

A REST API endpoint that classifies a name's gender using the [Genderize.io](https://genderize.io) API, with custom processing and confidence scoring.

## Live URL

```
hng-stage0-classify-production.up.railway.app
```

## Endpoint

### `GET /api/classify`

**Query Parameters**

| Parameter | Type   | Required | Description        |
|-----------|--------|----------|--------------------|
| `name`    | string | Yes      | The name to classify |

**Success Response `200`**

```json
{
  "status": "success",
  "data": {
    "name": "james",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 1234,
    "is_confident": true,
    "processed_at": "2026-04-10T14:30:00Z"
  }
}
```

**Error Responses**

| Status | Reason |
|--------|--------|
| `400`  | Missing or empty `name` parameter |
| `422`  | `name` is not a valid string |
| `500`  | Internal server error |
| `502`  | Upstream Genderize API error |

```json
{ "status": "error", "message": "<description>" }
```

## Local Setup

```bash
git clone https://github.com/your-username/hng-stage0-classify
cd hng-stage0-classify
npm install
npm run dev
```

Runs on `http://localhost:3000`

## Stack

- Node.js + Express
- Axios
- Deployed on Railway
