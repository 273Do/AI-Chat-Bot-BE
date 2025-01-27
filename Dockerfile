FROM node:18

# 作業ディレクトリを引数として受け取る
ARG WORKDIR
ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0

# 作業ディレクトリを設定
WORKDIR ${HOME}

# Firebase CLIをグローバルインストール
RUN npm install -g firebase-tools

# ソースコードをコンテナ内にコピー
COPY . .

# 必要なパッケージをインストール
RUN npm install

# アプリケーションを起動する
# CMD ["npm", "start"]
