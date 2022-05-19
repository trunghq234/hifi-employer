const objectHelper = {
  renameProperty(obj: any, oldName: any, newName: string) {
    if (typeof obj !== "object") return;
    if (obj.hasOwnProperty(oldName)) {
      delete Object.assign(obj, { [newName]: obj[oldName] })[oldName];
    }
  },
};

export default objectHelper;
