# 使用官方 nginx-certbot 基底映像
FROM jonasal/nginx-certbot:5.4.0

# 確保 Let's Encrypt 憑證存放目錄持久化
VOLUME /etc/letsencrypt
VOLUME /etc/nginx/user_conf.d

# 暴露 80 和 443 端口
EXPOSE 80 443

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]
