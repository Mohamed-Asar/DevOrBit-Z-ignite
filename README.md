# DevOrBit-Z-Ignite Docker Setup

This repository contains the Docker environment for the DevOrBit-Z-Ignite application, which consists of Laravel and a Vite development server.

Follow these instructions to set up and run the application correctly using Docker.

## Environment Configuration

✅ **Laravel `.env` (CRITICAL)**

Ensure your `.env` file uses the following database configuration so the `app` container can correctly route to the `db` container:

```dotenv
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=root
```

❌ **Never use `localhost` or `127.0.0.1`** as the `DB_HOST` in this Docker setup.

---

## 🚀 Getting Started

### 1. Build and Start Containers

✅ **Rebuild Everything (MANDATORY)**

Because the Dockerfile configures the underlying image, always build with the `--no-cache` flag the first time or if the `Dockerfile` changes:

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

**Verify the build:** Check that your containers are running successfully.

```bash
docker ps
```

You should see these containers up and running:
* ✔ `laravel_app`
* ✔ `laravel_web`
* ✔ `laravel_db`

### 2. First-Time Laravel Setup

Run the following commands to install dependencies, generate your application key, and migrate the database.

**Install PHP dependencies:**
```bash
docker-compose exec app composer install
```

**Generate application key:**
```bash
docker-compose exec app php artisan key:generate
```

**Run database migrations:**
```bash
docker-compose exec app php artisan migrate
```

### 3. Run Vite (Correct Way)

To run the Vite development server with Hot Module Replacement (HMR) within the Docker container:

```bash
docker-compose exec app npm install
docker-compose exec app npm run dev
```
---

## 🌐 Accessing the App

Once everything is running, access your application using the following URLs:

* **Laravel Application:** `http://localhost:8000`
* **Vite Dev Server (Assets):** `http://localhost:5173`
