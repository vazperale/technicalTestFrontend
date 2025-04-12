import React from 'react';
import SelectComponent from './SelectComponent';
import AddToCartButton from './AddToCartButton';
import AlertNotification from './AlertNotification';

export default function ProductDetails ({
  product,
  productDescription,
  handleColorChange,
  handleStorageChange,
  addProductToCart,
  selectedColor,
  selectedStorage,
  id,
  showAlert
}) {
  if (!product) {
    return <p>Invalid product ID. Could not load product details.</p>;
  }

  return (
    <>
      <div className='product-details d-flex justify-content-around align-items-center flex-wrap'>
        <div className='image-details mb-4'>
          <img width={250} src={product.imgUrl} alt={product.model} />
        </div>
        <div className='description-actions-details d-flex flex-column gap-4'>
          <div className='description-details d-flex flex-column '>
            {productDescription &&
              Object.entries(productDescription).map(([key, value]) => (
                <span key={key}>
                  <strong>{key}:</strong> {value || "NS"}
                </span>
              ))}
          </div>
          <div className='actions-details d-flex flex-column gap-3'>

        <SelectComponent
          options={product.colorOptions}
          selectedValue={selectedColor}
          handleChange={handleColorChange}
          label="Color"
          placeholder="color"
        />

        <SelectComponent
          options={product.storageOptions}
          selectedValue={selectedStorage}
          handleChange={handleStorageChange}
          label="Storage"
          placeholder="storage"
        />
            <AddToCartButton
              disabled={!selectedColor || !selectedStorage}
              onClick={() => addProductToCart(id, selectedColor, selectedStorage)}
            />
          </div>
        </div>
      </div>
      <AlertNotification showAlert={showAlert} />
    </>
  );
}
