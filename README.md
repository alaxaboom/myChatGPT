создать .env файл в папке server со следующим содержимым:

```
OPENAI_API_KEY=your_api_key_here
```

запустить сервер:
cd server\
npm install
npm run dev

запустить клиент:
cd client
npm install
npm run dev

можно еще запускать прям из корневой папки:
npm run dev
или для каждого отдельно:
npm run dev:server
npm run dev:client

скриншоты:
![main](/client/public/main.png)
![chat](/client/public/main2.png)
