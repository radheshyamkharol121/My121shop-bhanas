import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { parseCSVToProducts, parseJSONToProducts, importBulkProducts } from '../../services/importProducts';
import { Upload, FileText, Database, Download } from 'lucide-react';

const ImportProducts = () => {
  const [importMethod, setImportMethod] = useState('csv');
  const [file, setFile] = useState(null);
  const [apiUrl, setApiUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { user } = useAuth();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (!user) {
      alert('आयात करने के लिए कृपया लॉगिन करें');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      let products = [];
      
      if (importMethod === 'csv' || importMethod === 'json') {
        if (!file) {
          alert('कृपया एक फ़ाइल चुनें');
          return;
        }

        const fileReader = new FileReader();
        
        fileReader.onload = async (e) => {
          try {
            const content = e.target.result;
            
            if (importMethod === 'csv') {
              products = parseCSVToProducts(content, user.uid);
            } else {
              products = parseJSONToProducts(content, user.uid);
            }
            
            const importResult = await importBulkProducts(products);
            setResult(importResult);
          } catch (error) {
            console.error('फ़ाइल पार्स करने में त्रुटि:', error);
            setResult({
              success: false,
              error: error.message,
              importedCount: 0
            });
          }
        };
        
        fileReader.readAsText(file);
      } else if (importMethod === 'api') {
        if (!apiUrl) {
          alert('कृपया API URL दर्ज करें');
          return;
        }
        
        const importResult = await importProductsFromAPI(apiUrl, user.uid);
        setResult(importResult);
      }
    } catch (error) {
      console.error('आयात करने में त्रुटि:', error);
      setResult({
        success: false,
        error: error.message,
        importedCount: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    // CSV टेम्पलेट डाउनलोड करें
    const template = `name,description,price,originalPrice,category,image,stock,isDropshipping,supplierName,estimatedDelivery
उत्पाद नाम,उत्पाद विवरण,1000,1500,श्रेणी,https://example.com/image.jpg,50,false,सप्लायर नाम,2-3 दिन`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">उत्पाद आयात करें</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">आयात विधि चुनें</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setImportMethod('csv')}
              className={`p-4 border rounded-lg flex flex-col items-center ${
                importMethod === 'csv' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <FileText className="h-8 w-8 mb-2" />
              <span>CSV फ़ाइल</span>
            </button>
            
            <button
              onClick={() => setImportMethod('json')}
              className={`p-4 border rounded-lg flex flex-col items-center ${
                importMethod === 'json' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <FileText className="h-8 w-8 mb-2" />
              <span>JSON फ़ाइल</span>
            </button>
            
            <button
              onClick={() => setImportMethod('api')}
              className={`p-4 border rounded-lg flex flex-col items-center ${
                importMethod === 'api' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <Database className="h-8 w-8 mb-2" />
              <span>API</span>
            </button>
          </div>
        </div>
        
        {(importMethod === 'csv' || importMethod === 'json') && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {importMethod === 'csv' ? 'CSV फ़ाइल' : 'JSON फ़ाइल'} चुनें
            </label>
            <input
              type="file"
              accept={importMethod === 'csv' ? '.csv' : '.json'}
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            
            <button
              onClick={downloadTemplate}
              className="mt-3 flex items-center text-blue-600 hover:text-blue-800"
            >
              <Download className="h-4 w-4 mr-1" />
              CSV टेम्पलेट डाउनलोड करें
            </button>
          </div>
        )}
        
        {importMethod === 'api' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API URL
            </label>
            <input
              type="url"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://example.com/api/products"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        )}
        
        <button
          onClick={handleImport}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center"
        >
          <Upload className="h-5 w-5 mr-2" />
          {loading ? 'आयात हो रहा है...' : 'आयात शुरू करें'}
        </button>
        
        {result && (
          <div className={`mt-6 p-4 rounded-lg ${
            result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            <h3 className="font-semibold">
              {result.success ? 'आयात सफल' : 'आयात विफल'}
            </h3>
            <p>आयात किए गए उत्पाद: {result.importedCount}</p>
            {result.error && <p>त्रुटि: {result.error}</p>}
          </div>
        )}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-lg font-semibold mb-4">आयात निर्देश</h2>
        <div className="prose max-w-none">
          <h3>CSV फ़ाइल फॉर्मेट:</h3>
          <ul>
            <li>पहली पंक्ति में हेडर होना चाहिए</li>
            <li>आवश्यक फ़ील्ड: name, price, category</li>
            <li>वैकल्पिक फ़ील्ड: description, originalPrice, image, stock, isDropshipping, supplierName, estimatedDelivery</li>
            <li>CSV UTF-8 एन्कोडिंग का उपयोग करें</li>
          </ul>
          
          <h3>JSON फ़ाइल फॉर्मेट:</h3>
          <pre className="bg-gray-100 p-3 rounded">
{`[
  {
    "name": "उत्पाद नाम",
    "price": 1000,
    "category": "श्रेणी",
    "description": "उत्पाद विवरण",
    "image": "https://example.com/image.jpg"
  }
]`}
          </pre>
          
          <h3>API आवश्यकताएँ:</h3>
          <ul>
            <li>API JSON डेटा लौटाएं</li>
            <li>डेटा उपरोक्त JSON फ़ॉर्मेट का पालन करना चाहिए</li>
            <li>CORS सक्षम होना चाहिए</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImportProducts;