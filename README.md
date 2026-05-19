# 🍳 Smart Filter

A smart recipe search and discovery platform that lets home cooks find recipes not just by title, but by **keywords, ingredients, cooking techniques, or any recipe detail**. Users can browse recipes, save bookmarks, and explore culinary possibilities with an intuitive and beautiful interface.

## ✨ Features

- 🔍 **Smart Recipe Search** - Find recipes by keywords, ingredients, techniques, and more
- 📌 **Bookmarks** - Save your favorite recipes for quick access
- 📚 **Recipe Details** - Comprehensive recipe information with ingredients and instructions
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- 🔐 **User Authentication** - Secure login and registration system
- 🏠 **Home Cooks Friendly** - Designed for everyday cooking enthusiasts

## 🛠️ Tech Stack

### Backend
- **PHP 8.4** - Latest PHP version
- **Laravel 13** - Modern web framework
- **MySQL 8.0** - Relational database
- **Laravel Sanctum** - API authentication
- **Laravel Fortify** - Authentication scaffolding
- **Laravel Socialite** - OAuth social login support

### Frontend
- **React 19** - UI library
- **Inertia.js 3** - Server-side rendered React
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS
- **GSAP 3** - Smooth animations
- **Lucide React** - Icon library

### Development & DevOps
- **Docker & Docker Compose** - Containerization
- **Laravel Sail** - Local development with Docker
- **Vite 5** - Lightning-fast build tool
- **Prettier & ESLint** - Code formatting & linting
- **PHPUnit 12** - Testing framework

## 🚀 Quick Start

### Prerequisites

