FROM node:18
ARG WORKDIR
ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0
WORKDIR ${HOME}

RUN npm install -g firebase-tools

# CMD ["/bin/sh"]