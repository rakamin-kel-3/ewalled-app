import { coreApi } from "..";

export const getProducts = () => {
  return coreApi.get("/products");
};

export const getProductById = (id) => {
  return coreApi.get(`/products/${id}`);
};
