import React, { useState, useEffect } from 'react';
import Category from "./Category.jsx";

const Vocabulary = () => {
    // Kategoriler ve ürünler için örnek veri
    const [categories, setCategories] = useState([
        { title: 'Animals', words: ['Dog', 'Cat', 'Bird'] },
        { title: 'Colors', words: ['Red', 'Blue', 'Green'] },
    ]);

    const [products, setProducts] = useState([
        { name: 'Book' },
        { name: 'Pen' },
        { name: 'Laptop' },
    ]);

    // useEffect ile API'den veri çekme işlemleri burada olabilir

    return (
        <div>
            <h1>Vocabulary</h1>
            <Category title="Categories"/>
        </div>
    );
};

export default Vocabulary;
