# Stage 1
FROM node:12.8-alpine AS react-build
WORKDIR /app
COPY . ./
RUN yarn install
RUN yarn bundle

# Stage 2 - create image with build data
FROM bitnami/nginx:1.16.1
COPY nginx.conf /opt/bitnami/nginx/conf/nginx.conf
COPY src/help/R30/WebHelp /opt/bitnami/nginx/html/help
COPY --from=react-build /app/build /opt/bitnami/nginx/html

COPY --from=react-build /app/build/static /opt/bitnami/nginx/html/static/version/0.1.0/static
COPY entrypoint.sh /opt/bitnami/nginx/html
#Need to have root permission to change file permission
USER 0
RUN sudo chmod -R 777 /opt/bitnami/nginx/html
#Reverting to non-root user
USER 1001
EXPOSE 8080
CMD /opt/bitnami/nginx/html/entrypoint.sh
