import api from '../config/axios';

export async function getProducts() {
    try {
      let url = '/product';
      const { data } = await api.get(url);  

      return data;
    } catch (error) {
      console.log(error);
    }
  }
