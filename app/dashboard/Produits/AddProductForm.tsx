"use client"
import React, { useState, useEffect } from 'react'
import { Card, Text, Button, Container, Image as MantineImage } from '@mantine/core'
import { IconBrandTelegram, IconCheck, IconX } from '@tabler/icons-react'
import "../NavbarSimpleColored.module.css";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { OutputCollectionState, OutputCollectionStatus } from '@uploadcare/react-uploader';



function AddProductForm() {
    const [tailles, setTailles] = useState<string[]>([])
    const [couleurs, setCouleurs] = useState<string[]>([])
    const [codeProduit, setCodeProduit] = useState("")
    const [nomProduit, setNomProduit] = useState("")
    const [descriptionProduit, setDescriptionProduit] = useState("")
    const [prix, setPrix] = useState("")
    const [typeVente, setTypeVente] = useState("")
    const [devise] = useState("FCFA")
    const [qte, setQte] = useState("")
    const [date, setDate] = useState("")
    const [] = useState("")
    const [category, setCategory] = useState("")
    const [collection, setCollection] = useState("")
    const [, setImageUrl] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [load, setLoad] = useState(false)
    const [message, setMessage] = useState("")
    const [user] = useState(localStorage.getItem("usersInfos")) || null
    
    const [namestore, setNamestore] = useState("")
    const[files,setFiles]= useState("")
    
    const recupimage=(e:OutputCollectionState<OutputCollectionStatus, "maybe-has-group">)=>{
        if(e.allEntries[0].uuid && e.allEntries[0].cdnUrl){
            setFiles(e.allEntries[0].cdnUrl!)
        }
    }



    useEffect(() => {

    }, [])

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoad(true)
        setMessage("")
    
        // Validate required fields
        if (!nomProduit || !codeProduit || !prix || !qte || !category || !typeVente || !date) {
            setMessage("Veuillez remplir tous les champs obligatoires")
            setLoad(false)
            return
        }
    
        try {
            if (files && files && files !== undefined && files !== "") {
                const data = { 
                    nomProduit, 
                    codeProduit, 
                    descriptionProduit, 
                    prix, 
                    namestore, 
                    devise, 
                    qte, 
                    date, 
                    photo: files,
                    tailles, 
                    couleurs, 
                    typeVente, 
                    category, 
                    collection
                }
                const req = await fetch("/api/product-routes/add-product", {
                    headers: { "Content-type": "application/json" },
                    method: "POST",
                    body: JSON.stringify(data)
                })
    
                const res = await req.json()
                console.log(res)
                if (res && res.data) {
                    localStorage.setItem("product", JSON.stringify(res.data))
                    setMessage("Article ajouté avec succès")
                    // Reset all form fields
                    setNomProduit("")
                    setCodeProduit("")
                    setDescriptionProduit("")
                    setPrix("")
                    setNamestore("")
                    setQte("")
                    setDate("")
                    setTailles([])
                    setCouleurs([])
                    setTypeVente("")
                    setCategory("")
                    setCollection("")
                    setFiles("")
                    setImageUrl("")
                    setImagePreview("")
                    setUploadStatus('idle')
                    console.log(res)
                } else {
                    setMessage("Données non trouvées")
                }
            } else {
                setMessage("Photo du produit requise")
            }
        } catch (error) {
            console.log(error)
            setMessage("Erreur lors de l'ajout du produit")
        } finally {
            setLoad(false)
        }
    }

    return (
        <Container size="lg" className="px-4">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Ajouter un Nouveau Produit</h2>
                <p className="text-gray-600 mt-2">Veuillez remplir les informations ci-dessous pour ajouter votre produit.</p>
            </div>

            {!user && (
                <Card shadow="sm" padding="lg" radius="md" withBorder className="mb-8 bg-yellow-50">
                    <Text color="orange" className="text-center font-medium">
                        Vous devez être connecté pour ajouter un produit. Veuillez vous connecter d&lsquo;abord.
                    </Text>
                </Card>
            )}

            {/* Form */}
            <form onSubmit={submitForm}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Information de base */}
                    <Card shadow="sm" padding="lg" radius="md" withBorder className="flex flex-col space-y-6">
                        <h4 className="text-xl font-semibold text-gray-800">Informations de base</h4>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="produit" className="block text-sm font-medium text-gray-600">Nom du produit</label>
                                <input
                                    type="text"
                                    id="produit"
                                    className="form-input p-3 w-full border-gray-300 rounded-md shadow-sm"
                                    placeholder="Entrer le nom du produit"
                                    value={nomProduit}
                                    onChange={(e) => setNomProduit(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="code" className="block text-sm font-medium text-gray-600">Code du produit</label>
                                <input
                                    type="text"
                                    id="code"
                                    className="form-input p-3 w-full border-gray-300 rounded-md shadow-sm"
                                    placeholder="Entrer le code du produit"
                                    value={codeProduit}
                                    onChange={(e) => setCodeProduit(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description produit</label>
                                <textarea
                                    id="description"
                                    rows={3}
                                    className="form-input p-3 w-full border-gray-300 rounded-md shadow-sm"
                                    placeholder="Ajouter une brève description"
                                    value={descriptionProduit}
                                    onChange={(e) => setDescriptionProduit(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="prix" className="block text-sm font-medium text-gray-600">Prix</label>
                                <input
                                    type="number"
                                    id="prix"
                                    className="form-input p-3 w-full border-gray-300 rounded-md shadow-sm"
                                    placeholder="Entrer le prix du produit"
                                    value={prix}
                                    onChange={(e) => setPrix(e.target.value)}
                                    min="0"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="qte" className="block text-sm font-medium text-gray-600">Quantité</label>
                                <input
                                    type="number"
                                    id="qte"
                                    className="form-input p-3 w-full border-gray-300 rounded-md shadow-sm"
                                    placeholder="Entrer la quantité disponible"
                                    value={qte}
                                    onChange={(e) => setQte(e.target.value)}
                                    min="0"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="namestore" className="block text-sm font-medium text-gray-600">Nom de la boutique</label>
                                <input
                                    type="text"
                                    id="namestore"
                                    className="form-input p-3 w-full border-gray-300 rounded-md shadow-sm"
                                    placeholder="Entrer le nom de votre boutique"
                                    value={namestore}
                                    onChange={(e) => setNamestore(e.target.value)}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Image produit */}
                    <Card shadow="sm" padding="lg" radius="md" withBorder className="flex flex-col space-y-6">
                        <h4 className="text-xl font-semibold text-gray-800">Ajoutez une image</h4>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 transition-all hover:border-blue-500">
                            <FileUploaderRegular
                                pubkey="355e496a54a373c0bbd2"
                                onChange={event => {
                                    if (event.status === 'uploading') {
                                        setUploadStatus('uploading');
                                    } else if (event.status === 'failed') {
                                        setUploadStatus('error');
                                    } else if (event.successEntries.length > 0) {
                                        const fileInfo = event.successEntries[0];
                                        const avifUrl = `${fileInfo.fileInfo.cdnUrl}/-/format/avif/-/quality/smart/`;
                                        setImageUrl(avifUrl);
                                        setImagePreview(fileInfo.fileInfo.cdnUrl);
                                        setFiles(fileInfo.fileInfo.cdnUrl); //Définir l'état des fichiers avec l'URL CDN
                                        setUploadStatus('success');
                                    }
                                    recupimage(event); // Appelez la fonction recupimage pour vous assurer que l'état des fichiers est mis à jour
                                }}
                                maxLocalFileSizeBytes={10 * 1024 * 1024}
                                imageShrink="1024x1024"
                                accept="image/*"
                                className="uploadcare-uploader"
                            />
                        </div>
                        
                        {/* Image Preview Section */}
                        <div className="mt-4">
                            {uploadStatus === 'uploading' && (
                                <div className="flex items-center justify-center p-4 bg-blue-50 rounded-md">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
                                    <Text>Téléchargement en cours...</Text>
                                </div>
                            )}
                            
                            {uploadStatus === 'error' && (
                                <div className="flex items-center p-4 bg-red-50 rounded-md">
                                    <IconX size={20} className="text-red-500 mr-2" />
                                    <Text color="red">Erreur lors du téléchargement. Veuillez réessayer.</Text>
                                </div>
                            )}
                            
                            {uploadStatus === 'success' && imagePreview && (
                                <div className="relative">
                                    <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                                        <IconCheck size={16} />
                                    </div>
                                    <MantineImage
                                        src={imagePreview}
                                        alt="Aperçu du produit"
                                        radius="md"
                                        className="w-full h-64 object-cover rounded-md shadow-sm"
                                    />
                                </div>
                            )}
                        </div>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder className="flex flex-col space-y-6">
                        <h4 className="text-xl font-semibold text-gray-800">Tailles et Couleurs</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Tailles disponibles</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                        <label key={size} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                value={size}
                                                checked={tailles.includes(size)}
                                                onChange={(e) => {
                                                    setTailles(prev =>
                                                        e.target.checked
                                                            ? [...prev, size]
                                                            : prev.filter(s => s !== size)
                                                    )
                                                }}
                                                className="form-checkbox h-4 w-4 text-blue-600"
                                            />
                                            <span className="text-sm text-gray-700">{size}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Couleurs disponibles</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Noir', 'Blanc', 'Rouge', 'Bleu', 'Vert', 'Jaune', 'Rose', 'Gris'].map((color) => (
                                        <label key={color} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                value={color}
                                                checked={couleurs.includes(color)}
                                                onChange={(e) => {
                                                    setCouleurs(prev =>
                                                        e.target.checked
                                                            ? [...prev, color]
                                                            : prev.filter(c => c !== color)
                                                    )
                                                }}
                                                className="form-checkbox h-4 w-4 text-blue-600"
                                            />
                                            <span className="text-sm text-gray-700">{color}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                    {/* Type de vente et Date */}
                    <Card shadow="sm" padding="lg" radius="md" withBorder className="flex flex-col space-y-6">
                        <h4 className="text-xl font-semibold text-gray-800">Type de vente et Date</h4>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="typeVente" className="block text-sm font-medium text-gray-600">Type de vente</label>
                                <select
                                    id="typeVente"
                                    className="form-select p-3 w-full border-gray-300 rounded-md shadow-sm"
                                    onChange={(e) => setTypeVente(e.target.value)}
                                    value={typeVente}
                                >
                                    <option value="">Sélectionner un type de vente</option>
                                    <option value="1">Vente en détail</option>
                                    <option value="2">Vente en gros</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-600">Date de publication</label>
                                <input
                                    type="date"
                                    id="date"
                                    className="form-input p-3 w-full border-gray-300 rounded-md shadow-sm"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Catégorie et Collection */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <Card shadow="sm" padding="lg" radius="md" withBorder className="flex flex-col space-y-6">
                        <h4 className="text-xl font-semibold text-gray-800">Catégorie</h4>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-600">Catégorie du produit</label>
                                <select
                                    id="category"
                                    className="form-select p-3 w-full border-gray-300 rounded-md shadow-sm"
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={category}
                                >
                                    <option value="">Sélectionner une catégorie</option>
                                    <option value="Hommes">Hommes</option>
                                    <option value="Femmes">Femmes</option>
                                    <option value="Enfants">Enfants</option>
                                </select>
                            </div>
                        </div>
                    </Card>

                    <Card shadow="sm" padding="lg" radius="md" withBorder className="flex flex-col space-y-6">
                        <h4 className="text-xl font-semibold text-gray-800">Collection</h4>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="collection" className="block text-sm font-medium text-gray-600">Collection du produit</label>
                                <select
                                    id="collection"
                                    className="form-select p-3 w-full border-gray-300 rounded-md shadow-sm"
                                    onChange={(e) => setCollection(e.target.value)}
                                    value={collection}
                                >
                                    <option value="">Sélectionner une collection</option>
                                    <option value="Printemps">Printemps</option>
                                    <option value="Été">Été</option>
                                    <option value="Automne">Automne</option>
                                    <option value="Hiver">Hiver</option>
                                </select>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Soumission du formulaire */}
                <div className="mt-8 text-center">
                    <Button
                        type="submit"
                        className={`w-full ${load ? 'bg-blue-400' : 'bg-blue-600'} text-white py-3 px-6 rounded-full font-semibold`}
                        loading={load}
                        disabled={load}
                    >
                        {load ? 'Traitement en cours...' : 'Ajouter un produit'} <IconBrandTelegram size={24} className="ml-2" />
                    </Button>
                </div>

                {/* Message de retour */}
                {message && <div className="mt-6 text-center"><p className="text-sm font-semibold text-red-500">{message}</p></div>}
            </form>
        </Container>
    )
}

export default AddProductForm