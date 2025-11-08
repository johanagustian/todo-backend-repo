# Menggunakan base image Node.js yang stabil
FROM node:18

WORKDIR /app

# Copy package.json dan install dependencies
# Tidak perlu lagi build-essential atau apk add
COPY package*.json ./
RUN npm install

# Copy kode sumber
COPY . .

# Configuration
ENV PORT=4000
EXPOSE 4000

# Jalankan aplikasi
CMD ["npm", "start"]