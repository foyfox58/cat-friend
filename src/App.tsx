import './App.css'

function App() {
  const baseColors = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Brown 600', value: '#26231E' },
    { name: 'Brown 500', value: '#434038' },
    { name: 'Brown 400', value: '#757168' },
    { name: 'Brown 300', value: '#DAD6D1' },
    { name: 'Brown 200', value: '#EFEEEB' },
    { name: 'Brown 100', value: '#F9F8F6' },
  ]

  const brandColors = [
    { name: 'Orange', value: '#F2B68C' },
    { name: 'Green', value: '#12B279' },
    { name: 'Green', value: '#D7F2E9' },
    { name: 'Red', value: '#EB5164' },
  ]

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Colors Section */}
        <div>
          <h2 className="text-headline-2 mb-8" style={{ color: '#9393AC' }}>
            Colors
          </h2>

          {/* Base Colors */}
          <div className="mb-12">
            <h3 className="text-body-1 mb-6" style={{ color: '#434038' }}>
              Base
            </h3>
            <div className="flex flex-wrap gap-4">
              {baseColors.map((color) => (
                <div key={color.name} className="flex flex-col items-start gap-2">
                  <div
                    className="w-24 h-16 rounded-lg border border-gray-200"
                    style={{ backgroundColor: color.value }}
                  />
                  <div>
                    <div className="text-body-1" style={{ color: '#434038' }}>
                      {color.name}
                    </div>
                    <div className="text-body-2" style={{ color: '#757168' }}>
                      {color.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Colors */}
          <div>
            <h3 className="text-body-1 mb-6" style={{ color: '#434038' }}>
              Brand
            </h3>
            <div className="flex flex-wrap gap-4">
              {brandColors.map((color, index) => (
                <div key={`${color.name}-${index}`} className="flex flex-col items-start gap-2">
                  <div
                    className="w-24 h-16 rounded-lg border border-gray-200"
                    style={{ backgroundColor: color.value }}
                  />
                  <div>
                    <div className="text-body-1" style={{ color: '#434038' }}>
                      {color.name}
                    </div>
                    <div className="text-body-2" style={{ color: '#757168' }}>
                      {color.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fonts Section */}
        <div style={{ marginLeft: '150px' }}>
          <h2 className="text-headline-2 mb-8" style={{ color: '#9393AC' }}>
            Fonts
          </h2>
          <div className="space-y-6">
            <div>
              <div className="text-headline-1" style={{ color: '#434038' }}>
                Headline 1
              </div>
            </div>
            <div>
              <div className="text-headline-2" style={{ color: '#434038' }}>
                Headline 2
              </div>
            </div>
            <div>
              <div className="text-headline-3" style={{ color: '#434038' }}>
                Headline 3
              </div>
            </div>
            <div>
              <div className="text-headline-4" style={{ color: '#434038' }}>
                Headline 4
              </div>
            </div>
            <div>
              <div className="text-body-1" style={{ color: '#434038' }}>
                Body 1
              </div>
            </div>
            <div>
              <div className="text-body-2" style={{ color: '#434038' }}>
                Body 2
              </div>
            </div>
            <div>
              <div className="text-body-3" style={{ color: '#434038' }}>
                Body 3
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
