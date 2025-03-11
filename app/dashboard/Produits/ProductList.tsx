"use client"
import React, { useEffect, useState } from 'react'
import { Card, Table, Badge, Button, Group, Text, ActionIcon, Menu, Loader, Grid, SimpleGrid, Modal } from '@mantine/core'
import { IconDotsVertical, IconEdit, IconTrash, IconEye } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Product {
  id: string
  nomProduit: string
  codeProduit: string
  prix: number
  devise: string
  qte: number
  typeVente: string
  date: string
  descriptionProduit: string
  imageUrl?: string
  category?: string
  collection?: string
  createdAt: string
  tailles?: string[]
  couleurs?: string[]
}

export default function ProductList() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products')
      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setProducts(data.products || [])
    } catch (err) {
      console.error('Erreur lors de la récupération des produits:', err)
      setError('Données du produit non disponibles')
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (productId: string) => {
    router.push(`/dashboard/Produits/${productId}`)
  }

  const handleEdit = (productId: string) => {
    router.push(`/dashboard/Produits/edit/${productId}`)
  }

  const handleDelete = async () => {
    if (!selectedProduct) return

    try {
      setDeleteLoading(true)
      const response = await fetch(`/api/products/${selectedProduct.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression')
      }

      setProducts(products.filter(p => p.id !== selectedProduct.id))
      setDeleteModalOpen(false)
    } catch (err) {
      console.error('Erreur lors de la suppression:', err)
    } finally {
      setDeleteLoading(false)
      setSelectedProduct(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const getTypeVente = (type: string) => {
    return type === '1' ? 'Détail' : 'Gros'
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="lg" />
        <Text ml="md">Chargement des produits...</Text>
      </div>
    )
  }

  if (error) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-4">
        <Text color="red" className="text-center">
          {error}
        </Text>
      </Card>
    )
  }

  const renderGridView = () => (
    <SimpleGrid cols={3} spacing="lg" verticalSpacing="xl">
      {products.map((product) => (
        <Card key={product.id} shadow="sm" padding="lg" radius="md" withBorder className="hover:shadow-lg transition-shadow duration-200">
          <Card.Section>
            {product.imageUrl && (
              <div className="relative w-full h-48">
                <Image
                  src={product.imageUrl}
                  alt={product.nomProduit}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/images/placeholder.png'
                  }}
                />
              </div>
            )}
          </Card.Section>

          <Text fw={500} size="lg" mt="md" className="cursor-pointer hover:text-blue-600"
                onClick={() => handleViewDetails(product.id)}>
            {product.nomProduit}
          </Text>

          <Text size="sm" color="dimmed">
            {product.category || 'Non catégorisé'}
          </Text>

          <Group justify="space-between" mt="md">
            <Text fw={500} size="lg">
              {product.prix.toLocaleString()} {product.devise}
            </Text>
            <Badge color={product.qte > 0 ? 'green' : 'red'} variant="light">
              Stock: {product.qte}
            </Badge>
          </Group>

          <Group mt="md" style={{ justifyContent: 'flex-end' }}>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon>
                  <IconDotsVertical size={16} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item 
                  leftSection={<IconEye size={14} />}
                  onClick={() => handleViewDetails(product.id)}
                >
                  Voir les détails
                </Menu.Item>
                <Menu.Item 
                  leftSection={<IconEdit size={14} />}
                  onClick={() => handleEdit(product.id)}
                >
                  Modifier
                </Menu.Item>
                <Menu.Item 
                  leftSection={<IconTrash size={14} />} 
                  color="red"
                  onClick={() => {
                    setSelectedProduct(product)
                    setDeleteModalOpen(true)
                  }}
                >
                  Supprimer
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Card>
      ))}
    </SimpleGrid>
  )

  const renderTableView = () => (
    <div className="overflow-x-auto">
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Nom du produit</th>
            <th>Code</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Type de vente</th>
            <th>Date d'ajout</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="flex items-center cursor-pointer" onClick={() => handleViewDetails(product.id)}>
                  {product.imageUrl && (
                    <div className="relative w-10 h-10 mr-3">
                      <Image
                        src={product.imageUrl}
                        alt={product.nomProduit}
                        fill
                        sizes="40px"
                        style={{
                          objectFit: 'cover',
                          borderRadius: '0.375rem'
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/images/placeholder.png'
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <Text fw={500} className="hover:text-blue-600">{product.nomProduit}</Text>
                    <Text size="xs" color="dimmed">
                      {product.category || 'Non catégorisé'}
                    </Text>
                  </div>
                </div>
              </td>
              <td>{product.codeProduit}</td>
              <td>
                {product.prix.toLocaleString()} {product.devise}
              </td>
              <td>
                <Badge color={product.qte > 0 ? 'green' : 'red'} variant="light">
                  {product.qte}
                </Badge>
              </td>
              <td>{getTypeVente(product.typeVente)}</td>
              <td>{formatDate(product.createdAt)}</td>
              <td>
                <Group className="justify-end">
                  <Menu shadow="md" width={200} position="bottom-end">
                    <Menu.Target>
                      <ActionIcon>
                        <IconDotsVertical size={16} />
                      </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item 
                        leftSection={<IconEye size={14} />}
                        onClick={() => handleViewDetails(product.id)}
                      >
                        Voir les détails
                      </Menu.Item>
                      <Menu.Item 
                        leftSection={<IconEdit size={14} />}
                        onClick={() => handleEdit(product.id)}
                      >
                        Modifier
                      </Menu.Item>
                      <Menu.Item 
                        leftSection={<IconTrash size={14} />} 
                        color="red"
                        onClick={() => {
                          setSelectedProduct(product)
                          setDeleteModalOpen(true)
                        }}
                      >
                        Supprimer
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <Text size="xl" fw={700}>
            Derniers Produits Ajoutés
          </Text>
          <Group>
            <Button
              variant="light"
              color={viewMode === 'grid' ? 'blue' : 'gray'}
              onClick={() => setViewMode('grid')}
            >
              Grille
            </Button>
            <Button
              variant="light"
              color={viewMode === 'table' ? 'blue' : 'gray'}
              onClick={() => setViewMode('table')}
            >
              Tableau
            </Button>
          </Group>
        </div>

        {products.length === 0 ? (
          <Text className="py-8 text-center text-gray-500">
            Aucun produit n'a été ajouté pour le moment.
          </Text>
        ) : viewMode === 'grid' ? (
          renderGridView()
        ) : (
          renderTableView()
        )}
      </Card>

      <Modal
        opened={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setSelectedProduct(null)
        }}
        title="Confirmer la suppression"
        centered
      >
        <Text size="sm" mb="lg">
          Êtes-vous sûr de vouloir supprimer le produit "{selectedProduct?.nomProduit}" ?
          Cette action est irréversible.
        </Text>
        <Group justify="flex-end">
          <Button
            variant="light"
            onClick={() => {
              setDeleteModalOpen(false)
              setSelectedProduct(null)
            }}
          >
            Annuler
          </Button>
          <Button
            color="red"
            loading={deleteLoading}
            onClick={handleDelete}
          >
            Supprimer
          </Button>
        </Group>
      </Modal>
    </>
  )
}