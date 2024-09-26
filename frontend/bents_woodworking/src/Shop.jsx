import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from './components/ui/button.jsx'
import { Card, CardContent, CardFooter } from './components/ui/card.jsx'
import { Loader2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

function ProductCard({ product }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="w-full flex flex-col">
      <CardContent className="p-3 flex-grow flex flex-col">
        <div className="flex items-start mb-2">
        <img
  src={product.image || '/path/to/placeholder-image.jpg'}
  alt={product.title}
  className="w-12 h-12 object-cover rounded-md mr-2 flex-shrink-0"
  width={48}
  height={48}
/>

          <div className="flex-grow min-h-[4rem] flex flex-col">
            <h3 className="font-semibold text-sm">{product.title}</h3>
            <p className="text-xs text-gray-600 flex-grow">{product.description}</p>
          </div>
        </div>
        <div className="mt-auto">
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center text-blue-500 hover:text-blue-600 text-sm font-medium"
          >
            View Product <ExternalLink size={12} className="ml-1" />
          </a>
        </div>
      </CardContent>
      <CardFooter className="p-2">
        <div className="w-full">
          <Button
            variant="outline"
            size="sm"
            className="w-full flex justify-between items-center text-xs"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Videos
            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </Button>
          {isExpanded && (
            <div className="mt-2 space-y-1">
              {product.videoLinks && product.videoLinks.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-xs text-blue-600 hover:underline"
                >
                  Review {index + 1}
                  <ExternalLink size={10} className="ml-1" />
                </a>
              ))}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

export default function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5002/documents')
        // Assuming the backend returns an array of arrays with [id, title, tags, link]
        const formattedProducts = response.data.map(product => ({
          id: product[0],
          title: product[1],
          tags: product[2],
          link: product[3],
          image: product[4], // This should be the image data URL from the backend, // Placeholder image with reduced size
          description: `Product tags: ${product[2]}`, // Using tags as description
          videoLinks: ['https://example.com/video1', 'https://example.com/video2'] // Placeholder video links
        }))
        setProducts(formattedProducts)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch products. Please try again later.')
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500" role="alert">
        <p>{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-2 py-4 max-w-7xl">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          Recommended Products
        </h1>
      </header>

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}