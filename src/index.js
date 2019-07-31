import dva from "dva";
import router from './router'
import 'antd/dist/antd.css';
import './css/index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/User.js').default);

// 4. Router
app.router(router);

// 5. Start
app.start("#root");
