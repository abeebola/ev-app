// import config from "./../config";
// import localForage from "localforage";

// localForage.config(config.dbConfig);

// export default localForage;

const db = {
  get(key) {
    const val = localStorage.getItem(key);
    if (!val) return null;

    return JSON.parse(val);
  },
  save(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
};

export default db;
