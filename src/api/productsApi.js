import api from '../config/axios';

export async function getProducts() {
    try {
      let url = 'api/product';
      const { data } = await api.get(url);  

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  export async function getProduct(id) {
    try {
      let url = `api/product/${id}`;
      const { data } = await api.get(url);  
      return data;
      
    } catch (error) {
      console.log(error);
    }
  }
