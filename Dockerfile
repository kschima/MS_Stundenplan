FROM node:lts AS ui-build
WORKDIR /usr/src/app
COPY client/    /usr/src/app/client/

RUN cd client/booking-service && npm install && npm run build

# FROM node:lts AS server-build
# WORKDIR /usr/src/app
# RUN ls
# WORKDIR /usr/src/app/server
# COPY --from=ui-build /usr/src/app/client/user-service/dist ./client

# COPY server/ /usr/src/app/server

# RUN npm install
# ENV PORT=8080

# EXPOSE 8080
# EXPOSE 8181
# CMD ["npm","run", "start"]
