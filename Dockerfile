FROM registry.access.redhat.com/ubi8/ubi:8.0-122 
LABEL name="cb-nodejs10-ubi"\ 
    vendor="Anubhay" \
    version="1.0.0" \
    release="1" \
    summary="Zoom API server microservice" \
    description="Nodejs 10 Base image used by G2 Zoom API microservices"
RUN yum -y install nodejs

WORKDIR /opt/app
COPY package*.json ./
RUN npm install -g

COPY . .

EXPOSE 9099

CMD [ "node", "index" ]

