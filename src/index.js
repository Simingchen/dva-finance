import dva from "dva";
import "./index.css";
const router = require("./router")["default"]
console.log(router)
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(router);

// 5. Start
app.start("#root");
