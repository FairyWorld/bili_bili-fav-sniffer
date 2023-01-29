FROM python:3

COPY cronjobs /etc/cron.d/my_you_get
# 把脚本运行的必备文件拷贝到 /root 目录下
COPY index.sh /root/

ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && \
    apt install -y python3-pip cron git jq ffmpeg && \
    python3 -m pip install you-get && \
    rm -rf /var/lib/apt/lists/* && \
    chmod +x /etc/cron.d/*

CMD ["cron", "-f"]
