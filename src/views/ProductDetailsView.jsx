
import { getProduct } from '../api/productsApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommonLayout from '../layouts/CommonLayout';
import { addToCart } from '../api/productsApi';
import { useCart } from '../context/cartContext';


export default function ProductDetailsView() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [productDescription, setProductDescription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const { cartCount, updateCart } = useCart(); // Usar el contexto
    const [showAlert, setShowAlert] = useState(false);


    const handleStorageChange = (event) => {
        setSelectedStorage(event.target.value);
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    const addProductToCart = async (id, colorCode, storageCode) => {
        try {
            await addToCart(id, colorCode, storageCode);

            const newCartCount = cartCount + 1;
            updateCart(newCartCount);
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }finally{
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }

    }

    const GetProductMobileDetails = async (id) => {
        try {
            const data = await getProduct(id);

            if (data) {

                setProduct({
                    imgUrl: data.imgUrl,
                    storageOptions: data.options.storages,
                    colorOptions: data.options.colors
                });

                const defaultColor = data.options.colors.length === 1 ? data.options.colors[0].code : null;
                const defaultStorage = data.options.storages.length === 1 ? data.options.storages[0].code : null;

                setSelectedColor(defaultColor);
                setSelectedStorage(defaultStorage);

                const filteredPropertiesProduct = {
                    Brand: data.brand,
                    Model: data.model,
                    Price: data.price + ' EUR',
                    CPU: data.cpu,
                    Ram: data.ram,
                    OS: data.os,
                    "Display Resolution": data.displayResolution,
                    Battery: data.battery,
                    "Secondary Camera": data.secondaryCmera[0] + '/' + data.secondaryCmera[1],
                    "Primary Camera": data.primaryCamera[0] + '/' + data.primaryCamera[1],
                    "Display Size": data.displaySize,
                    Weight: data.weight + ' Gr',
                };
                setProductDescription(filteredPropertiesProduct)

            }
        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            GetProductMobileDetails(id);
        }
    }, [id]);


    return (
        <>
            <CommonLayout>
                {loading ? (
                    <p>Loading product details...</p>
                ) : !product ? (
                    <p>Invalid product ID. Could not load product details.</p>
                ) : (
                    <div className='product-details d-flex justify-content-around align-items-center flex-wrap'>
                        <div className='image-details mb-4'>
                            <img width={250} src={product.imgUrl} alt={product.model} />
                        </div>
                        <div className='description-actions-details d-flex flex-column gap-4'>
                            <div className='description-details d-flex flex-column '>
                                {productDescription &&
                                    Object.entries(productDescription).map(([key, value]) => (
                                        <span key={key}>
                                            <strong>{key}:</strong> {value}
                                        </span>
                                    ))
                                }
                            </div>
                            <div className='actions-details d-flex flex-column gap-3'>
                                <div>
                                    <strong className="text-primary">COLOR</strong>
                                    <select onChange={handleColorChange} className="form-select color-options">
                                        {product.colorOptions.length > 1 && (
                                            <option value="">Seleccione color</option>
                                        )}
                                        {product.colorOptions.map((color) => (
                                            <option key={color.code} value={color.code}>
                                                {color.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <strong className="text-primary">STORAGE</strong>
                                    <select onChange={handleStorageChange} className="form-select storage-options" >
                                        {product.storageOptions.length > 1 && (
                                            <option value="">Seleccione storage</option>
                                        )}
                                        {product.storageOptions.map((storage) => (
                                            <option key={storage.code} value={storage.code}>
                                                {storage.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    disabled={!selectedColor || !selectedStorage}
                                    onClick={() => addProductToCart(id, selectedColor, selectedStorage)}
                                    type="button"
                                    className="btn btn-dark">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                )}
                 {showAlert && (
                <div className="alert alert-success mt-4" role="alert">
                    Product added to the cart
                </div>
            )}
            </CommonLayout>
        </>
    );
}
