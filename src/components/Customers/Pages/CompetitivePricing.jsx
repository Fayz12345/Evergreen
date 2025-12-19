import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import '../../../i18n'; // Import the i18n configuration
import DataTable from 'react-data-table-component';
import { Container,Form,  Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion'; // Import Framer Motion
const CompetitivePricing = () => {
    const { t } = useTranslation('competitivePricing'); // Load the 'navigation' namespace
    
    
    // Animation Variants
    const fadeVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };


    // Dummy data for mobile devices with Rogers and Telus prices
    // const devices = [
    //     { id: 1, model: 'iPhone 13', brand: 'Apple', price: 799, rogersPrice: 779, telusPrice: 769 },
    //     { id: 2, model: 'Galaxy S22', brand: 'Samsung', price: 699, rogersPrice: 689, telusPrice: 679 },
    //     { id: 3, model: 'Redmi Note 12', brand: 'Xiaomi', price: 99, rogersPrice: 180, telusPrice: 190 },
    // ];
    const devices = [
        { id: 1, model: 'iPhone 13', brand: 'Apple', price: 799, rogersPrice: 759, telusPrice: 769 },
        { id: 2, model: 'Galaxy S22', brand: 'Samsung', price: 699, rogersPrice: 799, telusPrice: 689 },
        { id: 3, model: 'Pixel 7', brand: 'Google', price: 599, rogersPrice: 479, telusPrice: 589 },
        { id: 4, model: 'OnePlus 11', brand: 'OnePlus', price: 699, rogersPrice: 649, telusPrice: 659 },
        { id: 5, model: 'iPhone 12', brand: 'Apple', price: 599, rogersPrice: 580, telusPrice: 590 },
        { id: 6, model: 'Galaxy S21', brand: 'Samsung', price: 649, rogersPrice: 630, telusPrice: 640 },
        { id: 7, model: 'Pixel 6a', brand: 'Google', price: 399, rogersPrice: 370, telusPrice: 380 },
        { id: 8, model: 'Xiaomi Mi 11', brand: 'Xiaomi', price: 549, rogersPrice: 520, telusPrice: 530 },
        { id: 9, model: 'Moto G Power', brand: 'Motorola', price: 249, rogersPrice: 230, telusPrice: 240 },
        { id: 10, model: 'Redmi Note 12', brand: 'Xiaomi', price: 199, rogersPrice: 180, telusPrice: 190 },
    ];
    const [searchTerm, setSearchTerm] = useState('');

    // Filter devices based on the search term
    const filteredDevices = devices.filter((device) =>
        device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to get color for a value within a row
    const getTextColorWithinRow = (value, prices) => {
        const minValue = Math.min(...prices);
        const maxValue = Math.max(...prices);

        if (value === maxValue) return 'green'; // Highest value in the row
        if (value === minValue) return 'red';   // Lowest value in the row
        return 'orange'; // Middle value in the row
    };

    // Columns for the DataTable
    const columns = [
        { name: 'Model', selector: (row) => row.model, sortable: true },
        { name: 'Brand', selector: (row) => row.brand, sortable: true },
        {
            name: 'Price ($)',
            selector: (row) => row.price,
            sortable: true,
            cell: (row) => (
                <span
                    style={{
                        color: getTextColorWithinRow(row.price, [row.price, row.rogersPrice, row.telusPrice]),
                    }}
                >
                    ${row.price}
                </span>
            ),
        },
        {
            name: 'Rogers Price ($)',
            selector: (row) => row.rogersPrice,
            sortable: true,
            cell: (row) => (
                <span
                    style={{
                        color: getTextColorWithinRow(row.rogersPrice, [row.price, row.rogersPrice, row.telusPrice]),
                    }}
                >
                    ${row.rogersPrice}
                </span>
            ),
        },
        {
            name: 'Telus Price ($)',
            selector: (row) => row.telusPrice,
            sortable: true,
            cell: (row) => (
                <span
                    style={{
                        color: getTextColorWithinRow(row.telusPrice, [row.price, row.rogersPrice, row.telusPrice]),
                    }}
                >
                    ${row.telusPrice}
                </span>
            ),
        },
    ];

    return (
        <>
        <section className="slider text-white bg-dark py-5 mt-5">
        <Container>
            <Row className="justify-content-center text-center mt-5">
                <Col lg={9} md={12}>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeVariants}
                    >
                        <h1 className="animated fadeInUp mb-3 mt-5 text-white">{t('title')}</h1>
                        <p className="lead text-white mb-4">
                        {t('description')}
                        </p>
                    </motion.div>
                </Col>
            </Row>
        </Container>
    </section>

        <Container fluid="xl"  className="py-4" >
        <div style={{ padding: '20px' }}>
       
        
         
           {/* Search Input */}
           <Form.Group controlId="search" className="mb-4">
                <Form.Control
                    type="text"
                    placeholder={t('search_placeholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-3"
                />
            </Form.Group>

            {/* DataTable */}
            <DataTable
                title={t('mobile_devices')}
                columns={columns}
                data={filteredDevices}
                pagination
                highlightOnHover
                responsive
            />
        </div>
        </Container>
        </>
    );
};

export default CompetitivePricing;
