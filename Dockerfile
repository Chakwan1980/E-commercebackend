# Usa una imagen base de Node.js
FROM node:22-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias primero
COPY package*.json /app/

# Instala las dependencias de Node.js
RUN npm install --legacy-peer-deps



# Luego copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto en el que corre la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]
