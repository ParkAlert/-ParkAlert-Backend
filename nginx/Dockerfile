# 使用輕量級 nginx 鏡像
FROM nginx:1.25.2

# 複製 nginx 設定檔到容器內
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露 80 埠
EXPOSE 80

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]
