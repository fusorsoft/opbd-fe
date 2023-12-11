FROM nginx
COPY dist /usr/share/nginx/html
COPY assets/images /usr/share/nginx/html/images
COPY nginx.conf /etc/nginx
RUN rm -f /usr/share/nginx/html/index.html
