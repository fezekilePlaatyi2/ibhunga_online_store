import app from "../config";

class Store {
  constructor() {
    this.categoriesDocId = "cnVU1z4P0PpcLwB4Ne2W";
    this.storeRef = app.firestore().collection("ibhunga_store");
    this.storageRef = app.storage().ref();
  }

  getAllCategories = async () => {
    return this.storeRef
      .doc(this.categoriesDocId)
      .collection("categories")
      .get();
  };

  getProductsByCategoriesId = (categoryId, observer) => {
    return this.storeRef
      .doc(this.categoriesDocId)
      .collection("categories")
      .doc(categoryId)
      .collection("products")
      .onSnapshot(observer);
  };
}

export default Store;
