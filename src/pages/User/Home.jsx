import { useState, useEffect } from 'react'
import ProductCard from '../../components/ProductCard'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

/**
 * होमपेज कंपोनेंट - वेबसाइट का मुख्य पृष्ठ
 * उत्पादों की सूची और विशेष ऑफ़र्स दिखाता है
 */
export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Firebase से उत्पादों को लोड करें
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'))
        const productsData = []
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() })
        })
        setProducts(productsData)
      } catch (error) {
        console.error('उत्पाद लोड करने में त्रुटि:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* हीरो सेक्शन */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            ग्रीष्मकालीन सेल - 70% तक की छूट
          </h1>
          <p className="text-lg mb-6">
            फैशन, इलेक्ट्रॉनिक्स और बहुत कुछ पर भारी छूट पाएं
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200">
            अब खरीदें
          </button>
        </div>
      </section>

      {/* श्रेणियाँ सेक्शन */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">लोकप्रिय श्रेणियाँ</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'फैशन', icon: '👕', count: '1250+ उत्पाद' },
            { name: 'इलेक्ट्रॉनिक्स', icon: '📱', count: '800+ उत्पाद' },
            { name: 'होम और रसोई', icon: '🏠', count: '1500+ उत्पाद' },
            { name: 'ब्यूटी', icon: '💄', count: '950+ उत्पाद' }
          ].map((category, index) => (
            <div key={index} className="card cursor-pointer hover:shadow-xl transition duration-200">
              <div className="text-4xl mb-2">{category.icon}</div>
              <h3 className="font-semibold mb-1">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* उत्पाद सेक्शन */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">सभी उत्पाद</h2>
          <button className="text-blue-600 hover:underline">सभी देखें</button>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">कोई उत्पाद उपलब्ध नहीं है</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* विशेष ऑफ़र सेक्शन */}
      <section className="mt-16">
        <div className="bg-orange-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">विशेष ऑफ़र</h2>
          <p className="text-gray-700 mb-6">
            केवल आज के लिए - सभी उत्पादों पर 25% की अतिरिक्त छूट। कोड का उपयोग करें: <strong>EXTRA25</strong>
          </p>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-200">
            ऑफ़र का लाभ उठाएं
          </button>
        </div>
      </section>
    </div>
  )
}