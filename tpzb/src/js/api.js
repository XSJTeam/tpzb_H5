export const Fn = {
  keepAliveObject: {
  },
  isAlwaysKeep(from) { //是否一直保持缓存
    if (this.keepAliveObject[from]) {
      if (this.keepAliveObject[from].includes("alwaysKeep")) {
        return true;
      }
    }
    return false;
  },
  isKeepAliveBack(to, from) { //是否下级页面返回(这时不需要清除缓存)
    if (this.keepAliveObject[to]) {
      if (this.keepAliveObject[to].includes(from)) {
        return true;
      }
    }
    return false;
  },
  notKeepAliveFrom(keepAliveArr, from) { //离开的页面不是缓存页面的下级页面(这时需要销毁缓存页面)
    for (let i = keepAliveArr.length; i--;) {
      if (!this.keepAliveObject[keepAliveArr[i]].includes(from)) { //离开的页面不在下级页面里
        return true;
      }
    }
    return false;
  },
}
