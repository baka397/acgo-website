//加载依赖
import ReactDOM from 'react-dom';

//加载页面
import appRouter from './router.jsx'; //路由

//创建路由
ReactDOM.render(
  appRouter,
  document.getElementById('app')
);