- [Docker & Docker Compose](https://www.docker.com/products/docker-desktop)
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/zaidrobbani/smart-filter.git
   cd smart-filter
   ```

2. **Copy environment file**
   ```bash
   cp .env.example .env
   ```

3. **Start Docker containers**
    ## Windows od MacOS
   ```bash
   docker compose up -d --build
   ```
    ## Linux with sudo 
    ```bash
   sudo docker compose up -d --build
   ```
   
   The application will start with:
   - **App**: http://localhost:8000
   - **Frontend Dev Server (Vite)**: http://localhost:5173
   - **Database**: localhost:33060

4. **Install dependencies**
   *every time you add dependencies you must do this*
   ## Windows or MacOS
   ```bash
   docker exec smart-filter-app composer install
   docker exec smart-filter-vite npm install
   ```
   ## Linux with sudo
   ```bash
   sudo docker exec smart-filter-app composer install
   sudo docker exec smart-filter-vite npm install
   ```

5. **Generate APP_KEY**
   ## Windows or MacOS
   ```bash
   docker exec smart-filter-app php artisan key:generate
   ```
   ## Linux with sudo
   ```bash
   sudo docker exec smart-filter-app php artisan key:generate
   ```
   ## or u can do this if u prefer using compose 
   ```bash
   docker compose exec app php artisan key:generate
   ```

6. **Run database migrations**
   ## Windows or MacOS
   ```bash
   docker exec smart-filter-app php artisan migrate
   ```
   ## Linux with sudo
   ```bash
   sudo docker exec smart-filter-app php artisan migrate
   ```
   ## or u can do this if u prefer using compose
   ```bash
   sudo docker compose exec app php artisan migrate
   ```

7. **Seed the database (optional)**
   ## Windows or MacOS
   ```bash
   docker exec smart-filter-app php artisan db:seed
   ```
   ## Linux with sudo 
   ```bash
   sudo docker exec smart-filter-app php artisan db:seed
   ```

   *if u need to fresh database u can do this*
   ## Windows or MacOS
   ```bash
   docker compose exec app php artisan migrate:fresh --seed
   ```
   ## Linux with sudo 
   ```bash
   sudo docker compose exec app php artisan migrate:fresh --seed
   ```

8. **Open in browser**
   ## Application
   ```bash
   http://localhost:8000
   ```
   ## Database phpMyAdmin
   ```bash
   http://localhost:8080
   ```

## 🗄️ Database Management

### Running Migrations

```bash
# Run all pending migrations
docker exec smart-filter-app php artisan migrate

# Rollback the last batch
docker exec smart-filter-app php artisan migrate:rollback

# Reset the entire database
docker exec smart-filter-app php artisan migrate:reset

# Refresh (reset + migrate)
docker exec smart-filter-app php artisan migrate:refresh

# Refresh with seeding
docker exec smart-filter-app php artisan migrate:refresh --seed
```

### Database Credentials

The database is automatically configured in Docker:
- **Host**: mysql
- **Port**: 3306 (internal), 33060 (external)
- **Database**: smart_filter
- **User**: smart_filter
- **Password**: smart_filter

To access MySQL directly:
```bash
docker exec -it smart-filter-mysql mysql -u smart_filter -p smart_filter
```

## 📝 Available Commands

### Laravel/PHP Commands

```bash
# List all available Artisan commands
docker exec smart-filter-app php artisan list

# Run tests
docker exec smart-filter-app php artisan test

# Run tests with coverage
docker exec smart-filter-app php artisan test --coverage

# Format PHP code with Pint
docker exec smart-filter-app ./vendor/bin/pint

# Generate Wayfinder routes
docker exec smart-filter-app php artisan wayfinder:generate

# Interactive PHP shell
docker exec -it smart-filter-app php artisan tinker
```

### Node.js/Frontend Commands

```bash
# Build for production
docker exec smart-filter-vite npm run build

# Format code
docker exec smart-filter-vite npm run format

# Check formatting
docker exec smart-filter-vite npm run format:check

# Lint JavaScript/TypeScript
docker exec smart-filter-vite npm run lint

# Type checking
docker exec smart-filter-vite npm run types:check
```

### Docker Commands

```bash
# View running containers
docker compose ps

# View container logs
docker compose logs -f smart-filter-app
docker compose logs -f smart-filter-vite
docker compose logs -f smart-filter-mysql

# Stop all containers
docker compose stop

# Start all containers
docker compose start

# Remove all containers and volumes (careful!)
docker compose down -v

# Rebuild containers
docker compose rebuild
```

## 🔧 Troubleshooting

### Issue: "Port 8000 already in use"
**Solution**: Change the port in `docker-compose.yml`:
```yaml
ports:
  - "8001:80"  # Change 8000 to 8001 or any available port
```

### Issue: "Cannot read properties of undefined (reading 'default')"
**Solution**: This is typically a Vite/React issue. Clear cache and rebuild:
```bash
docker compose down
docker compose up -d
docker exec smart-filter-vite npm run build
```

### Issue: "Class 'App\...' does not exist"
**Solution**: Clear Laravel cache and regenerate autoloader:
```bash
docker exec smart-filter-app php artisan cache:clear
docker exec smart-filter-app composer dump-autoload
```

### Issue: "SQLSTATE[HY000]: General error"
**Solution**: The database might not be ready. Wait a few seconds and retry:
```bash
# Check if MySQL is healthy
docker compose logs smart-filter-mysql

# Restart just the MySQL service
docker compose restart mysql
```

### Issue: "Vite dev server not compiling"
**Solution**: Check if Node modules are properly installed:
```bash
docker exec smart-filter-vite npm install
docker exec smart-filter-vite npm run dev
```

### Issue: Migrations not running after fresh start
**Solution**: Ensure database is healthy before running migrations:
```bash
# Wait for MySQL to be ready (usually 10-15 seconds)
docker exec smart-filter-app php artisan migrate --force
```

### Issue: "File .env not found"
**Solution**: Create the .env file from example:
```bash
cp .env.example .env
docker exec smart-filter-app php artisan key:generate
```

## 📂 Project Structure

```
smart-filter/
├── app/                          # Laravel application code
│   ├── Actions/                  # Business logic actions
│   ├── Http/
│   │   ├── Controllers/          # API & web controllers
│   │   ├── Requests/             # Form request validation
│   │   └── Middleware/           # HTTP middleware
│   ├── Models/                   # Eloquent models
│   └── Policies/                 # Authorization policies
├── database/
│   ├── migrations/               # Database migrations
│   ├── factories/                # Model factories for testing
│   └── seeders/                  # Database seeders
├── resources/
│   ├── js/
│   │   ├── pages/                # Inertia page components
│   │   ├── feature/              # Feature-specific components
│   │   └── shared/               # Shared/layout components
│   ├── css/                      # Tailwind CSS files
│   └── views/                    # Blade templates
├── routes/
│   ├── web.php                   # Web routes
│   └── api.php                   # API routes
├── storage/                      # Application storage (logs, cache)
├── vendor/                       # Composer dependencies
├── node_modules/                 # NPM dependencies
├── docker-compose.yml            # Docker Compose configuration
├── Dockerfile                    # Docker image definition
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── README.md                     # This file
```

## 🚀 Deployment

For production deployment, consider using [Laravel Cloud](https://cloud.laravel.com/) for seamless hosting and auto-scaling.

## 📄 License

This project is open-source software licensed under the MIT license.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Happy Cooking! 👨‍🍳**

Made with ❤️ for home cooks who love to explore recipes.
