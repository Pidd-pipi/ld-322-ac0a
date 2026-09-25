FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com && if [ -f package-lock.json ]; then npm ci --no-audit --omit=optional; else npm install --no-audit --omit=optional; fi
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm","run","start"]
