import 'dotenv/config';
import app from './core/app';

const PORT = process.env.PORT! ?? 3000;

app.listen(PORT, () => {
  console.log(`🚀 API iniciada em http://localhost:${PORT}`);
});
