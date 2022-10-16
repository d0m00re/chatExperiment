FROM node:16

# app directory
#The WORKDIR command is used to define the working directory of a Docker container at any given time. 
#The command is specified in the Dockerfile.
WORKDIR /user/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9002
CMD ["npm", "start"]