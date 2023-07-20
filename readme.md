```javascript
// tạo file config.js tại thư mục gốc
const qrAPI = 'https://api.examble/';

const QrPath = {
  socket: qrAPI,
  video: `${qrAPI}video_feed`,
  toggle: `${qrAPI}toggle_scanning`,
};

export { QrPath };
```
