const stringHelper = {
  capitalizeFirstLetter: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
  removeAccents: (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D"),
};

export default stringHelper;
