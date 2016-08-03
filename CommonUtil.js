/**
创建全局返回方法 参数 navigator
**/
export const naviGoBack = (navigator) => {
 if (navigator && navigator.getCurrentRoutes().length > 1) {
   navigator.pop();
   return true;
 }
 return false;
};
