FROM node:latest
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
RUN mkdir -p /home/console
WORKDIR /home/console

COPY ./ /home/console
RUN npm install

EXPOSE 8000

CMD ["node", "start"]