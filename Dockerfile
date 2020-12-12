FROM node:14.15.0
RUN mkdir -p /MAIN-GALLERY
WORKDIR /MAIN-GALLERY
COPY . /MAIN-GALLERY
RUN npm i
EXPOSE 8040
CMD ["npm", "start", "run webpack"]