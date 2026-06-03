import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Header from '../components/Header'

function ProductModal({ product, onClose, onUpdated, canEdit }) {
  const [editing, setEditing] = useState(false)
  const [desc, setDesc] = useState(product.desc_product)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      await axios.put(
        import.meta.env.VITE_API_URL + `/api/products/${product.product_id}`,
        { desc_product: desc }
      )
      onUpdated(product.product_id, desc)
      setEditing(false)
    } catch (err) {
      setError('Error al guardar, intenta de nuevo')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-[500px] shadow-xl flex flex-col gap-5"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={product.image_link}
          alt={product.name_product}
          className="w-full h-40 md:h-52 object-contain rounded-xl bg-[#f5f5f5] p-4"
        />

        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#9B0032] mb-2">{product.name_product}</h2>
          {editing ? (
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-[#bebebe] rounded-lg text-sm text-gray-700 outline-none resize-none"
            />
          ) : (
            <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
          )}
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>

        {canEdit && !editing && (
          <button onClick={() => setEditing(true)} className="self-start text-[#003e7e] text-sm underline cursor-pointer">
            Edit description
          </button>
        )}

        <div className="flex gap-3">
          {editing ? (
            <>
              <button onClick={() => { setEditing(false); setDesc(product.desc_product) }}
                className="flex-1 py-2.5 border border-[#bebebe] rounded-[20px] text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 py-2.5 rounded-[20px] bg-[#003e7e] hover:bg-[#003e7e80] text-sm text-white cursor-pointer transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : 'Save'}
              </button>
            </>
          ) : (
            <>
              <button onClick={onClose}
                className="flex-1 py-2.5 border border-[#bebebe] rounded-[20px] text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
                Close
              </button>
              <a href={product.html_link} target="_blank" rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-[20px] bg-[#003e7e] hover:bg-[#003e7e80] text-sm text-white text-center cursor-pointer transition-colors">
                More information
              </a>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

function Products() {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [error, setError] = useState('')

  const permisos = JSON.parse(localStorage.getItem('permisos') || '{}')
  const canEdit = permisos.edit_products === true
  const eventLogged = useRef(false)
  useEffect(() => {
    if (eventLogged.current) return
    eventLogged.current = true

    const token = localStorage.getItem('token')
    if (token) {
      axios.post(import.meta.env.VITE_API_URL + '/api/events/product-view', {}, {
        headers: { Authorization: `Bearer ${token}` }
      }).catch(err => console.log('Event log error:', err))
    }
    
    axios.get(import.meta.env.VITE_API_URL + '/api/products')
      .then(res => setProducts(res.data))
      .catch(() => setError('No se pudieron cargar los productos'))
  }, [])

  const handleUpdated = (product_id, newDesc) => {
    setProducts(prev =>
      prev.map(p => p.product_id === product_id ? { ...p, desc_product: newDesc } : p)
    )
    setSelectedProduct(prev => ({ ...prev, desc_product: newDesc }))
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    const token = localStorage.getItem('token')
    if (token) {
      axios.post(import.meta.env.VITE_API_URL + '/api/events/product-click',
        { product_id: product.product_id },
        { headers: { Authorization: `Bearer ${token}` } }
      ).catch(err => console.log('Event log error:', err))
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdated={handleUpdated}
          canEdit={canEdit}
        />
      )}

      <main className="px-4 md:px-10 py-6 md:py-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8">Products and Services</h1>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.product_id}
              onClick={() => handleProductClick(product)}
              className="group bg-white rounded-3xl p-5 shadow-[0_2px_4px_rgba(0,0,0,0.1)] border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#003e7e]/20 flex flex-col items-center text-center gap-4 "            >
              <img
                src={product.image_link}
                alt={product.name_product}
                className="h-36 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <p className="text-[#003e7e] font-bold text-lg leading-tight min-h-[56px] flex items-center justify-center ">{product.name_product}</p>
              <div
                className=" px-4 py-2 rounded-full bg-[#003e7e] text-white text-sm font-semibold group-hover:bg-[#9B0032] transition-colors"
              >
                View details
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Products