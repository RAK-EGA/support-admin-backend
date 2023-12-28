FROM node:17-alpine
 
WORKDIR /supportbackend
 
COPY . .
 
RUN npm install
 
EXPOSE 3000
 
CMD ["node","index.js"]