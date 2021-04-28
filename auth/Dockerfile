From node:alpine

WORKDIR /app

COPY package.json .

RUN npm install --only=prod

# Copy the local code to the Docker Image
COPY  . .

CMD ["npm", "start"]