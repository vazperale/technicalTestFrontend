import { getProduct } from '../api/productsApi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommonLayout from '../layouts/CommonLayout';
import { addToCart } from '../api/productsApi';
import { useCart } from '../context/cartContext';
import ProductDetails from '../components/ProductDetails';

export default function ProductDetailsView() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [productDescription, setProductDescription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedStorage, setSelectedStorage] = useState("");
    const { cartCount, updateCart } = useCart();
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
        } finally {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    };

    const GetProductMobileDetails = async (id) => {
        try {
            let data;

            if (
                !localStorage.getItem(`PDP_${id}`) ||
                new Date() > new Date(localStorage.getItem(`expiration_cache_pdp_${id}_data_time`))
            ) {
                data = await getProduct(id);
                if (data) {
                    const expirationTime = new Date(new Date().setHours(new Date().getHours() + 1));
                    localStorage.setItem(`PDP_${id}`, JSON.stringify(data));
                    localStorage.setItem(`expiration_cache_pdp_${id}_data_time`, expirationTime.toString());
                }
            } else {
                data = JSON.parse(localStorage.getItem(`PDP_${id}`));
            }

            if (data) {
                updateStateWithProductData(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateStateWithProductData = (data) => {
        setProduct({
            imgUrl: data.imgUrl,
            storageOptions: data.options.storages,
            colorOptions: data.options.colors,
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
            "Secondary Camera": data.secondaryCmera[0] + ' ' + data.secondaryCmera[1],
            "Primary Camera": data.primaryCamera[0] + ' ' + data.primaryCamera[1],
            "Display Size": data.displaySize,
            Weight: data.weight? data.weight + ' Gr' :'NS',
        };
        setProductDescription(filteredPropertiesProduct);
    };

    useEffect(() => {
        GetProductMobileDetails(id);
    }, [id]);

    return (
        <>
            <CommonLayout>
                {loading ? (
                    <p>Loading product details...</p>
                ) : (
                    <ProductDetails
                        product={product}
                        productDescription={productDescription}
                        handleColorChange={handleColorChange}
                        handleStorageChange={handleStorageChange}
                        addProductToCart={addProductToCart}
                        selectedColor={selectedColor}
                        selectedStorage={selectedStorage}
                        id={id}
                        showAlert={showAlert}
                    />
                )}
            </CommonLayout>
        </>
    );
}
