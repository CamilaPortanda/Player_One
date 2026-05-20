import Header from '../components/Header'
import img1 from '../assets/product1.png'
import img2 from '../assets/product2.png'
import img3 from '../assets/product3.png'
import img4 from '../assets/product4.png'
import img5 from '../assets/product5.png'
import img6 from '../assets/product6.png'
 
const products = [
  { id: 1, name: 'Remote access router Stratix 4300 Allen-Bradley', img: img1 },
  { id: 2, name: 'CIP Security: The final layer of defense', img: img2 },
  { id: 3, name: 'Security Assesment', img: img3 },
  { id: 4, name: '1408 PowerMonitor 1000', img: img4 },
  { id: 5, name: 'SmartGuard Controllers', img: img5 },
  { id: 6, name: 'ASEM 6300P-SW0 Panel PCs', img: img6 },
]
 
function Products() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
 
      <main className="px-10 py-8">
        <h1 className="text-4xl font-bold mb-8">Products and Services</h1>
 
        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between bg-[#f5f5f5] rounded-3xl p-6 gap-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <p className="text-[#9B0032] font-bold text-lg leading-snug w-1/2">{product.name}</p>
              <img src={product.img} alt={product.name} className="w-1/2 object-contain max-h-36" />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
 
export default Products