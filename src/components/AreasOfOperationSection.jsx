import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'

const AreasOfOperationSection = () => {
  const [areas, setAreas] = useState([
    'Phần mềm',
    'Web Development', 
    'Mobile App',
    'AI/ML'
  ])
  const [newArea, setNewArea] = useState('')

  const addArea = () => {
    if (newArea.trim() && !areas.includes(newArea.trim())) {
      setAreas([...areas, newArea.trim()])
      setNewArea('')
    }
  }

  const removeArea = (areaToRemove) => {
    setAreas(areas.filter(area => area !== areaToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addArea()
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Lĩnh vực hoạt động
      </h3>
      
      {/* Current Areas */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {areas.map((area, index) => (
            <div
              key={index}
              className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg flex items-center gap-2 group"
            >
              <span className="text-sm font-medium">{area}</span>
              <button
                onClick={() => removeArea(area)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add New Area */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Thêm lĩnh vực mới..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={addArea}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Thêm
          </button>
        </div>
      </div>
      
      {/* Save Button */}
      <button className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors">
        Lưu thay đổi
      </button>
    </div>
  )
}

export default AreasOfOperationSection
