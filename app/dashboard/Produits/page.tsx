"use client"
import React, { useState } from 'react'
import AddProductForm from './AddProductForm'
import ProductList from './ProductList'
import { Tabs } from '@mantine/core'

export default function Produits() {
    const [activeTab, setActiveTab] = useState<string | null>('liste')

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestion des Produits</h1>
            
            <Tabs value={activeTab} onChange={setActiveTab} className="mb-6">
                <Tabs.List>
                    <Tabs.Tab value="liste">Liste des produits</Tabs.Tab>
                    <Tabs.Tab value="ajouter">Ajouter un produit</Tabs.Tab>
                </Tabs.List>
            </Tabs>

            <div className="grid grid-cols-1 gap-4">
                {activeTab === 'liste' ? (
                    <ProductList />
                ) : (
                    <AddProductForm />
                )}
            </div>
        </div>
    )
}

