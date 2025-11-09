FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=4000
EXPOSE 4000

# Jalankan aplikasi
CMD ["npm", "start"]